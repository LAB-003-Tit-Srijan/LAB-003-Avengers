import { useState, useEffect } from "react";
import { Star, User, MessageSquare, ShieldCheck, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

export function BuyerFeedback() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock reviews
    const mock = [
      {
        id: 1,
        author: "Priya S.",
        rating: 5,
        comment:
          "Excellent seller! The MacBook was in perfect condition as described. Very helpful during the meetup.",
        item: "MacBook Air M1",
        date: "2 days ago",
        verified: true,
      },
      {
        id: 2,
        author: "Arjun K.",
        rating: 4,
        comment: "Good experience. The cycle was fine, just needed a bit of oiling. Recommended.",
        item: "Hero Sprint Cycle",
        date: "1 week ago",
        verified: true,
      },
    ];
    setReviews(mock);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-[#0A4A5A]">Buyer Feedback</h2>
          <p className="text-muted-foreground mt-1">
            What your customers are saying about your service.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-2xl shadow-sm">
          <div className="text-center border-r border-border pr-4">
            <div className="text-2xl font-black text-[#0A4A5A]">4.9</div>
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
          </div>
          <div className="pl-2">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Total Reviews
            </div>
            <div className="text-lg font-bold">42 Verified</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((rev, i) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-elegant transition-all"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary overflow-hidden shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.author}`} alt="" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold flex items-center gap-2">
                      {rev.author}
                      {rev.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                    </h4>
                    <div className="flex text-warning mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn("h-3 w-3", i < rev.rating ? "fill-current" : "text-muted")}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium uppercase">
                    {rev.date}
                  </span>
                </div>

                <div className="text-xs font-bold text-primary mb-2 flex items-center gap-1.5">
                  <ShoppingBag className="h-3 w-3" /> Purchased: {rev.item}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="mt-4 flex gap-4 border-t border-border/50 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> Helpful
                  </button>
                  <button className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
