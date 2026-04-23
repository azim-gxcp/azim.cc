"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  login as apiLogin,
  getMe,
  setTokens,
  clearTokens,
  isLoggedIn,
} from "./api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContext {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthCtx = createContext<AuthContext>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthCtx);
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      setLoading(false);
      return;
    }

    getMe()
      .then((u) => {
        if (u.role !== "admin") {
          clearTokens();
          setUser(null);
        } else {
          setUser(u);
        }
      })
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await apiLogin(email, password);
    setTokens(res.accessToken, res.refreshToken);

    if (res.user.role !== "admin") {
      clearTokens();
      throw new Error("Admin access required");
    }

    setUser(res.user);
  }

  function logout() {
    clearTokens();
    setUser(null);
    router.push("/admin/login");
  }

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          fontFamily: "var(--font-body)",
          color: "var(--fg3)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
