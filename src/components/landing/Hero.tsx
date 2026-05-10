import { useRef, useState, useEffect, memo } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_BACKGROUNDS = [
  {
    id: "i1",
    type: "image",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "i2",
    type: "image",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "i3",
    type: "image",
    src: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "i4",
    type: "image",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
  },
];

export function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    // Preload images for smooth transitions
    HERO_BACKGROUNDS.forEach((bg) => {
      if (bg.type === "image") {
        const img = new Image();
        img.src = bg.src;
      }
    });

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 2000); // 2 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-background">
        {/* Slideshow Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <AnimatePresence initial={false}>
            <motion.div
              key={bgIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.5, ease: "easeInOut" },
                scale: { duration: 2.5, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              <img
                src={HERO_BACKGROUNDS[bgIndex].src}
                alt="Kampus Background"
                fetchPriority={bgIndex === 0 ? "high" : "auto"}
                loading={bgIndex === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle Dark-to-Transparent Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-10" />
          {/* Bottom fade to blend cleanly into the rest of the page */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 py-24 sm:px-6">
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
              Buy. Sell. Rent. Exchange — safely on campus. AI-powered fair pricing, real-time chat,
              and a trust score that means something.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row w-full max-w-md mx-auto sm:max-w-none">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 h-12 px-7 text-base w-full sm:w-auto"
              >
                <Link to="/signup">
                  Get verified — it's free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base w-full sm:w-auto"
              >
                <Link to="/login">Explore marketplace</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified .edu / .ac.in only
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> AI fair price on every listing
              </span>
              <span className="inline-flex items-center gap-1.5">⚡ Real-time chat & meetups</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <PreviewCards />
        </div>
      </section>
    </>
  );
}

const PreviewCards = memo(function PreviewCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const items = [
    // Live items
    {
      id: "calc",
      title: "Casio FX-991ES Plus",
      price: "₹950",
      ai: "₹850–₹1000",
      tag: "Calculator",
      image: "https://img.sanishtech.com/u/64c83726e8790b30931d183a2bd9dedf.jpg",
    },
    {
      id: "notes",
      title: "DSA Handwritten Notes",
      price: "₹120",
      ai: "₹100–₹150",
      tag: "Notes",
      image: "https://img.sanishtech.com/u/28f66e560a0fa23ef0b1d74d811500a6.jpg",
    },
    {
      id: "cycle",
      title: "Hero Sprint Cycle",
      price: "₹3,200",
      ai: "₹2,800–₹3,500",
      tag: "Cycle",
      image: "https://img.sanishtech.com/u/6265559bd1a743db969c3886de8a91b7.jpg",
    },
    {
      id: "mac",
      title: "MacBook Air M1",
      price: "₹45,000",
      ai: "₹42k–₹48k",
      tag: "Electronics",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop",
    },
    {
      id: "kit",
      title: "Engineering Drawing Kit",
      price: "₹450",
      ai: "₹400–₹500",
      tag: "Stationery",
      image:
        "https://images.unsplash.com/photo-1583086650426-302a2432c668?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="relative">
      <div className="mb-6 flex items-end justify-between px-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Featured on Kampus</h2>
          <p className="text-sm text-muted-foreground">Fresh listings verified by AI</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-9 w-9 shrink-0 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-9 w-9 shrink-0 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="group w-[280px] shrink-0 snap-start rounded-xl border border-border bg-card p-4 shadow-soft sm:w-[320px] hover:border-primary/30 hover:shadow-elegant transition-all"
          >
            <Link
              to="/product/$productId"
              params={{ productId: it.id }}
              className="block h-full cursor-pointer"
            >
              {it.image ? (
                <div className="mb-3 aspect-[4/3] overflow-hidden rounded-lg border border-border/40">
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="mb-3 aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/10 to-accent/10" />
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{it.tag}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              </div>
              <h3 className="mt-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                {it.title}
              </h3>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-lg font-bold">{it.price}</span>
                <span className="text-[10px] font-medium text-accent">AI: {it.ai}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          asChild
          variant="ghost"
          className="group text-primary hover:text-primary/80 h-10 px-6 font-semibold"
        >
          <Link to="/login">
            View More Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
});
