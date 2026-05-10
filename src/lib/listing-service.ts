import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export const ListingService = {
  /**
   * Fetches all active listings with seller details
   */
  async getActiveListings() {
    const { data, error } = await supabase
      .from("listings")
      .select(
        `
        *,
        seller:profiles(id, full_name, avatar_url, trust_score, verified)
      `,
      )
      .eq("availability_status", "available")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Fetches a single listing by ID
   */
  async getListingById(id: string) {
    const { data, error } = await supabase
      .from("listings")
      .select(
        `
        *,
        seller:profiles(id, full_name, avatar_url, trust_score, verified, college, campus_location, trades_completed)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Creates a new listing with image uploads
   */
  async createListing(
    params: Omit<TablesInsert<"listings">, "id" | "seller_id" | "images">,
    images: File[],
  ) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("Authentication required");

    const imageUrls: string[] = [];

    // Upload images to storage
    for (const file of images) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product_images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product_images").getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }

    // Insert database record
    const { data, error } = await supabase
      .from("listings")
      .insert({
        ...params,
        seller_id: user.user.id,
        images: imageUrls,
        availability_status: "available",
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Fetches listings for a specific seller
   */
  async getSellerListings(sellerId: string) {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Deletes a listing by ID (only by owner)
   */
  async deleteListing(id: string) {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) throw error;
  },

  /**
   * Updates a listing
   */
  async updateListing(id: string, params: Partial<TablesInsert<"listings">>) {
    const { data, error } = await supabase
      .from("listings")
      .update(params)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
