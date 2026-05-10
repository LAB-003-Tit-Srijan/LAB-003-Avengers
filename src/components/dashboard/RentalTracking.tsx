import { useState, useEffect } from "react";
import {
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MapPin,
  Package,
  Calendar,
  IndianRupee,
  Tag,
  Star,
  ShieldCheck,
  MessageSquare,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format, addDays, differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const CONDITION_COLORS: Record<string, string> = {
  "Like New": "bg-success/10 text-success border-success/20",
  Good: "bg-primary/10 text-primary border-primary/20",
  Fair: "bg-warning/10 text-warning border-warning/20",
  "Heavily Used": "bg-destructive/10 text-destructive border-destructive/20",
};

export function RentalTracking() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [endingId, setEndingId] = useState<string | null>(null);
  const [extendingId, setExtendingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>("r1"); // open by default

  useEffect(() => {
    async function load() {
      const mockRentals = [
        {
          id: "r1",
          listing: {
            title: "Drafter & Engineering Set",
            category: "Stationery",
            condition: "Good",
            description:
              "Complete drafter + engineering drawing set. Used for 1 semester. Includes compass, scale, protractor. Excellent quality, well maintained.",
            images: [
              "https://images.unsplash.com/photo-1503387762-592dea58ef21?w=500",
              "https://images.unsplash.com/photo-1583086650426-302a2432c668?w=500",
            ],
            meetup_location: "Architecture Block, Room 204",
          },
          buyer: {
            full_name: "Rahul M.",
            email: "rahul@iitd.ac.in",
            avatar_url: null,
            trust_score: 87,
            verified: true,
            phone: "+91 98765 43210",
          },
          rented_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          due_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 250,
          status: "active",
          otp_code: "4872",
        },
        {
          id: "r2",
          listing: {
            title: "Casio FX-991ES Scientific Calculator",
            category: "Electronics",
            condition: "Like New",
            description:
              "Casio FX-991ES Plus scientific calculator. 417 functions. No scratches. Ideal for competitive exams and engineering.",
            images: ["https://img.sanishtech.com/u/64c83726e8790b30931d183a2bd9dedf.jpg"],
            meetup_location: "Main Library, Ground Floor",
          },
          buyer: {
            full_name: "Sneha P.",
            email: "sneha@bits.ac.in",
            avatar_url: null,
            trust_score: 93,
            verified: true,
            phone: "+91 87654 32109",
          },
          rented_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          due_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 80,
          status: "overdue",
          otp_code: "2341",
        },
      ];
      setRentals(mockRentals);
      setLoading(false);
    }
    load();
  }, []);

  const handleEndRental = async (rentalId: string) => {
    setEndingId(rentalId);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setRentals((prev) =>
        prev.map((r) => (r.id === rentalId ? { ...r, status: "ended" } : r)),
      );
      toast.success("Rental ended! The item is marked as returned.");
    } catch {
      toast.error("Failed to end rental. Please try again.");
    } finally {
      setEndingId(null);
    }
  };

  const handleExtendPeriod = async (rentalId: string) => {
    setExtendingId(rentalId);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setRentals((prev) =>
        prev.map((r) =>
          r.id === rentalId
            ? { ...r, due_at: addDays(new Date(r.due_at), 7).toISOString() }
            : r,
        ),
      );
      toast.success("Rental extended by 7 days!");
    } catch {
      toast.error("Failed to extend rental. Please try again.");
    } finally {
      setExtendingId(null);
    }
  };

  const getStatusConfig = (status: string, dueDate: string) => {
    const daysLeft = differenceInDays(new Date(dueDate), new Date());
    if (status === "ended")
      return { label: "RETURNED", color: "text-muted-foreground bg-muted", icon: XCircle };
    if (status === "overdue" || daysLeft < 0)
      return { label: "OVERDUE", color: "text-destructive bg-destructive/10", icon: AlertCircle };
    if (daysLeft <= 3)
      return { label: "DUE SOON", color: "text-warning bg-warning/10", icon: AlertCircle };
    return { label: "ACTIVE", color: "text-success bg-success/10", icon: CheckCircle2 };
  };

  const getDaysInfo = (dueDate: string) => {
    const days = differenceInDays(new Date(dueDate), new Date());
    if (days < 0) return { label: `${Math.abs(days)} days overdue`, urgent: true };
    if (days === 0) return { label: "Due today!", urgent: true };
    return { label: `${days} days remaining`, urgent: days <= 3 };
  };

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading rental tracking...
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Rental Tracking</h2>
          <p className="text-muted-foreground mt-1">
            {rentals.filter((r) => r.status !== "ended").length} active rentals
          </p>
        </div>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-success/10 text-success border border-success/20">
            {rentals.filter((r) => r.status === "active").length} Active
          </span>
          <span className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
            {rentals.filter((r) => r.status === "overdue").length} Overdue
          </span>
        </div>
      </div>

      {/* Rental Cards */}
      <div className="grid gap-5">
        <AnimatePresence>
          {rentals.map((rental) => {
            const statusConfig = getStatusConfig(rental.status, rental.due_at);
            const StatusIcon = statusConfig.icon;
            const daysInfo = getDaysInfo(rental.due_at);
            const isExpanded = expandedId === rental.id;
            const daysRented = differenceInDays(new Date(), new Date(rental.rented_at));
            const totalEarned = rental.amount * Math.ceil(daysRented / 7);
            const conditionClass =
              CONDITION_COLORS[rental.listing.condition] || "bg-muted text-muted-foreground";

            return (
              <motion.div
                key={rental.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden"
              >
                {/* ── TOP SUMMARY BAR ── */}
                <div className="flex flex-col md:flex-row gap-4 p-5">
                  {/* Thumbnail */}
                  <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden border border-border">
                    <img
                      src={rental.listing.images[0]}
                      alt={rental.listing.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Core Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-base md:text-lg leading-tight">
                          {rental.listing.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full ${statusConfig.color}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </span>
                          <span className={`border text-[11px] font-semibold px-2 py-0.5 rounded-full ${conditionClass}`}>
                            {rental.listing.condition}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            #{rental.id} · {rental.listing.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                          Total Earned
                        </div>
                        <div className="text-xl font-black text-primary">
                          ₹{totalEarned.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          ₹{rental.amount}/week
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-primary" />
                        <span className="font-semibold text-foreground">{rental.buyer.full_name}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        Rented {format(new Date(rental.rented_at), "MMM d")}
                      </span>
                      <span className={`flex items-center gap-1 font-semibold ${daysInfo.urgent ? "text-warning" : ""}`}>
                        <Clock className="h-3.5 w-3.5" />
                        {daysInfo.label}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {rental.listing.meetup_location}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0">
                    <Button
                      className="rounded-xl h-10 px-5 text-sm font-bold shadow-elegant"
                      onClick={() => handleEndRental(rental.id)}
                      disabled={rental.status === "ended" || endingId === rental.id}
                    >
                      {endingId === rental.id ? (
                        <span className="flex items-center gap-2">
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Ending...
                        </span>
                      ) : rental.status === "ended" ? (
                        "Returned"
                      ) : (
                        "End Rental"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl h-10 px-5 text-sm font-bold"
                      onClick={() => handleExtendPeriod(rental.id)}
                      disabled={rental.status === "ended" || extendingId === rental.id}
                    >
                      {extendingId === rental.id ? (
                        <span className="flex items-center gap-2">
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Extending...
                        </span>
                      ) : (
                        "Extend +7d"
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-xl h-10 px-4 text-xs text-muted-foreground"
                      onClick={() => setExpandedId(isExpanded ? null : rental.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* ── EXPANDED DETAILS PANEL ── */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border bg-secondary/20 px-5 py-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {/* Product Details */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <Package className="h-3.5 w-3.5" /> Product Details
                          </h5>
                          {/* Image strip */}
                          <div className="flex gap-2">
                            {rental.listing.images.map((img: string, i: number) => (
                              <div
                                key={i}
                                className="h-16 w-16 rounded-xl overflow-hidden border border-border shrink-0"
                              >
                                <img src={img} alt="" className="h-full w-full object-cover" />
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {rental.listing.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 text-[11px]">
                            <span className={`border px-2 py-0.5 rounded-full font-semibold ${conditionClass}`}>
                              {rental.listing.condition}
                            </span>
                            <span className="bg-muted text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                              {rental.listing.category}
                            </span>
                          </div>
                        </div>

                        {/* Renter Details */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" /> Renter Info
                          </h5>
                          <div className="flex items-center gap-3 p-3 rounded-2xl bg-background border border-border">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                              {rental.buyer.full_name[0]}
                            </div>
                            <div>
                              <div className="font-bold text-sm flex items-center gap-1">
                                {rental.buyer.full_name}
                                {rental.buyer.verified && (
                                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">{rental.buyer.email}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-background border border-border">
                              <div className="text-muted-foreground font-medium">Trust Score</div>
                              <div className="font-black text-primary mt-0.5">
                                {rental.buyer.trust_score}/100
                              </div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-background border border-border">
                              <div className="text-muted-foreground font-medium">OTP Code</div>
                              <div className="font-black text-foreground mt-0.5 font-mono tracking-widest">
                                {rental.otp_code}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs rounded-xl"
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1" /> Chat
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs rounded-xl"
                            >
                              <Phone className="h-3.5 w-3.5 mr-1" /> Call
                            </Button>
                          </div>
                        </div>

                        {/* Timeline & Financials */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <IndianRupee className="h-3.5 w-3.5" /> Rental Timeline
                          </h5>

                          {/* Timeline */}
                          <div className="space-y-2">
                            {[
                              {
                                label: "Rented On",
                                value: format(new Date(rental.rented_at), "MMM d, yyyy"),
                                icon: Calendar,
                                color: "text-primary",
                                done: true,
                              },
                              {
                                label: "Days Elapsed",
                                value: `${daysRented} day${daysRented !== 1 ? "s" : ""}`,
                                icon: Clock,
                                color: "text-accent",
                                done: true,
                              },
                              {
                                label: "Due Date",
                                value: format(new Date(rental.due_at), "MMM d, yyyy"),
                                icon: AlertCircle,
                                color: daysInfo.urgent ? "text-warning" : "text-muted-foreground",
                                done: rental.status === "ended",
                              },
                            ].map((step) => (
                              <div
                                key={step.label}
                                className="flex items-center gap-3 p-2.5 rounded-xl bg-background border border-border"
                              >
                                <div className={`p-1.5 rounded-lg bg-muted ${step.color}`}>
                                  <step.icon className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                                    {step.label}
                                  </div>
                                  <div className="text-xs font-bold">{step.value}</div>
                                </div>
                                {step.done && (
                                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Earnings Summary */}
                          <div className="p-3 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                              Earnings Breakdown
                            </div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">
                                {Math.ceil(daysRented / 7)} week(s) × ₹{rental.amount}
                              </span>
                              <span className="font-bold">₹{totalEarned}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${Math.min((daysRented / 30) * 100, 100)}%` }}
                              />
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1">
                              {daysInfo.label}
                            </div>
                          </div>

                          {/* Meetup Location */}
                          <div className="flex items-start gap-2 p-3 rounded-xl bg-background border border-border text-xs">
                            <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <div className="font-semibold text-muted-foreground">Meetup Location</div>
                              <div className="font-bold mt-0.5">{rental.listing.meetup_location}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {rentals.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center text-muted-foreground">
            No active rentals at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
