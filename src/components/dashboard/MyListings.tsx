import {
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ListingService } from "@/lib/listing-service";
import { useAuth } from "@/lib/auth-context";

interface MyListingsProps {
  onAddNew?: () => void;
}

export function MyListings({ onAddNew }: MyListingsProps) {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyListings() {
      if (!user) return;
      try {
        setLoading(true);
        const data = await ListingService.getSellerListings(user.id);
        setListings(data);
      } catch (err) {
        console.error("Error fetching my listings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyListings();
  }, [user]);

  const deleteListing = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await ListingService.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return { class: "bg-success/10 text-success", icon: CheckCircle2, label: "Available" };
      case "sold":
        return { class: "bg-muted text-muted-foreground", icon: Archive, label: "Sold" };
      case "pending":
        return { class: "bg-warning/10 text-warning", icon: Clock, label: "Pending Verification" };
      case "rented":
        return { class: "bg-primary/10 text-primary", icon: Clock, label: "Rented" };
      default:
        return { class: "bg-primary/10 text-primary", icon: CheckCircle2, label: status };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">My Listings</h2>
          <p className="text-muted-foreground mt-1">
            Manage, edit, and track your active products.
          </p>
        </div>
        <Button
          onClick={onAddNew}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant"
        >
          Add New
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Loading your listings...
                    </div>
                  </td>
                </tr>
              ) : listings.length > 0 ? (
                listings.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.images[0] ||
                            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80"
                          }
                          alt={item.title}
                          className="h-12 w-12 rounded-lg object-cover border border-border"
                        />
                        <span className="font-medium max-w-[200px] truncate" title={item.title}>
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{item.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {(() => {
                        const badge = getStatusBadge(item.availability_status);
                        const Icon = badge.icon;
                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.class}`}
                          >
                            <Icon className="h-3 w-3" />
                            {badge.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">0</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(item.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {item.availability_status === "available" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => deleteListing(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    You haven't listed any products yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
