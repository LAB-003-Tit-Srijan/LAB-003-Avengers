import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Check,
  X,
  MessageSquare,
  User,
  Clock,
  IndianRupee,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSellerRequests, updateRequestStatus } from "@/lib/requests";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

export function Orders() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted">("all");

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await getSellerRequests(user.id);
        setRequests(data || []);
      } catch (err) {
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const handleAction = async (id: string, status: "accepted" | "rejected") => {
    try {
      await updateRequestStatus(id, status);
      toast.success(`Request ${status} successfully`);
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) {
      toast.error("Failed to update request");
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  if (loading)
    return <div className="p-8 text-center text-muted-foreground">Loading active requests...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display">Active Requests</h2>
          <p className="text-muted-foreground mt-1">
            Manage buy, rent, and bid requests from students.
          </p>
        </div>
        <div className="flex gap-2 bg-muted p-1 rounded-xl">
          {(["all", "pending", "accepted"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === t ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-muted/20">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg">No {filter !== "all" ? filter : ""} requests</h3>
          <p className="text-muted-foreground text-sm mt-1">
            When students want to buy or rent your items, they'll show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredRequests.map((req) => (
              <motion.div
                layout
                key={req.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-elegant"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex gap-4 sm:w-1/3">
                    <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-border">
                      <img
                        src={req.listing?.images?.[0]}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
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
                        {req.status === "pending" && (
                          <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
                        )}
                      </div>
                      <h4 className="font-bold text-sm line-clamp-1">{req.listing?.title}</h4>
                      <div className="text-xs font-bold text-muted-foreground flex items-center gap-1 mt-1">
                        <IndianRupee className="h-3 w-3" /> {req.amount || req.listing?.price}
                      </div>
                    </div>
                  </div>

                  {/* Buyer Info */}
                  <div className="flex-1 flex items-center gap-4 border-t sm:border-t-0 sm:border-x border-border/50 px-0 sm:px-6">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                      {req.buyer?.avatar_url ? (
                        <img
                          src={req.buyer.avatar_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{req.buyer?.full_name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />{" "}
                        {format(new Date(req.created_at), "MMM d, h:mm a")}
                      </div>
                      {req.message && (
                        <p className="text-[11px] text-muted-foreground mt-2 italic bg-muted/50 p-2 rounded-lg border border-border/50">
                          "{req.message}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row sm:flex-col justify-center gap-2 sm:w-32">
                    {req.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => handleAction(req.id, "accepted")}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-xl text-xs font-bold gap-2 shadow-elegant"
                        >
                          <Check className="h-4 w-4" /> Accept
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleAction(req.id, "rejected")}
                          className="w-full text-destructive hover:bg-destructive/10 h-9 rounded-xl text-xs font-bold gap-2"
                        >
                          <X className="h-4 w-4" /> Reject
                        </Button>
                      </>
                    ) : (
                      <div
                        className={`w-full text-center py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
                          req.status === "accepted"
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {req.status}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      className="w-full h-9 rounded-xl text-[10px] font-bold gap-2 border-border/50"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> Chat
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
