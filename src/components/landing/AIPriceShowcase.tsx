import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";

export function AIPriceShowcase() {
  return (
    <section id="ai" className="relative overflow-hidden bg-secondary/40 py-24">
      <div className="absolute inset-0 bg-hero opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Powered by AI
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Never overpay. <span className="text-gradient">Never undersell.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tell us what you have — calculator, textbook, cycle, lab coat — and Kampus AI returns
              a fair price band based on age, condition, and what students actually pay on campus.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Instant fair price band on every listing",
                "Detects suspiciously low prices (potential fraud)",
                "Powered by Gemini, tuned for Indian campuses",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary">
                    <TrendingUp className="h-3 w-3 text-primary-foreground" />
                  </span>
                  <span className="text-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
          >
            <div className="rounded-xl bg-secondary/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your listing
              </div>
              <div className="mt-2 font-display text-lg font-bold">Casio FX-991ES Plus</div>
              <div className="mt-1 text-sm text-muted-foreground">Scientific calculator · 1 year old · Good condition</div>
            </div>

            <div className="mt-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 to-accent/8 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Kampus AI · fair price
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <div className="font-display text-4xl font-bold text-gradient">₹850</div>
                <div className="text-2xl text-muted-foreground">–</div>
                <div className="font-display text-4xl font-bold text-gradient">₹1000</div>
              </div>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="bg-gradient-primary"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Based on 12 similar trades on nearby campuses in the last 90 days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
