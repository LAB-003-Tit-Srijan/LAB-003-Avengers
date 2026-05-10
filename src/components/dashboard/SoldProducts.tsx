import { useState, useEffect } from "react";
import { ShoppingBag, Search, ExternalLink, User, Calendar, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSoldProducts } from "@/lib/listings";
import { toast } from "sonner";
import { format } from "date-fns";

export function SoldProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // In a real app, we'd get the user ID from auth context
        // For now, we'll simulate or use a mock ID
        const data = await getSoldProducts("current-user-id");
        setProducts(data || []);
      } catch (err) {
        toast.error("Failed to load sold products");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalEarnings = products.reduce(
    (acc, curr) => acc + (curr.transaction?.[0]?.amount || 0),
    0,
  );

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">Loading your sales history...</div>
    );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display">Sold Products</h2>
          <p className="text-muted-foreground mt-1">Track your earnings and completed sales.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm">
          <div>
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Total Earnings
            </div>
            <div className="text-xl font-bold text-primary flex items-center">
              <IndianRupee className="h-4 w-4" /> {totalEarnings.toLocaleString()}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-primary/20" />
          <div className="text-center">
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Items Sold
            </div>
            <div className="text-xl font-bold text-primary">{products.length}</div>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-lg">No sales yet</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Your sold items will appear here once transactions are completed.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Buyer</th>
                  <th className="px-6 py-4 font-medium">Sold Date</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.images?.[0]}
                          alt={item.title}
                          className="h-10 w-10 rounded-lg object-cover border border-border"
                        />
                        <div>
                          <span className="font-bold block">{item.title}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                          {item.buyer?.avatar_url ? (
                            <img
                              src={item.buyer.avatar_url}
                              alt={item.buyer.full_name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-3 w-3" />
                          )}
                        </div>
                        <span className="font-medium">
                          {item.buyer?.full_name || "Unknown Buyer"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.sold_at ? format(new Date(item.sold_at), "MMM d, yyyy") : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      ₹{item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                        Details <ExternalLink className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
