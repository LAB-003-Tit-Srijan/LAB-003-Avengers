import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authed/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · Kampus" }] }),
});

type Profile = {
  full_name: string | null;
  college: string | null;
  verified: boolean;
  trust_score: number;
  trades_completed: number;
};

function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, college, verified, trust_score, trades_completed")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [user]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Hey {profile?.full_name?.split(" ")[0] ?? "there"} 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              {profile?.college ? `${profile.college} · ` : ""}Welcome to your Kampus dashboard.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile?.verified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified student
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Trust score · {profile?.trust_score ?? "—"}
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {profile?.trades_completed ?? 0} trades completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Marketplace", desc: "Browse listings (coming up next)." },
          { title: "Post a listing", desc: "AI fair price on every item." },
          { title: "Chats & meetups", desc: "Real-time messaging — Phase 3." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-dashed border-border bg-card/40 p-6">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
