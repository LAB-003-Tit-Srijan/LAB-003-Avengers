import { Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, TrendingUp, Eye, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_RECOMMENDATIONS = {
  "recommended": {
    title: "Recommended For You",
    icon: Sparkles,
    description: "Personalized picks based on your recent activity.",
    items: [
      { id: "1", title: "MacBook Air M1", price: "₹45,000", ai: "₹42k–₹48k", tag: "Electronics", reason: "Because you viewed laptops", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60" },
      { id: "2", title: "Sony WH-1000XM4", price: "₹18,500", ai: "₹17k–₹20k", tag: "Audio", reason: "Pairs well with electronics", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60" },
      { id: "3", title: "Logitech MX Master 3", price: "₹6,000", ai: "₹5.5k–₹6.5k", tag: "Accessories", reason: "Popular with CS students", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60" },
      { id: "3b", title: "iPad Air 5th Gen", price: "₹42,000", ai: "₹40k–₹45k", tag: "Tablets", reason: "You might also like", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60" }
    ]
  },
  "interests": {
    title: "Based on Your Interests",
    icon: Compass,
    description: "Because you like 'Computer Science' and 'Gaming'.",
    items: [
      { id: "4", title: "DSA Handwritten Notes", price: "₹120", ai: "₹100–₹150", tag: "Notes", reason: "Matches 'Computer Science'", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60" },
      { id: "5", title: "Razer BlackWidow V3", price: "₹8,500", ai: "₹8k–₹10k", tag: "Gaming", reason: "Matches 'Gaming'", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60" },
      { id: "6", title: "Algorithms Book", price: "₹450", ai: "₹400–₹500", tag: "Books", reason: "Core CS material" }
    ]
  },
  "viewed": {
    title: "Students Also Viewed",
    icon: Eye,
    description: "People who looked at 'Calculators' also checked these out.",
    items: [
      { id: "7", title: "Casio FX-991ES Plus", price: "₹950", ai: "₹850–₹1000", tag: "Calculator", reason: "Often bought together", image: "https://img.sanishtech.com/u/6265559bd1a743db969c3886de8a91b7.jpg" },
      { id: "8", title: "Engineering Drawing Kit", price: "₹450", ai: "₹400–₹500", tag: "Stationery", reason: "Common 1st year essential" },
      { id: "9", title: "Lab Coat", price: "₹300", ai: "₹250–₹350", tag: "Apparel", reason: "Frequently viewed" }
    ]
  },
  "trending": {
    title: "Trending in Your Campus",
    icon: TrendingUp,
    description: "What's hot right now at your university.",
    items: [
      { id: "10", title: "Hero Sprint Cycle", price: "₹3,200", ai: "₹2.8k–₹3.5k", tag: "Transport", reason: "#1 Trending this week", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60" },
      { id: "11", title: "Mini Fridge 45L", price: "₹5,500", ai: "₹5k–₹6.5k", tag: "Hostel", reason: "High demand right now", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&auto=format&fit=crop&q=60" },
      { id: "12", title: "Table Lamp", price: "₹600", ai: "₹500–₹700", tag: "Hostel", reason: "Hostel essential" }
    ]
  }
};

export function AIRecommendations() {
  const [activeTab, setActiveTab] = useState<keyof typeof MOCK_RECOMMENDATIONS>("recommended");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentData = MOCK_RECOMMENDATIONS[activeTab];

  return (
    <section className="bg-secondary/30 py-24 sm:py-32 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Intelligent <span className="text-primary">Discovery</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Kampus AI learns what you need. Personalized marketplace suggestions tailored just for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {(Object.keys(MOCK_RECOMMENDATIONS) as Array<keyof typeof MOCK_RECOMMENDATIONS>).map((key) => {
            const Icon = MOCK_RECOMMENDATIONS[key].icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`group flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive 
                  ? "bg-primary text-primary-foreground shadow-elegant" 
                  : "bg-background border border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"}`} />
                {MOCK_RECOMMENDATIONS[key].title}
              </button>
            );
          })}
        </div>

        {/* Header & Description */}
        <div className="mb-6 flex items-end justify-between">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <currentData.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{currentData.title}</h3>
              <p className="text-sm text-muted-foreground">{currentData.description}</p>
            </div>
          </motion.div>
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} className="h-9 w-9 shrink-0 rounded-full border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')} className="h-9 w-9 shrink-0 rounded-full border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence>
            {currentData.items.map((it, i) => (
              <motion.div
                key={it.id + activeTab}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative w-[280px] shrink-0 snap-start rounded-2xl border border-border bg-card p-4 shadow-soft sm:w-[320px] transition-all hover:border-primary/30 hover:shadow-elegant"
              >
                <Link to="/product/$productId" params={{ productId: it.id }} className="block h-full cursor-pointer">
                  {/* AI Badge Overlay */}
                  <div className="absolute top-6 left-6 z-10 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-bold text-primary backdrop-blur-md flex items-center gap-1 shadow-sm border border-primary/10">
                    <Sparkles className="h-3 w-3" /> {it.reason}
                  </div>

                  {it.image ? (
                    <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border/40">
                      <img 
                        src={it.image} 
                        alt={it.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  ) : (
                    <div className="mb-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10" />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{it.tag}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </span>
                  </div>
                  
                  <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{it.title}</h3>
                  
                  <div className="mt-4 flex items-end justify-between border-t border-border/50 pt-3">
                    <div>
                      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Asking Price</div>
                      <div className="text-xl font-bold">{it.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-medium text-accent uppercase tracking-wider mb-0.5">AI Estimate</div>
                      <div className="text-sm font-semibold text-accent">{it.ai}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
