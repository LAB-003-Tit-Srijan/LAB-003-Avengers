import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, ShieldCheck, Sparkles, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { isCollegeEmail } from "@/lib/auth-context";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Get verified · Kampus" }] }),
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);

  const looksLikeCollege = email ? isCollegeEmail(email) : null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isCollegeEmail(email)) {
      toast.error("Please use your college email (.edu, .ac.in, etc.)");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: name,
          role: role,
          current_mode: role,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Explicitly update profile just in case the trigger doesn't handle custom user_metadata
    if (data.user) {
      await supabase
        .from("profiles")
        .update({
          role: role,
          current_mode: role,
          full_name: name,
        })
        .eq("id", data.user.id);
    }

    setLoading(false);
    toast.success(`Welcome to Kampus as a ${role}!`);
    navigate({ to: role === "seller" ? "/dashboard/seller" : "/dashboard/buyer" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">Kampus</span>
          </Link>
          <h1 className="font-display text-3xl font-bold">Get verified.</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Already a member?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <div className="mt-8 space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
              Choose your primary path
            </Label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-muted rounded-2xl border border-border">
              <button
                onClick={() => setRole("buyer")}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                  role === "buyer"
                    ? "bg-white shadow-soft text-[#0A4A5A]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <User className="h-4 w-4" /> Buyer
              </button>
              <button
                onClick={() => setRole("seller")}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                  role === "seller"
                    ? "bg-white shadow-soft text-[#0A4A5A]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ShoppingBag className="h-4 w-4" /> Seller
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">College email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.ac.in"
              />
              {email && looksLikeCollege === false && (
                <p className="text-xs text-destructive">
                  Use a college email (.edu, .ac.in, .edu.in)
                </p>
              )}
              {looksLikeCollege && (
                <p className="inline-flex items-center gap-1 text-xs font-medium text-success">
                  <ShieldCheck className="h-3 w-3" /> Verified college domain
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">At least 8 characters.</p>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              {loading ? "Creating account…" : "Create verified account"}
            </Button>
          </form>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920"
          alt="College life"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> Verified students only
          </div>
          <div className="max-w-md">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground drop-shadow-sm">
              Your campus, <span className="text-gradient">your marketplace</span>.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-foreground/80 font-medium drop-shadow-sm">
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                AI fair price on every listing
              </li>
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                </div>
                .edu / .ac.in verified only
              </li>
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-xs">⚡</span>
                </div>
                Real-time chat & safe meetups
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
