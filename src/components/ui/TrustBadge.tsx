import { ShieldCheck, Star, Award, Zap, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeType = "trusted" | "verified" | "fast" | "top" | "risk";

interface TrustBadgeProps {
  type: BadgeType;
  className?: string;
  showText?: boolean;
}

const BADGE_CONFIG = {
  trusted: {
    icon: Award,
    label: "Trusted Seller",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  verified: {
    icon: ShieldCheck,
    label: "Verified Student",
    color: "bg-success/10 text-success border-success/20",
  },
  fast: {
    icon: Zap,
    label: "Fast Responder",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  top: {
    icon: Star,
    label: "Top Rated",
    color: "bg-warning/10 text-warning border-warning/20",
  },
  risk: {
    icon: ShieldAlert,
    label: "Under Review",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function TrustBadge({ type, className, showText = true }: TrustBadgeProps) {
  const config = BADGE_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all hover:scale-105",
        config.color,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {showText && <span>{config.label}</span>}
    </div>
  );
}
