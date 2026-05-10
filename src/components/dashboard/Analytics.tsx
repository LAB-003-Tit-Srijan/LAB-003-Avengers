import { BarChart3, Package, Eye, Heart, ShoppingCart, DollarSign } from "lucide-react";

export function Analytics() {
  const stats = [
    { label: "Total Listings", value: "12", icon: Package, change: "+2 this week" },
    { label: "Active Products", value: "8", icon: BarChart3, change: "4 pending" },
    { label: "Total Views", value: "1,248", icon: Eye, change: "+12% vs last month" },
    { label: "Wishlist Adds", value: "34", icon: Heart, change: "Highly demanded" },
    { label: "Sold Items", value: "15", icon: ShoppingCart, change: "+3 this month" },
    {
      label: "Estimated Revenue",
      value: "₹45,200",
      icon: DollarSign,
      change: "Across all sold items",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display">Analytics Overview</h2>
        <p className="text-muted-foreground mt-1">Track your performance and sales over time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold font-display">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm min-h-[300px] flex flex-col">
        <h3 className="font-semibold mb-6">Views over time</h3>
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg text-muted-foreground">
          [ Interactive Line Chart Placeholder ]
        </div>
      </div>
    </div>
  );
}
