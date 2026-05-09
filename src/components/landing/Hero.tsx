import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-pattern" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
            Verified students only · Trusted by campuses
          </div>

          <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            India's first <span className="text-gradient">verified student</span> marketplace
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Buy. Sell. Rent. Exchange — safely on campus. AI-powered fair pricing,
            real-time chat, and a trust score that means something.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 h-12 px-7 text-base">
              <Link to="/signup">
                Get verified — it's free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
              <Link to="/login">Explore marketplace</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Verified .edu / .ac.in only</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-accent" /> AI fair price on every listing</span>
            <span className="inline-flex items-center gap-1.5">⚡ Real-time chat & meetups</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-2xl border border-border bg-card p-2 shadow-elegant">
            <div className="rounded-xl bg-gradient-to-br from-secondary to-background p-8 sm:p-10">
              <PreviewCards />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewCards() {
  const items = [
    { title: "Casio FX-991ES Plus", price: "₹950", ai: "₹850–₹1000", tag: "Calculator" },
    { title: "DSA Handwritten Notes", price: "₹120", ai: "₹100–₹150", tag: "Notes" },
    { title: "Hero Sprint Cycle", price: "₹3,200", ai: "₹2,800–₹3,500", tag: "Cycle" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="rounded-xl border border-border bg-card p-4 shadow-soft"
        >
          <div className="mb-3 aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{it.tag}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
              <ShieldCheck className="h-3 w-3" /> Verified
            </span>
          </div>
          <h3 className="mt-2 font-semibold text-foreground">{it.title}</h3>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-lg font-bold">{it.price}</span>
            <span className="text-[10px] font-medium text-accent">AI: {it.ai}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
