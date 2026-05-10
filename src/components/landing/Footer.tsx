import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant sm:p-14">
          <h3 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to trade smarter on campus?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Join thousands of verified students already buying and selling on Kampus.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7 h-12 px-7 text-base">
            <Link to="/signup">Get verified — free</Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">Kampus</span>
            <span>· Built for India's campuses</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
            <a href="/docs/index.html" className="hover:text-foreground">
              Docs
            </a>
            <Link to="/login" className="hover:text-foreground">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
