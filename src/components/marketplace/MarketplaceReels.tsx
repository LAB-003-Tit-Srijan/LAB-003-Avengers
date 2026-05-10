import { useState, useRef, useEffect } from "react";
import { REELS_DATA } from "@/lib/reels-data";
import { ReelItem } from "./ReelItem";
import { ArrowLeft, Sparkles, TrendingUp, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export function MarketplaceReels() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchReels() {
      setLoading(true);
      const { data, error } = await supabase
        .from("reels" as any)
        .select(
          `
          *,
          seller:profiles(id, full_name, avatar_url, verified),
          listing:listings(id, title, price, category, campus_location)
        `,
        )
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReels(
          (data as any[]).map((r: any) => ({
            id: r.id,
            videoUrl: r.video_url,
            seller: {
              name: r.seller?.full_name || "Merchant",
              avatar:
                r.seller?.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.seller?.full_name || "Merchant"}`,
              isVerified: r.seller?.verified || false,
            },
            product: {
              id: r.listing?.id || "unknown",
              name: r.listing?.title || "Product",
              price: r.listing?.price ? `₹${r.listing.price.toLocaleString()}` : "TBD",
              category: r.listing?.category || "General",
              campus: r.listing?.campus_location || "Campus",
            },
            likes: r.likes_count || 0,
          })),
        );
      }
      setLoading(false);
    }
    fetchReels();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.clientHeight > 0) {
      const container = scrollContainerRef.current;
      const index = Math.round(container.scrollTop / container.clientHeight);
      const dataLength = reels.length > 0 ? reels.length : REELS_DATA.length;
      if (index !== activeReelIndex && index >= 0 && index < dataLength) {
        setActiveReelIndex(index);
      }
    }
  };

  const displayReels = reels.length > 0 ? reels : REELS_DATA;
  const currentReel = displayReels[activeReelIndex];

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col md:flex-row">
      {/* Header Overlay (Mobile only) */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent md:hidden">
        <Link to="/" className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex gap-4">
          <span className="text-white font-bold border-b-2 border-primary pb-1">For You</span>
          <span className="text-white/60 font-bold">Trending</span>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Desktop Sidebar (Optional, but good for discovery) */}
      <aside className="hidden md:flex w-80 flex-col border-r border-border/10 bg-black p-6 gap-8 z-30">
        <Link
          to="/"
          className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-2 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-soft">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="text-white font-display text-2xl font-bold tracking-tight">Kampus</span>
        </Link>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-6 px-4">
              Discover
            </h3>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-bold shadow-elegant transition-transform active:scale-95">
                <Sparkles className="h-5 w-5" />
                For You
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
                <TrendingUp className="h-5 w-5" />
                Trending
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
                <Clock className="h-5 w-5" />
                Latest
              </button>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
              Top Campuses
            </h3>
            <div className="flex flex-wrap gap-2">
              {["IIT Delhi", "DTU", "NSUT", "DU North", "BITS"].map((campus) => (
                <span
                  key={campus}
                  className="px-3 py-1.5 rounded-full bg-white/5 text-white/80 text-xs border border-white/10 hover:border-primary/50 cursor-pointer transition-colors"
                >
                  {campus}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 rounded-2xl bg-gradient-primary/20 border border-primary/20">
          <p className="text-sm text-white font-medium">Have something to sell?</p>
          <p className="text-xs text-white/60 mt-1 mb-4">Post a reel and sell faster!</p>
          <Link
            to="/dashboard"
            className="block text-center w-full py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-elegant"
          >
            Upload Reel
          </Link>
        </div>
      </aside>

      {/* Reels Feed Container */}
      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      >
        {displayReels.map((reel, index) => (
          <ReelItem key={reel.id} reel={reel} isActive={index === activeReelIndex} />
        ))}
      </main>

      {/* Right side info (Desktop only) */}
      <div className="hidden lg:flex w-96 flex-col border-l border-border/10 bg-black p-8 z-30">
        <h2 className="text-white text-xl font-bold mb-6">About this Product</h2>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <img src={currentReel.seller.avatar} className="h-12 w-12 rounded-full" />
            <div>
              <p className="text-white font-bold">{currentReel.seller.name}</p>
              <p className="text-white/40 text-xs">{currentReel.product.campus}</p>
            </div>
          </div>
          <h3 className="text-white text-lg font-bold mb-2">{currentReel.product.name}</h3>
          <p className="text-primary text-2xl font-black mb-4">{currentReel.product.price}</p>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Verified product from a student in {currentReel.product.campus}. Discover more through
            short videos and chat directly with the seller.
          </p>
          <Link
            to="/product/$productId"
            params={{ productId: currentReel.product.id }}
            className="block w-full py-3 bg-white text-black text-center font-bold rounded-xl hover:bg-white/90 transition-colors"
          >
            Full Product Details
          </Link>
        </div>
      </div>
    </div>
  );
}
