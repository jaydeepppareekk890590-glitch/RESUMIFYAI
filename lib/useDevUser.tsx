"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { auth, onAuthStateChanged, type User } from "./firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        document.cookie = "fb_session=1; path=/; max-age=86400; SameSite=Lax";
      } else {
        document.cookie = "fb_session=; path=/; max-age=0";
      }
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// Compatibility shim — maps Firebase User to the shape our app expects
export function useDevUser() {
  const { user, loading } = useAuth();
  return {
    user: user
      ? {
          id: user.uid,
          firstName: user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "User",
          fullName: user.displayName || user.email?.split("@")[0] || "User",
          emailAddresses: [{ emailAddress: user.email || "" }],
          imageUrl: user.photoURL || null,
        }
      : null,
    isSignedIn: !!user,
    isLoaded: !loading,
    firebaseUser: user,
  };
}
