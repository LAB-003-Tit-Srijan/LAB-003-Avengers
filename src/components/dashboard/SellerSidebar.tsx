import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Star,
  BarChart3,
  Repeat,
  Settings,
  Bell,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SellerTabType =
  | "overview"
  | "upload"
  | "listings"
  | "analytics"
  | "requests"
  | "sold"
  | "rented"
  | "revenue"
  | "feedback"
  | "chats"
  | "notifications"
  | "verification"
  | "trust";

interface SellerSidebarProps {
  activeTab: SellerTabType;
  setActiveTab: (tab: SellerTabType) => void;
}

export function SellerSidebar({ activeTab, setActiveTab }: SellerSidebarProps) {
  const items = [
    { id: "overview", label: "Seller Overview", icon: LayoutDashboard },
    { id: "upload", label: "Upload Product", icon: PlusCircle },
    { id: "listings", label: "My Listings", icon: Package },
    { id: "analytics", label: "Product Analytics", icon: BarChart3 },
    { id: "requests", label: "Buyer Requests", icon: ShoppingBag },
    { id: "sold", label: "Sold Products", icon: CheckCircle2 },
    { id: "rented", label: "Rented Products", icon: Repeat },
    { id: "revenue", label: "Revenue Overview", icon: TrendingUp },
    { id: "feedback", label: "Buyer Feedback", icon: Star },
    { id: "chats", label: "Chat Management", icon: MessageSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "verification", label: "Verification", icon: ShieldCheck },
    { id: "trust", label: "Trust Score", icon: TrendingUp },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-24 space-y-4">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
          <div className="mb-6 px-4 py-2 bg-[#0A4A5A]/5 rounded-2xl border border-[#0A4A5A]/10">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0A4A5A]">
              Business Mode
            </div>
            <div className="text-xs font-bold text-muted-foreground mt-1">Seller Dashboard</div>
          </div>
          <nav className="flex flex-col gap-1.5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as SellerTabType)}
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
