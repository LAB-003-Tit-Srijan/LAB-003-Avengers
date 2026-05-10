import { useRef, useState } from "react";
import { UploadCloud, Sparkles, MapPin, X, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMPUS_MEETUP_ZONES } from "@/lib/meetup-zones";
import { toast } from "sonner";
import { ListingService } from "@/lib/listing-service";
import { useNavigate } from "@tanstack/react-router";

import { motion } from "framer-motion";

export function UploadProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics & Laptops");
  const [condition, setCondition] = useState("Good");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [riskAlert, setRiskAlert] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
      const newPreviews = files.map((f) => URL.createObjectURL(f));
      setPreviews((prev) => [...prev, ...newPreviews].slice(0, 5));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading("Creating your listing...");

    try {
      await ListingService.createListing(
        {
          title,
          price: parseInt(price),
          description,
          category,
          condition,
          meetup_location: location,
        },
        selectedFiles,
      );

      toast.dismiss(loadingToast);
      toast.success("Listing published successfully!");
      navigate({ to: "/dashboard/seller" });
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to create listing");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const validateTrust = () => {
    if (price && parseInt(price) < 500 && title.toLowerCase().includes("macbook")) {
      setRiskAlert(
        "Suspicious price detected for this item. Please ensure pricing is fair to avoid flags.",
      );
    } else if (
      description.toLowerCase().includes("paytm first") ||
      description.toLowerCase().includes("advance payment")
    ) {
      setRiskAlert("Policy violation: Off-platform payment mentions are not allowed.");
    } else {
      setRiskAlert(null);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display">Upload Product</h2>
        <p className="text-muted-foreground mt-1">
          List a new item for sale, rent, or exchange on Kampus.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-card border border-border p-6 rounded-2xl shadow-sm"
      >
        {/* Images */}
        <div>
          <label className="block text-sm font-semibold mb-2">Product Images</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer group"
          >
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="p-3 bg-primary/10 text-primary rounded-full mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="font-medium text-foreground">Click or drag images here</p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP up to 5MB (Max 5 images)
            </p>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {previews.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-20 w-20 shrink-0 rounded-lg border border-border overflow-hidden group"
                >
                  <img src={img} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviews(previews.filter((_, i) => i !== idx));
                      setSelectedFiles(selectedFiles.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Reel Upload */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <label className="text-sm font-bold text-primary">Marketplace Reel (Recommended)</label>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Products with a short video reel get 3x more views. Upload a 15-30s vertical video
            showing the product in action.
          </p>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
            <span className="text-[10px] text-muted-foreground italic">
              Max size: 20MB • MP4, MOV
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-2">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                validateTrust();
              }}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. MacBook Air M1 2020"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price <span className="text-muted-foreground font-normal">(₹)</span>
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                validateTrust();
              }}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. 4500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-muted-foreground"
            >
              <option>Electronics & Laptops</option>
              <option>Books & Notes</option>
              <option>Hostel Essentials</option>
              <option>Bicycles</option>
              <option>Other</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-semibold mb-2">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-muted-foreground"
            >
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Heavily Used</option>
            </select>
          </div>

          {/* Location */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-2">Meetup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. Main Library Entrance"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest self-center mr-1">
                Secure Zones:
              </span>
              {CAMPUS_MEETUP_ZONES.filter((z) => z.isSecure).map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setLocation(zone.name)}
                  className="inline-flex items-center gap-1 rounded-full bg-success/10 border border-success/20 px-2.5 py-1 text-[10px] font-bold text-success hover:bg-success/20 transition-colors"
                >
                  <ShieldCheck className="h-3 w-3" /> {zone.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                validateTrust();
              }}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Provide details about the item..."
            ></textarea>
            {riskAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold"
              >
                <AlertTriangle className="h-4 w-4" />
                {riskAlert}
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border">
          <Button variant="ghost" type="button" disabled={isUploading}>
            Save Draft
          </Button>
          <Button
            type="submit"
            disabled={isUploading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant px-8"
          >
            {isUploading ? "Publishing..." : "Publish Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
}
