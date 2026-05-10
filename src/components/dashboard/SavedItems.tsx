import { Heart, Trash2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";

export function SavedItems() {
  const { user } = useAuth();
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaved() {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await supabase
          .from("wishlist" as any)
          .select(
            `
            *,
            listing:listings(*)
          `,
          )
          .eq("user_id", user.id);

        if (data) setSaved(data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSaved();
  }, [user]);

  const removeSaved = async (id: string) => {
    try {
      await supabase
        .from("wishlist" as any)
        .delete()
        .eq("id", id);
      setSaved((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display">Saved Items</h2>
        <p className="text-muted-foreground mt-1">Products you've favorited to buy later.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
            Loading your favorites...
          </div>
        ) : saved.length > 0 ? (
          saved.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border/40 relative">
                <img
                  src={
                    item.listing?.images?.[0] ||
                    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80"
                  }
                  alt={item.listing?.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => removeSaved(item.id)}
                  className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur rounded-full text-destructive hover:bg-background transition-colors"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold truncate">{item.listing?.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display font-bold text-primary flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5" />
                    {item.listing?.price?.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                    {item.listing?.category}
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl h-10 font-bold"
                >
                  <Link to="/product/$productId" params={{ productId: item.listing?.id }}>
                    View Product
                  </Link>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
            <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Your wishlist is empty.</p>
            <Button variant="link" asChild className="text-primary font-bold mt-2">
              <Link to="/">Explore Marketplace</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
