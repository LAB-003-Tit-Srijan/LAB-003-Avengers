import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthCtx {
  user: User | null;
  profile: any | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  switchMode: (mode: "buyer" | "seller") => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signOut: async () => {},
  switchMode: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (uid: string) => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).single();
      if (!error) {
        setProfile(data);
      } else {
        console.error("Error fetching profile:", error);
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) fetchProfile(s.user.id);
      else setProfile(null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) fetchProfile(data.session.user.id);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const switchMode = async (mode: "buyer" | "seller") => {
    if (!session?.user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ current_mode: mode })
      .eq("id", session.user.id);

    if (!error) {
      setProfile((prev: any) => (prev ? { ...prev, current_mode: mode } : null));
    }
  };

  return (
    <Ctx.Provider
      value={{
        user: session?.user ?? null,
        profile,
        session,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        },
        switchMode,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);

// College email domain check
const ALLOWED_DOMAIN_RE = /@([a-z0-9-]+\.)+(ac\.in|edu|edu\.in|ac\.uk|edu\.au|edu\.sg)$/i;

export function isCollegeEmail(email: string) {
  return ALLOWED_DOMAIN_RE.test(email.trim().toLowerCase());
}
