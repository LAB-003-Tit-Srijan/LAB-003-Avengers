import { useState, useEffect } from "react";
import { TrendingUp, ShoppingBag, ArrowUpRight, IndianRupee, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";

export function BidHistory() {
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockBids = [
      {
        id: "b1",
        listing: {
          title: "Sony WH-1000XM4",
          price: "₹18,500",
          images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500"],
        },
        my_bid: 17000,
        current_highest: 17500,
        seller: { name: "Anish T." },
        status: "outbid",
        ends_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "b2",
        listing: {
          title: "Logitech MX Master 3",
          price: "₹6,000",
          images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"],
        },
        my_bid: 5500,
        current_highest: 5500,
        seller: { name: "Neha R." },
        status: "leading",
        ends_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      },
    ];
    setBids(mockBids);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display text-[#0A4A5A]">Bid History</h2>
        <p className="text-muted-foreground mt-1">
          Track your active bids and offers on campus items.
        </p>
      </div>

      <div className="grid gap-4">
        {bids.map((bid) => (
          <motion.div
            key={bid.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-elegant transition-all relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden border border-border">
                <img src={bid.listing.images[0]} alt="" className="h-full w-full object-cover" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-lg">{bid.listing.title}</h4>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      bid.status === "leading"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {bid.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Your Bid
                    </div>
                    <div className="text-lg font-black text-primary flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" /> {bid.my_bid}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Current Highest
                    </div>
                    <div className="text-lg font-black text-foreground flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" /> {bid.current_highest}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Ends In
                    </div>
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-accent" />{" "}
                      {format(new Date(bid.ends_at), "h'h' m'm'")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-32">
                <Button className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-elegant">
                  Update Bid
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-border/50 text-xs font-bold"
                >
                  Withdraw
                </Button>
              </div>
            </div>

            {/* Background Decorative */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp className="h-24 w-24" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
