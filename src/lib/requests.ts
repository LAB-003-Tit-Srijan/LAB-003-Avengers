import { supabase } from "@/integrations/supabase/client";
import { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

/**
 * Creates a new buy/rent/bid request from a buyer.
 */
export async function createListingRequest(params: {
  listingId: string;
  buyerId: string;
  sellerId: string;
  type: "buy" | "rent" | "bid";
  amount?: number;
  message?: string;
}) {
  const { listingId, buyerId, sellerId, type, amount, message } = params;

  const { data, error } = await supabase
    .from("listing_requests")
    .insert({
      listing_id: listingId,
      buyer_id: buyerId,
      seller_id: sellerId,
      type,
      amount: amount || null,
      message: message || null,
      status: "pending",
    } as TablesInsert<"listing_requests">)
    .select()
    .single();

  if (error) throw error;

  // Create notification for seller
  await supabase.from("notifications").insert({
    user_id: sellerId,
    title: "New Request",
    message: `You have a new ${type} request for your listing.`,
    type: "request",
    link: `/dashboard?tab=orders&requestId=${data.id}`,
  } as TablesInsert<"notifications">);

  return data;
}

/**
 * Updates the status of a request (Accept/Reject/Complete).
 */
export async function updateRequestStatus(
  requestId: string,
  status: "accepted" | "rejected" | "negotiating" | "completed",
) {
  const { data: request, error: fetchError } = await supabase
    .from("listing_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (fetchError) throw fetchError;

  const { error: updateError } = await supabase
    .from("listing_requests")
    .update({ status } as TablesUpdate<"listing_requests">)
    .eq("id", requestId);

  if (updateError) throw updateError;

  // Notify buyer about status change
  await supabase.from("notifications").insert({
    user_id: request.buyer_id,
    title: "Request Update",
    message: `Your request for the item has been ${status}.`,
    type: "status_change",
    link: `/dashboard?tab=purchases`,
  } as TablesInsert<"notifications">);

  // If accepted, we might want to "Reserve" the item
  if (status === "accepted") {
    await supabase
      .from("listings")
      .update({ availability_status: "reserved" } as TablesUpdate<"listings">)
      .eq("id", request.listing_id);
  }

  return { success: true };
}

/**
 * Fetches all requests for a seller (Active Requests section).
 */
export async function getSellerRequests(sellerId: string) {
  const { data, error } = await supabase
    .from("listing_requests")
    .select(
      `
      *,
      listing:listings(*),
      buyer:profiles(id, full_name, avatar_url, email)
    `,
    )
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetches all requests made by a buyer.
 */
export async function getBuyerRequests(buyerId: string) {
  const { data, error } = await supabase
    .from("listing_requests")
    .select(
      `
      *,
      listing:listings(*),
      seller:profiles(id, full_name, avatar_url, email)
    `,
    )
    .eq("buyer_id", buyerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
