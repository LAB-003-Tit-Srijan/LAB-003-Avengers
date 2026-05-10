import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
} from "lucide-react";
import { motion } from "framer-motion";

export function TransactionAnalytics() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₹24,500",
      change: "+12.5%",
      trending: "up",
      color: "text-primary",
    },
    { label: "Items Sold", value: "18", change: "+4.2%", trending: "up", color: "text-success" },
    {
      label: "Profile Views",
      value: "1,240",
      change: "-2.1%",
      trending: "down",
      color: "text-accent",
    },
    {
      label: "Avg. Sale Price",
      value: "₹1,360",
      change: "+8.1%",
      trending: "up",
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display text-[#0A4A5A]">Analytics Overview</h2>
        <p className="text-muted-foreground mt-1">
          Real-time performance metrics for your campus listings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold ${stat.trending === "up" ? "text-success" : "text-destructive"}`}
              >
                {stat.change}{" "}
                {stat.trending === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
              </div>
            </div>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Sales Performance</h3>
            <select className="bg-muted text-xs font-bold rounded-lg px-3 py-1.5 border-none outline-none">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>

          {/* Mock Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-2">
            {[40, 70, 45, 90, 65, 80, 100, 55, 75, 60, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary transition-colors cursor-pointer"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹{h * 10}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h3 className="font-bold text-lg mb-8">Category Mix</h3>
          <div className="space-y-6">
            {[
              { label: "Electronics", percent: 65, color: "bg-primary" },
              { label: "Books", percent: 20, color: "bg-accent" },
              { label: "Cycles", percent: 10, color: "bg-warning" },
              { label: "Other", percent: 5, color: "bg-success" },
            ].map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>{cat.label}</span>
                  <span>{cat.percent}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percent}%` }}
                    className={`h-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
              <TrendingUp className="h-4 w-4" /> AI Insight
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Electronics demand is up by 15% this month on campus. Consider listing your unused
              gadgets now for premium pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
