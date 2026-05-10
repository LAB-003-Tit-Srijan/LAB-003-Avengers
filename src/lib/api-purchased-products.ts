import { createServerFn } from "@tanstack/react-start";
import { getPurchasedProducts } from "@/lib/listings";

export const getPurchasedProductsFn = createServerFn({
  method: "GET",
}).handler(async ({ data }: any) => {
  const buyerId = data as string;
  try {
    const products = await getPurchasedProducts(buyerId);
    return { success: true, data: products };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
