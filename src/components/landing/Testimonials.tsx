import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  { quote: "Sold my old calculator in 20 minutes. The AI price was spot on — I would've underpriced it on OLX.", name: "Aarav S.", role: "B.Tech, IIT Madras" },
  { quote: "Finally a marketplace that doesn't feel sketchy. Everyone here is actually a student.", name: "Sneha P.", role: "BBA, Christ University" },
  { quote: "Got DSA notes from a senior and a cycle in the same week. Kampus is now muscle memory.", name: "Rohit K.", role: "CSE, BITS Pilani" },
];

export function Testimonials() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Loved by students</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The campus marketplace, finally done right.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
