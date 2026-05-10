import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

/**
 * Marks a listing as sold and creates a transaction record.
 * This is triggered after successful meetup/OTP verification.
 */
export async function completeTransaction(params: {
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  meetupId?: string;
}) {
  const { listingId, buyerId, sellerId, amount, meetupId } = params;

  // 1. Update the listing status
  const { error: listingError } = await supabase
    .from("listings")
    .update({
      availability_status: "sold",
      buyer_id: buyerId,
      sold_at: new Date().toISOString(),
      is_archived: true,
      is_active: false,
    } as TablesUpdate<"listings">)
    .eq("id", listingId);

  if (listingError) throw listingError;

  // 2. Create the transaction record
  const { error: transactionError } = await supabase.from("transactions").insert({
    listing_id: listingId,
    buyer_id: buyerId,
    seller_id: sellerId,
    amount: amount,
    status: "completed",
    meetup_id: meetupId || null,
    is_verified: true,
  } as TablesInsert<"transactions">);

  if (transactionError) throw transactionError;

  // 3. Update seller trust metrics (increment trades completed)
  // Note: This would typically be handled by a Supabase Trigger or a separate service,
  // but we'll simulate it here for now.
  const { data: profile } = await supabase
    .from("profiles")
    .select("trades_completed")
    .eq("id", sellerId)
    .single();

  if (profile) {
    await supabase
      .from("profiles")
      .update({ trades_completed: (profile.trades_completed || 0) + 1 })
      .eq("id", sellerId);
  }

  return { success: true };
}

/**
 * Fetches products sold by a specific seller.
 */
export async function getSoldProducts(sellerId: string) {
  const { data, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      buyer:profiles!listings_buyer_id_fkey(id, full_name, avatar_url, email),
      transaction:transactions(id, amount, created_at)
    `,
    )
    .eq("seller_id", sellerId)
    .eq("availability_status", "sold")
    .order("sold_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetches products purchased by a specific buyer.
 */
export async function getPurchasedProducts(buyerId: string) {
  const { data, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      seller:profiles!listings_seller_id_fkey(id, full_name, avatar_url, email),
      transaction:transactions(id, amount, created_at)
    `,
    )
    .eq("buyer_id", buyerId)
    .eq("availability_status", "sold")
    .order("sold_at", { ascending: false });

  if (error) throw error;
  return data;
}
