import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BuyerSidebar, BuyerTabType } from "@/components/dashboard/BuyerSidebar";
import { BuyerOverview } from "@/components/dashboard/BuyerOverview";
import { PurchaseRequests } from "@/components/dashboard/PurchaseRequests";
import { SavedItems } from "@/components/dashboard/SavedItems";
import { Messages } from "@/components/dashboard/Messages";
import { BidHistory } from "@/components/dashboard/BidHistory";
import { ReputationDashboard } from "@/components/dashboard/ReputationDashboard";

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-12 text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-muted-foreground">
      This specialized professional module is currently being optimized for student experience.
    </p>
  </div>
);

export const Route = createFileRoute("/_authed/dashboard/buyer")({
  component: BuyerDashboard,
  head: () => ({ meta: [{ title: "Student Dashboard · Kampus" }] }),
});

function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<BuyerTabType>("overview");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <BuyerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 min-w-0">
          {/* Mobile Tabs */}
          <div className="mb-6 md:hidden overflow-x-auto pb-2 flex gap-2 hide-scrollbar">
            {[
              "overview",
              "wishlist",
              "requests",
              "rentals",
              "chats",
              "history",
              "saved",
              "reviews",
              "recommended",
              "notifications",
              "settings",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as BuyerTabType)}
                className={`px-4 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-[#0A4A5A] text-white shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-background rounded-3xl">
            {activeTab === "overview" && <BuyerOverview />}
            {activeTab === "requests" && <PurchaseRequests />}
            {activeTab === "wishlist" && <SavedItems />}
            {activeTab === "chats" && <Messages />}
            {activeTab === "history" && <Placeholder title="Order History" />}
            {activeTab === "saved" && <Placeholder title="Saved Products" />}
            {activeTab === "reviews" && <Placeholder title="Reviews Given" />}
            {activeTab === "recommended" && <Placeholder title="Personalized Recommendations" />}
            {activeTab === "notifications" && <Placeholder title="Buyer Notifications" />}
            {activeTab === "settings" && <Placeholder title="Account Settings" />}
            {activeTab === "rentals" && <Placeholder title="Rental Requests" />}
          </div>
        </main>
      </div>
    </div>
  );
}
