import { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  ShoppingCart,
  ShieldCheck,
  MapPin,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reel } from "@/lib/reels-data";
import { Link } from "@tanstack/react-router";

interface ReelItemProps {
  reel: Reel;
  isActive: boolean;
}

export function ReelItem({ reel, isActive }: ReelItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch((e) => console.log("Autoplay blocked", e));
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative h-full w-full snap-start bg-black overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted={isMuted}
        playsInline
        className="h-full w-full object-cover"
        onClick={() => setIsMuted(!isMuted)}
      />

      {/* Mute Toggle Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {!isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/20 backdrop-blur-sm p-4 rounded-full"
            >
              <VolumeX className="h-12 w-12 text-white/50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient Bottom Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-48 flex flex-col gap-6 z-10">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleLike}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all active:scale-75 shadow-lg"
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`h-7 w-7 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-400"}`}
              />
            </motion.div>
          </button>
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {reel.likes + (isLiked ? 1 : 0)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all hover:bg-white/20 active:scale-90 shadow-lg">
            <MessageSquare className="h-7 w-7 text-white" />
          </button>
          <span className="text-xs font-bold text-white drop-shadow-lg">Chat</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all hover:bg-white/20 active:scale-90 shadow-lg">
            <Share2 className="h-7 w-7 text-white" />
          </button>
          <span className="text-xs font-bold text-white drop-shadow-lg">Share</span>
        </div>

        <div className="mt-2 flex flex-col items-center gap-1 relative">
          <div className="p-0.5 rounded-full bg-gradient-primary shadow-lg">
            <img
              src={reel.seller.avatar}
              alt={reel.seller.name}
              className="h-14 w-14 rounded-full border-2 border-black/20 bg-secondary"
            />
          </div>
          <button className="absolute -bottom-2 bg-primary text-[10px] text-white px-3 py-1 rounded-full font-black shadow-lg border border-white/20">
            FOLLOW
          </button>
        </div>
      </div>

      {/* Bottom Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10 max-w-[calc(100%-80px)]">
        <div className="flex flex-col gap-4">
          {/* Seller Info */}
          <div className="flex items-center gap-2 text-white">
            <span className="font-bold text-lg">{reel.seller.name}</span>
            {reel.seller.isVerified && <ShieldCheck className="h-4 w-4 text-primary" />}
            <span className="mx-1 opacity-50">•</span>
            <div className="flex items-center gap-1 text-xs opacity-80">
              <MapPin className="h-3 w-3" />
              {reel.product.campus}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-1 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="bg-primary/30 text-primary-foreground text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-primary/30">
                {reel.product.category}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white drop-shadow-xl tracking-tight">
              {reel.product.name}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-black text-primary drop-shadow-lg">
                {reel.product.price}
              </p>
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">
                Verified Price
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              asChild
              className="flex-1 bg-primary text-white hover:bg-primary/90 shadow-elegant rounded-2xl h-14 font-bold text-base transition-transform active:scale-95"
            >
              <Link to="/product/$productId" params={{ productId: reel.product.id }}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Product
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 rounded-2xl h-14 w-14 p-0 shadow-lg transition-transform active:scale-95"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
