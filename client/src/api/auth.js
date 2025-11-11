// client/src/api/auth.js
// ❌ old: const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}

export const AuthAPI = {
  register: (payload) => apiCall('/auth/register', { method: 'POST', body: payload }),
  login:    (payload) => apiCall('/auth/login',    { method: 'POST', body: payload }),
  me:       ()        => apiCall('/auth/me')
};
