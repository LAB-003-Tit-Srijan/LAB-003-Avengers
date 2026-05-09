import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, ShieldCheck, MapPin, Calendar, 
  Heart, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Share2 
} from "lucide-react";
import { useState } from "react";
import { ChatModal } from "@/components/marketplace/ChatModal";
import { AIRecommendations } from "@/components/landing/AIRecommendations";

export const Route = createFileRoute("/product/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // MOCK DATA based on ID (fallback to cycle)
  const product = {
    id: productId,
    title: productId === "calc" ? "Casio FX-991ES Plus" : "Hero Sprint Cycle",
    price: productId === "calc" ? "₹950" : "₹3,200",
    aiEstimate: productId === "calc" ? "₹850–₹1000" : "₹2,800–₹3,500",
    tag: productId === "calc" ? "Calculator" : "Cycle",
    condition: "Good - 1 year old",
    image: productId === "calc" ? "https://img.sanishtech.com/u/6265559bd1a743db969c3886de8a91b7.jpg" : "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop",
    gallery: [
      productId === "calc" ? "https://img.sanishtech.com/u/6265559bd1a743db969c3886de8a91b7.jpg" : "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop"
    ],
    description: "Selling my item since I'm moving out of campus. Has been regularly serviced and is in great condition. Ready for immediate pickup.",
    seller: {
      name: "Rahul M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      isVerified: true,
      department: "B.Tech Computer Science",
      batch: "2024",
      trustScore: 98,
      location: "Karakoram Hostel, IIT Delhi",
      postedAt: "2 days ago"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="hover:text-primary cursor-pointer">Marketplace</span>
          <ChevronRight className="h-4 w-4" />
          <span className="hover:text-primary cursor-pointer">{product.tag}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card">
              <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
            </div>
            {/* Gallery thumbnails */}
            <div className="flex gap-4 overflow-x-auto">
              {product.gallery.map((img, i) => (
                <div key={i} className={`h-24 w-32 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${i === 0 ? "border-primary" : "border-transparent hover:border-primary/50"}`}>
                  <img src={img} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {product.tag}
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{product.title}</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="shrink-0 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`shrink-0 rounded-full transition-colors ${isSaved ? "border-red-500/20 text-red-500 bg-red-500/10" : ""}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-end gap-4">
              <span className="font-display text-4xl font-bold">{product.price}</span>
              <span className="mb-1 rounded bg-secondary px-2 py-0.5 text-sm font-medium text-muted-foreground line-through">
                ₹{parseInt(product.price.replace(/\D/g,'')) + 800} MRP
              </span>
            </div>

            {/* AI Fair Price Card */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">AI Fair Price Estimate</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Kampus AI estimates this item should sell between <strong className="text-foreground">{product.aiEstimate}</strong> based on campus trends.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Well priced listing
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-y border-border py-6">
              <div className="flex grid-cols-2 flex-col gap-4 sm:grid">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Condition</h4>
                  <p className="mt-1 font-medium">{product.condition}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Posted</h4>
                  <div className="mt-1 flex items-center gap-1.5 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" /> {product.seller.postedAt}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Description</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Seller Card */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={product.seller.avatar} alt={product.seller.name} className="h-14 w-14 rounded-full bg-secondary" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold">{product.seller.name}</h3>
                    {product.seller.isVerified && (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{product.seller.department} • {product.seller.batch}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                      Trust Score: {product.seller.trustScore}%
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {product.seller.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button className="w-full shadow-elegant bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsChatOpen(true)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Seller
                </Button>
                <Button variant="outline" className="w-full bg-background border-primary/20 text-primary hover:bg-primary/5">
                  Make an Offer
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <AlertTriangle className="h-3 w-3" /> Never pay in advance. Meet on campus to exchange.
              </p>
            </div>
          </div>
        </div>

        {/* Separator before recommendations */}
        <div className="mt-20">
           <div className="mb-6">
             <h2 className="font-display text-2xl font-bold">Similar Products</h2>
           </div>
        </div>
      </main>
      
      {/* Reusing AIRecommendations component */}
      <AIRecommendations />

      <Footer />

      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        seller={product.seller}
        productTitle={product.title}
        productPrice={product.price}
      />
    </div>
  );
}
