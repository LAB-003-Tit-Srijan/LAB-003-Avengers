import { motion } from "framer-motion";
import {
  BarChart3,
  Package,
  ShoppingBag,
  CheckCircle2,
  TrendingUp,
  Star,
  ShieldCheck,
  IndianRupee,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export function SellerOverview() {
  const { user, profile } = useAuth();
  const [listingCount, setListingCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      const [listingsRes, requestsRes] = await Promise.all([
        supabase.from("listings").select("id, availability_status").eq("seller_id", user.id),
        supabase
          .from("listing_requests")
          .select("id")
          .eq("seller_id", user.id)
          .eq("status", "pending"),
      ]);

      if (listingsRes.data) {
        setListingCount(listingsRes.data.length);
        setActiveCount(
          listingsRes.data.filter((l) => l.availability_status === "available").length,
        );
      }
      if (requestsRes.data) {
        setRequestCount(requestsRes.data.length);
      }
      setLoading(false);
    }
    fetchStats();
  }, [user]);

  const stats = [
    {
      label: "Total Listings",
      value: loading ? "..." : listingCount.toString(),
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Active Products",
      value: loading ? "..." : activeCount.toString(),
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Pending Requests",
      value: loading ? "..." : requestCount.toString(),
      icon: ShoppingBag,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Trades Completed",
      value: profile?.trades_completed?.toString() || "0",
      icon: CheckCircle2,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-[#0A4A5A]">
            Merchant Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor your campus business and trust performance.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 pr-4 border-r border-border">
            <ShieldCheck className="h-5 w-5 text-success" />
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Trust Score
              </div>
              <div className="text-lg font-black text-[#0A4A5A]">
                {profile?.trust_score || 85}/100
              </div>
            </div>
          </div>
          <div className="pl-2">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Reputation
            </div>
            <div className="text-xs font-bold text-success flex items-center gap-1">
              Elite Seller <Star className="h-3 w-3 fill-current" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-elegant transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <ArrowUpRight className="h-4 w-4 text-success opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-black text-[#0A4A5A]">{stat.value}</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft relative overflow-hidden group h-full">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Sales Overview</h3>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="h-2 w-2 rounded-full bg-muted" />
                </div>
              </div>

              <div className="flex items-end justify-between h-40 gap-2">
                {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/10 rounded-t-lg group-hover:bg-primary/20 transition-colors relative"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="absolute bottom-0 w-full bg-[#0A4A5A] rounded-t-lg"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-[#0A4A5A] text-white p-6 shadow-elegant">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Package className="h-5 w-5" /> Recent Sale
            </h3>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <div className="text-xs font-bold mb-1 opacity-80">MacBook Air M1</div>
              <div className="text-xl font-black mb-3">₹45,000</div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>Buyer: rahul_v</span>
                <span className="bg-success text-white px-2 py-0.5 rounded-full">Completed</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl h-11 font-bold"
            >
              View History
            </Button>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-bold mb-4">Pending Requests</h3>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Scientific Calculator</div>
                    <div className="text-[10px] text-muted-foreground">Requested by Arjun</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-[11px] font-bold uppercase tracking-widest text-primary"
            >
              All Requests
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
