import { useState, useEffect } from "react";
import { ShoppingBag, Search, ExternalLink, User, Calendar, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPurchasedProducts } from "@/lib/listings";
import { toast } from "sonner";
import { format } from "date-fns";

export function PurchasedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPurchasedProducts("current-user-id");
        setProducts(data || []);
      } catch (err) {
        toast.error("Failed to load purchase history");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">Loading your purchase history...</div>
    );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display">My Purchases</h2>
        <p className="text-muted-foreground mt-1">Items you've bought from fellow students.</p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-lg">No purchases yet</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Your verified purchases will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-soft transition-all hover:shadow-elegant"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-success/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED PURCHASE
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-primary">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                      {item.seller?.avatar_url ? (
                        <img
                          src={item.seller.avatar_url}
                          alt={item.seller.full_name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-0.5">
                        Seller
                      </div>
                      <div className="text-xs font-bold">{item.seller?.full_name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-0.5">
                      Bought on
                    </div>
                    <div className="text-xs font-bold">
                      {item.sold_at ? format(new Date(item.sold_at), "MMM d") : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="h-8 text-[11px] font-bold gap-1.5">
                    <Star className="h-3 w-3" /> Rate Seller
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 text-[11px] font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    View Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
