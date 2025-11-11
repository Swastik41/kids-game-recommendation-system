// client/src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI } from '../api/auth';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

  // Boot: try to hydrate from localStorage, then /auth/me if token exists
  useEffect(() => {
    (async () => {
      try {
        const cached = localStorage.getItem('user');
        if (cached) setUser(JSON.parse(cached));
        const token = localStorage.getItem('token');
        if (!token) { setBooted(true); return; }
        const data = await AuthAPI.me(); // { user }
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setBooted(true);
      }
    })();
  }, []);

  const login = async ({ email, password }) => {
    const { token, user } = await AuthAPI.login({ email, password });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const register = async (payload) => {
    const { token, user } = await AuthAPI.register(payload);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.assign('/'); // back to Home
  };

  const value = useMemo(() => ({ user, booted, login, register, logout }), [user, booted]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
