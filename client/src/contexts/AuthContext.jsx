// client/src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI } from '../api/auth';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false); // when initial check finishes

  // On app load, ask backend who I am based on cookie
  useEffect(() => {
    (async () => {
      try {
        const data = await AuthAPI.me();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setBooted(true);
      }
    })();
  }, []);

  const login = async ({ email, password }) => {
    const { user } = await AuthAPI.login({ email, password });
    setUser(user);
    return user;
  };

  const register = async (payload) => {
    const { user } = await AuthAPI.register(payload);
    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch {
      // ignore errors
    }
    setUser(null);
    window.location.assign('/'); // back to Home
  };

  const value = useMemo(
    () => ({ user, booted, login, register, logout }),
    [user, booted]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
