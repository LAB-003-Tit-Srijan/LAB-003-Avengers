import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Heart,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  TrendingUp,
  Star,
  BarChart3,
  Clock,
  Repeat,
  Settings,
  Bell,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BuyerTabType =
  | "overview"
  | "wishlist"
  | "requests"
  | "rentals"
  | "chats"
  | "history"
  | "saved"
  | "reviews"
  | "recommended"
  | "notifications"
  | "settings";

interface BuyerSidebarProps {
  activeTab: BuyerTabType;
  setActiveTab: (tab: BuyerTabType) => void;
}

export function BuyerSidebar({ activeTab, setActiveTab }: BuyerSidebarProps) {
  const items = [
    { id: "overview", label: "Home Overview", icon: LayoutDashboard },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "requests", label: "Purchase Requests", icon: ShoppingCart },
    { id: "rentals", label: "Rental Requests", icon: Clock },
    { id: "chats", label: "Active Chats", icon: MessageSquare },
    { id: "history", label: "Order History", icon: History },
    { id: "saved", label: "Saved Products", icon: Package },
    { id: "reviews", label: "Reviews Given", icon: Star },
    { id: "recommended", label: "Recommended", icon: TrendingUp },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-24 space-y-4">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
          <div className="mb-6 px-4 py-2 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Student Mode
            </div>
            <div className="text-xs font-bold text-muted-foreground mt-1">Buyer Dashboard</div>
          </div>
          <nav className="flex flex-col gap-1.5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as BuyerTabType)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  activeTab === item.id
                    ? "bg-[#0A4A5A] text-white shadow-elegant scale-[1.02]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    activeTab === item.id ? "text-white" : "text-muted-foreground",
                  )}
                />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
