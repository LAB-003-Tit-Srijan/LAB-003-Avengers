import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Search,
  Award,
  Map,
  BookOpen,
  Bike,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified students",
    desc: "College email + student ID verification keeps non-students out.",
  },
  {
    icon: Sparkles,
    title: "AI fair price",
    desc: "Gemini-powered price band on every listing — no overpaying.",
  },
  {
    icon: MessageSquare,
    title: "Real-time chat",
    desc: "Negotiate, schedule meetups, and send price offers in-thread.",
  },
  {
    icon: Award,
    title: "Trust scores",
    desc: "Public reputation built from completed trades and ratings.",
  },
  {
    icon: Map,
    title: "Safe meetup spots",
    desc: "Pre-vetted campus locations, ICS calendar invites included.",
  },
  {
    icon: Search,
    title: "Smart search",
    desc: "Category filters, condition, age, and price range.",
  },
  {
    icon: BookOpen,
    title: "Notes & resources",
    desc: "Buy or trade DSA notes, lab records, prep material.",
  },
  {
    icon: Bike,
    title: "Cycles & gear",
    desc: "From hostel essentials to lab equipment and electronics.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything a student needs, nothing they don't.
          </h2>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-soft">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
