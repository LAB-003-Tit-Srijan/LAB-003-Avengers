import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useNotifications } from "@/lib/NotificationContext";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, switchMode } = useAuth();
  const { unreadCount } = useNotifications();
  const isSellerMode = profile?.current_mode === "seller";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-soft">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">Kampus</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/reels"
            className="text-sm font-semibold text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-all"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Reels
          </Link>
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="#ai"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            AI Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <div className="hidden lg:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border mr-2">
                <button
                  onClick={() => switchMode("buyer")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    !isSellerMode
                      ? "bg-[#0A4A5A] text-white shadow-soft"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Student
                </button>
                <button
                  onClick={() => switchMode("seller")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    isSellerMode
                      ? "bg-[#0A4A5A] text-white shadow-soft"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Merchant
                </button>
              </div>

              <Link
                to="/dashboard"
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Button
                asChild
                size="sm"
                className="bg-[#0A4A5A] text-white hover:opacity-90 shadow-soft font-bold rounded-xl"
              >
                <Link to={isSellerMode ? "/dashboard/seller" : "/dashboard/buyer"}>
                  {isSellerMode ? "Seller Hub" : "My Dashboard"}
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-soft"
              >
                <Link to="/signup">Get verified</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 -mr-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl md:hidden shadow-lg"
          >
            <div className="flex flex-col px-4 py-6 space-y-6">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/reels"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-primary flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Marketplace Reels
                </Link>
                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground"
                >
                  Features
                </a>
                <a
                  href="#how"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground"
                >
                  How it works
                </a>
                <a
                  href="#ai"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground"
                >
                  AI Pricing
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </a>
              </nav>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
                {user ? (
                  <Button
                    asChild
                    className="w-full justify-center bg-[#0A4A5A] text-white shadow-soft"
                  >
                    <Link
                      to={isSellerMode ? "/dashboard/seller" : "/dashboard/buyer"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {isSellerMode ? "Seller Dashboard" : "Buyer Dashboard"}
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center border-primary/20 text-primary"
                    >
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign in
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full justify-center bg-gradient-primary text-primary-foreground shadow-soft"
                    >
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Get verified
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
