import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Clock,
  TrendingUp,
  IndianRupee,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBuyerRequests } from "@/lib/requests";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

export function PurchaseRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await getBuyerRequests(user.id);
        setRequests(data || []);
      } catch (err) {
        toast.error("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-success/10 text-success border-success/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "negotiating":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  if (loading)
    return <div className="p-8 text-center text-muted-foreground">Loading your requests...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display">My Purchase Requests</h2>
        <p className="text-muted-foreground mt-1">
          Track the status of items you've offered to buy or bid on.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-muted/20">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg">No requests sent</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Found something you like? Send a buy or rent request to see it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {requests.map((req) => (
              <motion.div
                layout
                key={req.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-elegant"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-border">
                    <img
                      src={req.listing?.images?.[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          req.type === "buy"
                            ? "bg-primary/10 text-primary"
                            : req.type === "rent"
                              ? "bg-accent/10 text-accent"
                              : "bg-warning/10 text-warning"
                        }`}
                      >
                        {req.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${getStatusStyle(req.status)}`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-base">{req.listing?.title}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                        <IndianRupee className="h-3.5 w-3.5" /> {req.amount || req.listing?.price}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5" /> Seller:{" "}
                        {req.seller?.full_name || "Unknown"}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />{" "}
                        {format(new Date(req.created_at), "MMM d")}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-9 rounded-xl text-xs gap-2">
                      <ExternalLink className="h-3.5 w-3.5" /> View Item
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-xl text-xs gap-2 border-border/50"
                    >
                      Chat Seller
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
