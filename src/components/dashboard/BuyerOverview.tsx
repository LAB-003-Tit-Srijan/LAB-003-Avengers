import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  Heart,
  History,
  TrendingUp,
  Sparkles,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export function BuyerOverview() {
  const { user } = useAuth();
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      const { data } = await supabase
        .from("listing_requests")
        .select("id")
        .eq("buyer_id", user.id)
        .neq("status", "completed");

      if (data) setRequestCount(data.length);
      setLoading(false);
    }
    fetchStats();
  }, [user]);

  const quickStats = [
    {
      label: "Active Requests",
      value: loading ? "..." : requestCount.toString(),
      icon: ShoppingBag,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      id: "saved",
      label: "Wishlist Items",
      value: "0",
      icon: Heart,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    { label: "Rented Items", value: "0", icon: Clock, color: "text-success", bg: "bg-success/10" },
    { label: "Savings", value: "₹0", icon: Sparkles, color: "text-warning", bg: "bg-warning/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-[#0A4A5A]">
            Welcome back, Student!
          </h2>
          <p className="text-muted-foreground mt-1">Ready to find your next campus deal?</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-bold text-success uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, i) => (
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
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="h-32 w-32 shrink-0 rounded-2xl bg-gradient-to-br from-[#0A4A5A] to-accent p-4 flex flex-col items-center justify-center text-white">
                <Sparkles className="h-10 w-10 mb-2" />
                <div className="text-xs font-bold uppercase text-center leading-tight">
                  AI Fair Price Finder
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold">Recommended for You</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on your interest in "Electronics", we found 4 new listings that match your
                  criteria and are priced below market average.
                </p>
                <Button className="rounded-xl bg-[#0A4A5A] text-white px-6 font-bold">
                  Explore Now
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-40 w-40" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <History className="h-5 w-5 text-primary" /> Recently Viewed
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-square rounded-xl bg-muted mb-2 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${i === 1 ? "1611186871348-b1ce696e52c9" : i === 2 ? "1618366712010-f4ae9c647dcb" : "1527864550417-7fd91fc51a46"}?w=200`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-bold truncate">Item {i}</div>
                  <div className="text-[10px] font-bold text-primary mt-0.5">₹1,200</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-[#0A4A5A]/5 p-6 space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Active Bids
          </h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 rounded-2xl bg-card border border-border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold truncate pr-2">Engineering Drawing Kit</div>
                  <span className="text-[10px] font-black bg-success/10 text-success px-2 py-0.5 rounded-full uppercase tracking-widest">
                    Leading
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">
                      Your Bid
                    </div>
                    <div className="text-sm font-black text-primary">₹450</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[10px] font-bold px-2 rounded-lg"
                  >
                    Update
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full rounded-xl border-[#0A4A5A]/20 text-[#0A4A5A] font-bold h-11"
          >
            View All Bids
          </Button>
        </div>
      </div>
    </div>
  );
}
