import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "studentswap_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      /*
       * Plus tard :
       * GET /auth/me
       *
       * pour récupérer l'utilisateur connecté.
       */

      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = (newToken, userData = null) => {
    localStorage.setItem(TOKEN_KEY, newToken);

    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated,
      login,
      logout,
    }),
    [token, user, loading, isAuthenticated],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}