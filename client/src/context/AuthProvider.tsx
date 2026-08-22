import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "../types/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );

  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("authUser");

    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const login = (token: string, nextUser: AuthUser) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("authUser", JSON.stringify(nextUser));

    setAccessToken(token);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");

    setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      login,
      logout,
    }),
    [accessToken, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
