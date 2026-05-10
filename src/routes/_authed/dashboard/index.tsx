import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // Redirect based on current mode or default to buyer
    const mode = profile?.current_mode || "buyer";
    navigate({ to: `/dashboard/${mode}`, replace: true });
  }, [profile, loading, navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Entering Dashboard...
        </p>
      </div>
    </div>
  );
}
