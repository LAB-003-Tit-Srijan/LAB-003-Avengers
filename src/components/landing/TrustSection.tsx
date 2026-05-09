import { motion } from "framer-motion";
import { ShieldCheck, Users, MapPin, Sparkles, X, Check } from "lucide-react";

const compare = [
  { label: "Verified students only", olx: false, kampus: true },
  { label: "AI-powered fair pricing", olx: false, kampus: true },
  { label: "Campus-only meetups", olx: false, kampus: true },
  { label: "Real trust scores", olx: false, kampus: true },
  { label: "Anonymous strangers", olx: true, kampus: false },
  { label: "Risk of fraud", olx: true, kampus: false },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why not OLX?
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Built for campus, not for strangers.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            OLX puts you in a room with the entire internet. Kampus is a safer
            marketplace where every buyer and seller is a verified student from a real college.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
        >
          <div className="grid grid-cols-3 border-b border-border bg-muted/40 text-sm font-semibold">
            <div className="px-6 py-4 text-muted-foreground">Feature</div>
            <div className="px-6 py-4 text-center text-muted-foreground">OLX & others</div>
            <div className="px-6 py-4 text-center text-primary">Kampus</div>
          </div>
          {compare.map((row) => (
            <div key={row.label} className="grid grid-cols-3 border-b border-border last:border-0">
              <div className="px-6 py-4 text-sm">{row.label}</div>
              <div className="grid place-items-center px-6 py-4">
                {row.olx ? <Check className="h-4 w-4 text-muted-foreground" /> : <X className="h-4 w-4 text-muted-foreground/50" />}
              </div>
              <div className="grid place-items-center px-6 py-4">
                {row.kampus ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground/50" />}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, label: "Verified", value: ".edu / .ac.in" },
            { icon: Users, label: "Students", value: "Campus-only" },
            { icon: MapPin, label: "Meetups", value: "Safe spots" },
            { icon: Sparkles, label: "AI", value: "Fair pricing" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-lg font-bold">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
