import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Verify your campus email",
    desc: "Sign up with your @college.edu or @college.ac.in email. Instantly verified, badge unlocked.",
  },
  {
    n: "02",
    title: "List or browse in seconds",
    desc: "Snap a photo, write a line, and get an AI fair-price suggestion. Or filter listings by category.",
  },
  {
    n: "03",
    title: "Chat, meet, exchange safely",
    desc: "Negotiate in-app, pick a vetted campus meetup spot, and complete the trade. Rate each other.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How it works
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            From signup to swap in 60 seconds.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-soft"
            >
              <div className="font-display text-5xl font-bold text-gradient">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
