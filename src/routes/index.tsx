import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TrustSection } from "@/components/landing/TrustSection";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AIPriceShowcase } from "@/components/landing/AIPriceShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kampus — India's first verified student marketplace" },
      {
        name: "description",
        content:
          "Buy, sell, rent, and exchange on campus — safely. Verified students only. AI-powered fair pricing. Real-time chat and meetups.",
      },
      { property: "og:title", content: "Kampus — Verified Student Marketplace" },
      {
        property: "og:description",
        content:
          "A safer marketplace for college students. Verified .edu / .ac.in users only, AI fair pricing, and trust scores that mean something.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <TrustSection />
        <Features />
        <HowItWorks />
        <AIPriceShowcase />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
