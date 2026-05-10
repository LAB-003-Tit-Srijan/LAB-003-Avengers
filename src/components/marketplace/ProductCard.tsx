import { Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TrustBadge, BadgeType } from "@/components/ui/TrustBadge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  aiEstimate?: string;
  image?: string;
  tag: string;
  reason?: string;
  sellerTrustScore?: number;
  sellerBadges?: BadgeType[];
  location?: string;
  className?: string;
}

export function ProductCard({
  id,
  title,
  price,
  aiEstimate,
  image,
  tag,
  reason,
  sellerTrustScore = 85,
  sellerBadges = ["verified"],
  location = "Main Campus",
  className,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative w-full rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:border-primary/30 hover:shadow-elegant",
        className,
      )}
    >
      <Link
        to="/product/$productId"
        params={{ productId: id }}
        className="block h-full cursor-pointer"
      >
        {/* AI Insight Overlay */}
        {reason && (
          <div className="absolute top-6 left-6 z-10 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-bold text-primary backdrop-blur-md flex items-center gap-1 shadow-sm border border-primary/10">
            <Sparkles className="h-3 w-3" /> {reason}
          </div>
        )}

        {/* Product Image */}
        {image ? (
          <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border/40 bg-muted/20">
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="mb-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10" />
        )}

        {/* Seller Trust & Tag */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-wrap gap-1">
            {sellerBadges.map((badge) => (
              <TrustBadge
                key={badge}
                type={badge}
                showText={false}
                className="scale-90 origin-left"
              />
            ))}
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {tag}
          </span>
        </div>

        {/* Title & Location */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {location}
        </div>

        {/* Pricing Section */}
        <div className="mt-4 flex items-end justify-between border-t border-border/50 pt-3">
          <div>
            <div className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Asking Price
            </div>
            <div className="text-xl font-bold">{price}</div>
          </div>
          {aiEstimate && (
            <div className="text-right">
              <div className="text-[9px] font-medium text-accent uppercase tracking-wider mb-0.5">
                AI Fair Price
              </div>
              <div className="text-sm font-semibold text-accent">{aiEstimate}</div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
