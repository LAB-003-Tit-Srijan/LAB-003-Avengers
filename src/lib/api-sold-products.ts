import { createServerFn } from "@tanstack/react-start";
import { getSoldProducts } from "@/lib/listings";

export const getSoldProductsFn = createServerFn({
  method: "GET",
}).handler(async ({ data }: any) => {
  const sellerId = data as string;
  try {
    const products = await getSoldProducts(sellerId);
    return { success: true, data: products };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
