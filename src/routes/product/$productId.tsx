import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createListingRequest } from "@/lib/requests";
import { toast } from "sonner";
import {
  MessageSquare,
  ShieldCheck,
  MapPin,
  Calendar,
  Heart,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Share2,
  ShoppingBag,
  TrendingUp,
  Clock,
  IndianRupee,
} from "lucide-react";
import { useState } from "react";
import { ChatModal } from "@/components/marketplace/ChatModal";
import { AIRecommendations } from "@/components/landing/AIRecommendations";
import { CampusMap } from "@/components/marketplace/CampusMap";
import { useAuth } from "@/lib/auth-context";
import { ListingService } from "@/lib/listing-service";
import { useEffect } from "react";

export const Route = createFileRoute("/product/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<"buy" | "rent" | "bid">("buy");
  const [requestAmount, setRequestAmount] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [liveProduct, setLiveProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback mock data for hero preview cards (non-UUID IDs)
  const MOCK_PRODUCTS: Record<string, any> = {
    calc: {
      id: "calc", title: "Casio FX-991ES Plus", price: 950, category: "Calculator",
      condition: "Good", description: "Scientific calculator with 417 functions. Perfect for engineering students. 1 year old, no scratches.",
      images: ["https://img.sanishtech.com/u/64c83726e8790b30931d183a2bd9dedf.jpg"],
      availability_status: "available", created_at: new Date().toISOString(),
      meetup_location: "Main Library Entrance",
      seller: { id: "s1", full_name: "Arjun Sharma", avatar_url: null, trust_score: 92, verified: true, college: "IIT Delhi", campus_location: "South Campus", trades_completed: 14 },
    },
    notes: {
      id: "notes", title: "DSA Handwritten Notes", price: 120, category: "Books & Notes",
      condition: "Like New", description: "Complete Data Structures & Algorithms notes for semester 3. Covers arrays, trees, graphs, DP. Very clean.",
      images: ["https://img.sanishtech.com/u/28f66e560a0fa23ef0b1d74d811500a6.jpg"],
      availability_status: "available", created_at: new Date().toISOString(),
      meetup_location: "Engineering Block B",
      seller: { id: "s2", full_name: "Priya Menon", avatar_url: null, trust_score: 88, verified: true, college: "NIT Trichy", campus_location: "Central Block", trades_completed: 7 },
    },
    cycle: {
      id: "cycle", title: "Hero Sprint Cycle", price: 3200, category: "Bicycles",
      condition: "Good", description: "21-speed Hero Sprint mountain bike. Great for campus commuting. Recently serviced with new chain. Minor paint scuffs on frame.",
      images: ["https://img.sanishtech.com/u/6265559bd1a743db969c3886de8a91b7.jpg"],
      availability_status: "available", created_at: new Date().toISOString(),
      meetup_location: "Boys Hostel Parking",
      seller: { id: "s3", full_name: "Rohan Kapoor", avatar_url: null, trust_score: 79, verified: true, college: "BITS Pilani", campus_location: "Pilani Campus", trades_completed: 3 },
    },
    mac: {
      id: "mac", title: "MacBook Air M1", price: 45000, category: "Electronics & Laptops",
      condition: "Like New", description: "MacBook Air M1 8GB/256GB Space Grey. Bought in 2022, used lightly. Battery health 97%. Comes with original charger and box.",
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop"],
      availability_status: "available", created_at: new Date().toISOString(),
      meetup_location: "Admin Building Lobby",
      seller: { id: "s4", full_name: "Sneha Patil", avatar_url: null, trust_score: 96, verified: true, college: "IIT Bombay", campus_location: "Powai Campus", trades_completed: 22 },
    },
    kit: {
      id: "kit", title: "Engineering Drawing Kit", price: 450, category: "Stationery",
      condition: "Good", description: "Complete engineering drawing kit: drafter, compass set, scales, pencils. Used for 1 semester. All pieces intact.",
      images: ["https://images.unsplash.com/photo-1583086650426-302a2432c668?w=800&auto=format&fit=crop"],
      availability_status: "available", created_at: new Date().toISOString(),
      meetup_location: "Architecture Block",
      seller: { id: "s5", full_name: "Aditya Rao", avatar_url: null, trust_score: 83, verified: true, college: "SPA Delhi", campus_location: "IP Estate", trades_completed: 5 },
    },
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // Check mock data first for hero preview cards
        if (MOCK_PRODUCTS[productId]) {
          setLiveProduct(MOCK_PRODUCTS[productId]);
        } else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId)) {
          const data = await ListingService.getListingById(productId);
          setLiveProduct(data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleRequestSubmit = async () => {
    if (!user) {
      toast.error("Please login to send requests");
      return;
    }

    setIsSubmitting(true);
    try {
      await createListingRequest({
        listingId: productId,
        buyerId: user.id,
        sellerId: product.seller.id,
        type: requestType,
        amount: parseInt(requestAmount),
        message: requestMessage,
      });
      toast.success(`${requestType.charAt(0).toUpperCase() + requestType.slice(1)} request sent!`);
      setIsRequestModalOpen(false);
    } catch (err: any) {
      console.error("Request Error:", err);
      toast.error(err.message || "Failed to send request");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Loading & Missing States
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground font-medium">Fetching product details...</p>
      </div>
    );
  }

  if (!liveProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <main className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="rounded-xl px-8 shadow-elegant">
            <Link to="/">Back to Marketplace</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const product = {
    id: liveProduct.id,
    title: liveProduct.title,
    price: `₹${(liveProduct.price || 0).toLocaleString()}`,
    aiEstimate: `₹${((liveProduct.price || 0) * 0.9).toFixed(0)}–₹${((liveProduct.price || 0) * 1.1).toFixed(0)}`,
    tag: liveProduct.category,
    condition: liveProduct.condition,
    image:
      liveProduct.images?.[0] ||
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    gallery:
      liveProduct.images?.length > 0
        ? liveProduct.images
        : [
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
          ],
    description: liveProduct.description,
    seller: {
      id: liveProduct.seller?.id,
      name: liveProduct.seller?.full_name || "Merchant",
      avatar:
        liveProduct.seller?.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${liveProduct.seller?.full_name}`,
      isVerified: liveProduct.seller?.verified || false,
      department: liveProduct.seller?.college || "University Student",
      batch: "2024",
      trustScore: liveProduct.seller?.trust_score || 85,
      location: liveProduct.seller?.campus_location || "Campus Hub",
      postedAt: new Date(liveProduct.created_at).toLocaleDateString(),
    },
  };

  const currentImage = selectedImage || product.image;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
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
              <img
                src={currentImage}
                alt={product.title}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            </div>
            {/* Gallery thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {product.gallery.map((img: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`h-24 w-32 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${currentImage === img ? "border-primary opacity-100" : "border-transparent opacity-70 hover:opacity-100 hover:border-primary/50"}`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Meetup Location Map */}
            <div className="mt-4">
              <h3 className="font-semibold mb-3">Suggested Meetup Location</h3>
              <CampusMap
                locations={[
                  {
                    longitude: 77.2025,
                    latitude: 28.6041,
                    title: "Campus Library",
                    description: "Meet outside the main entrance for exchange.",
                  },
                ]}
                center={{ longitude: 77.2025, latitude: 28.6041 }}
                zoom={14}
                className="h-[250px] sm:h-[300px] w-full rounded-2xl overflow-hidden shadow-sm border border-border"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {product.tag}
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {product.title}
                </h1>
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
                ₹{parseInt(product.price.replace(/\D/g, "")) + 800} MRP
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
                  Kampus AI estimates this item should sell between{" "}
                  <strong className="text-foreground">{product.aiEstimate}</strong> based on campus
                  trends.
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
              <p className="mt-2 leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            {/* Seller Card */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-full bg-secondary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold">{product.seller.name}</h3>
                    {product.seller.isVerified && <ShieldCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {product.seller.department} • {product.seller.batch}
                  </p>
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
                <Button
                  className="w-full shadow-elegant bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-bold rounded-xl"
                  onClick={() => {
                    setRequestType("buy");
                    setIsRequestModalOpen(true);
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/5 h-11 font-bold rounded-xl"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 font-bold rounded-xl border-accent/30 text-accent hover:bg-accent/5"
                  onClick={() => {
                    setRequestType("rent");
                    setIsRequestModalOpen(true);
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" /> Rent Out
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 font-bold rounded-xl border-warning/30 text-warning hover:bg-warning/5"
                  onClick={() => {
                    setRequestType("bid");
                    setIsRequestModalOpen(true);
                  }}
                >
                  <TrendingUp className="mr-2 h-4 w-4" /> Place Bid
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <AlertTriangle className="h-3 w-3" /> Never pay in advance. Meet on campus to
                exchange.
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
        productId={product.id}
        productTitle={product.title}
        productPrice={product.price}
      />

      {/* Request Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {requestType === "buy"
                ? "Buy Product"
                : requestType === "rent"
                  ? "Request Rent"
                  : "Place a Bid"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                Offer Amount (₹)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder={product.price.replace(/\D/g, "")}
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  className="pl-9 h-12 rounded-xl border-border focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                Message to Seller
              </label>
              <Textarea
                placeholder="e.g. I can pick it up tomorrow from the library."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="rounded-xl border-border focus:ring-primary/20 min-h-[100px] resize-none"
              />
            </div>
            <Button
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-elegant mt-2"
              disabled={isSubmitting}
              onClick={handleRequestSubmit}
            >
              {isSubmitting ? "Sending..." : "Confirm Request"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
