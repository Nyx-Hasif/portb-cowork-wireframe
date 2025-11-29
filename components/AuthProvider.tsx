"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth, User } from "@/lib/supabase";
import type { Session, AuthError } from "@supabase/supabase-js";

// 1️⃣ WHAT DATA WE SHARE TO ALL PAGES
interface AuthContextType {
  user: User | null; // Current user info (or null if not logged in)
  session: Session | null; // Login session
  loading: boolean; // Is checking login status?
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

// 2️⃣ CREATE CONTAINER FOR DATA
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3️⃣ PROVIDER COMPONENT (The Security Guard)
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // STATE - Store current data
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // 4️⃣ CHECK LOGIN STATUS WHEN PAGE LOADS
  useEffect(() => {
    // Get initial session
    const checkUser = async () => {
      const { data } = await auth.getSession();
      setSession(data.session);
      setUser((data.session?.user as User) || null);
      setLoading(false);
    };

    checkUser();

    // 5️⃣ LISTEN FOR LOGIN/LOGOUT CHANGES
    const {
      data: { subscription },
    } = auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser((session?.user as User) || null);
      setLoading(false);
    });

    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // 6️⃣ LOGIN FUNCTION
  const signIn = async (email: string, password: string) => {
    setLoading(true);

    const { data, error } = await auth.signIn(email, password);

    setLoading(false);
    return { error };
  };

  // 7️⃣ LOGOUT FUNCTION
  const signOut = async () => {
    setLoading(true);
    await auth.signOut();
    setLoading(false);
  };

  // 8️⃣ SHARE DATA TO ALL PAGES
  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 9️⃣ HOOK TO USE AUTH IN ANY PAGE
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
