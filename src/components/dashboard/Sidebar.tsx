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
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType =
  | "analytics"
  | "listings"
  | "upload"
  | "orders"
  | "sold"
  | "rentals"
  | "feedback"
  | "purchases"
  | "rentals-in"
  | "saved"
  | "bids"
  | "reviews-out"
  | "messages"
  | "trust";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const sellerItems = [
    { id: "analytics", label: "Analytics Overview", icon: BarChart3 },
    { id: "listings", label: "My Listings", icon: Package },
    { id: "upload", label: "Upload Product", icon: PlusCircle },
    { id: "orders", label: "Active Requests", icon: ShoppingBag },
    { id: "sold", label: "Sold Products", icon: CheckCircle2 },
    { id: "rentals", label: "Rental Tracking", icon: Repeat },
    { id: "feedback", label: "Buyer Feedback", icon: Star },
  ];

  const buyerItems = [
    { id: "purchases", label: "Purchase Requests", icon: ShoppingCart },
    { id: "rentals-in", label: "Rental Requests", icon: Clock },
    { id: "bids", label: "Bid History", icon: TrendingUp },
    { id: "saved", label: "Wishlist", icon: Heart },
    { id: "reviews-out", label: "Reviews Given", icon: Star },
    { id: "messages", label: "Active Chats", icon: MessageSquare },
  ];

  const systemItems = [{ id: "trust", label: "Trust & Safety", icon: ShieldCheck }];

  const NavItem = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return (
      <button
        onClick={() => setActiveTab(item.id as TabType)}
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary text-primary-foreground shadow-elegant scale-[1.02]"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Icon
          className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground")}
        />
        {item.label}
      </button>
    );
  };

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-24 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h2 className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Seller Dashboard
          </h2>
          <nav className="flex flex-col gap-1">
            {sellerItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h2 className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Buyer Dashboard
          </h2>
          <nav className="flex flex-col gap-1">
            {buyerItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <nav className="flex flex-col gap-1">
            {systemItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
