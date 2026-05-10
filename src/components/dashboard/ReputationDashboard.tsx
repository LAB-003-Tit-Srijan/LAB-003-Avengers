import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Award,
  ExternalLink,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TrustBadge, BadgeType } from "@/components/ui/TrustBadge";
import { calculateTrustScore, getTrustLevel } from "@/lib/trust-logic";

export function ReputationDashboard() {
  // Mock data for current user
  const metrics = {
    isVerified: true,
    successfulTrades: 12,
    responseRate: 0.95,
    accountAgeDays: 180,
    positiveReviewsCount: 15,
    spamReportsCount: 0,
  };

  const score = calculateTrustScore(metrics);
  const { label, color, badge } = getTrustLevel(score);

  const stats = [
    {
      label: "Successful Trades",
      value: metrics.successfulTrades,
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      label: "Positive Reviews",
      value: metrics.positiveReviewsCount,
      icon: Award,
      color: "text-warning",
    },
    {
      label: "Response Rate",
      value: `${(metrics.responseRate * 100).toFixed(0)}%`,
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      label: "Trust Violations",
      value: metrics.spamReportsCount,
      icon: AlertTriangle,
      color: metrics.spamReportsCount > 0 ? "text-destructive" : "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight">Trust & Reputation</h2>
          <p className="text-muted-foreground mt-1">
            Your live trust profile and marketplace reliability metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Status:</span>
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success border border-success/20">
            <ShieldCheck className="h-3.5 w-3.5" /> ACCOUNT SECURE
          </div>
        </div>
      </div>

      {/* Main Score Card */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/30 p-8 shadow-soft">
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative h-40 w-40 shrink-0">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className={`stroke-current ${color}`}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{score}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Score
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">Level: {label}</h3>
                  <TrustBadge type={badge.toLowerCase().replace(" ", "-") as BadgeType} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Your trust score is in the top 5% of your campus. This makes your listings 3x more
                  likely to be featured in the "Safe Picks" section.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-background/50 border border-border/50 p-3">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    Response Speed
                  </div>
                  <div className="text-sm font-bold text-primary">⚡ Under 15 mins</div>
                </div>
                <div className="rounded-xl bg-background/50 border border-border/50 p-3">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    Verify Rate
                  </div>
                  <div className="text-sm font-bold text-success">✓ 100% Secure</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* Badge Showcase */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Earned Badges
          </h4>
          <div className="space-y-3">
            <TrustBadge type="verified" className="w-full justify-start py-2 px-3" />
            <TrustBadge type="trusted" className="w-full justify-start py-2 px-3" />
            <TrustBadge type="fast" className="w-full justify-start py-2 px-3" />
            <div className="group cursor-help relative mt-4 rounded-xl border border-dashed border-border p-4 transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground">NEXT BADGE</div>
                  <div className="text-sm font-medium">Top Rated Seller</div>
                </div>
              </div>
              <Progress value={80} className="h-1.5 mt-3" />
              <div className="text-[10px] text-muted-foreground mt-2">
                12/15 positive reviews to unlock
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`rounded-xl bg-muted/50 p-2 group-hover:bg-primary/10 transition-colors`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-success opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety Tips & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Security Center
            </h4>
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              Safety Hub <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm">
                <div className="font-bold">Meet in Secure Zones</div>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Always prefer the Library Plaza or SAC Lounge for exchanges.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-3 rounded-xl bg-accent/5 border border-accent/10">
              <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Lock className="h-4 w-4 text-accent" />
              </div>
              <div className="text-sm">
                <div className="font-bold">Use OTP Verification</div>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Never share OTP before seeing the product in person.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h4 className="font-bold mb-6">Recent Trust Activity</h4>
          <div className="space-y-4">
            {[
              {
                text: "Successfully completed trade with @rahul_v",
                time: "2h ago",
                type: "success",
              },
              { text: "Received 5★ review for MacBook Air", time: "5h ago", type: "review" },
              { text: "Account verified with .ac.in email", time: "2 days ago", type: "verify" },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${activity.type === "success" ? "bg-success" : activity.type === "review" ? "bg-warning" : "bg-primary"}`}
                  />
                  <span className="text-sm font-medium">{activity.text}</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
