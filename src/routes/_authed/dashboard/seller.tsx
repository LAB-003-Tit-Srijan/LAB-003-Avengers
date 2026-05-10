import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SellerSidebar, SellerTabType } from "@/components/dashboard/SellerSidebar";
import { SellerOverview } from "@/components/dashboard/SellerOverview";
import { UploadProduct } from "@/components/dashboard/UploadProduct";
import { MyListings } from "@/components/dashboard/MyListings";
import { Orders } from "@/components/dashboard/Orders";
import { SoldProducts } from "@/components/dashboard/SoldProducts";
import { RentalTracking } from "@/components/dashboard/RentalTracking";
import { BuyerFeedback } from "@/components/dashboard/BuyerFeedback";
import { TransactionAnalytics } from "@/components/dashboard/TransactionAnalytics";
import { Messages } from "@/components/dashboard/Messages";
import { ReputationDashboard } from "@/components/dashboard/ReputationDashboard";

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-12 text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-muted-foreground">
      This specialized professional module is currently being optimized for campus business
      management.
    </p>
  </div>
);

export const Route = createFileRoute("/_authed/dashboard/seller")({
  component: SellerDashboard,
  head: () => ({ meta: [{ title: "Merchant Center · Kampus" }] }),
});

function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<SellerTabType>("overview");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <SellerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 min-w-0">
          {/* Mobile Tabs */}
          <div className="mb-6 md:hidden overflow-x-auto pb-2 flex gap-2 hide-scrollbar">
            {[
              "overview",
              "upload",
              "listings",
              "analytics",
              "requests",
              "sold",
              "rented",
              "revenue",
              "feedback",
              "chats",
              "notifications",
              "verification",
              "trust",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as SellerTabType)}
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
            {activeTab === "overview" && <SellerOverview />}
            {activeTab === "upload" && <UploadProduct />}
            {activeTab === "listings" && <MyListings onAddNew={() => setActiveTab("upload")} />}
            {activeTab === "analytics" && <TransactionAnalytics />}
            {activeTab === "requests" && <Orders />}
            {activeTab === "sold" && <SoldProducts />}
            {activeTab === "rented" && <RentalTracking />}
            {activeTab === "revenue" && <Placeholder title="Revenue Overview" />}
            {activeTab === "feedback" && <BuyerFeedback />}
            {activeTab === "chats" && <Messages />}
            {activeTab === "notifications" && <Placeholder title="Seller Notifications" />}
            {activeTab === "verification" && <Placeholder title="Seller Verification" />}
            {activeTab === "trust" && <ReputationDashboard />}
          </div>
        </main>
      </div>
    </div>
  );
}
