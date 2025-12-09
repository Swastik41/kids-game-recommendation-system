// client/src/api/auth.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

async function apiCall(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include' // ⬅️ send cookies
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}

export const AuthAPI = {
  register: (payload) => apiCall('/auth/register', { method: 'POST', body: payload }),
  login:    (payload) => apiCall('/auth/login',    { method: 'POST', body: payload }),
  // me:       ()        => apiCall('/auth/me'),
  logout:   ()        => apiCall('/auth/logout',   { method: 'POST' })
};
