import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  { q: "Who can join Kampus?", a: "Any student with a valid college email (.edu, .ac.in, .edu.in, etc.). We auto-verify your domain at signup." },
  { q: "Is Kampus free to use?", a: "Yes. Buying, selling, chatting, and AI pricing are all free for students. We don't take a cut of trades." },
  { q: "How does the AI fair price work?", a: "Our AI looks at the item, condition, age, and similar trades on nearby campuses to give you a recommended price band." },
  { q: "What if I get scammed?", a: "Every user is verified, has a public trust score, and our system flags suspiciously low prices. Report fraud and we act fast." },
  { q: "Can I rent things, not just sell?", a: "Yes — list as Sale, Rent, or Exchange. Great for one-semester gear like lab coats or calculators." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything else, answered.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 rounded-2xl border border-border bg-card shadow-soft">
          {items.map((it, i) => (
            <AccordionItem key={it.q} value={`i-${i}`} className="px-6 last:border-0">
              <AccordionTrigger className="text-left text-base font-semibold">{it.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
