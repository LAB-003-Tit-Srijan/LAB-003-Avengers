import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceReels } from "@/components/marketplace/MarketplaceReels";

export const Route = createFileRoute("/reels")({
  component: MarketplaceReels,
  head: () => ({
    meta: [
      { title: "Marketplace Reels · Kampus" },
      {
        name: "description",
        content:
          "Discover amazing products on campus through short video reels. Swipe, explore, and shop safely.",
      },
    ],
  }),
});
