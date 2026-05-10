import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bell, ShieldCheck, ShoppingBag, Info } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "request" | "status_change" | "message" | "system";
  is_read: boolean;
  link: string | null;
  created_at: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // 1. Load initial notifications
    const load = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (data) setNotifications(data as any);
    };
    load();

    // 2. Subscribe to new notifications
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const newNotif = payload.new as Notification;
          setNotifications((prev) => [newNotif, ...prev]);

          // Show toast
          toast(newNotif.title, {
            description: newNotif.message,
            icon: getIcon(newNotif.type),
            action: newNotif.link
              ? {
                  label: "View",
                  onClick: () => (window.location.href = newNotif.link!),
                }
              : undefined,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "request":
        return <ShoppingBag className="h-4 w-4 text-primary" />;
      case "status_change":
        return <ShieldCheck className="h-4 w-4 text-success" />;
      case "message":
        return <Bell className="h-4 w-4 text-accent" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id);

    if (!error) {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
