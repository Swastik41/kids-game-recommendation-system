export const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
export function assert(ok, msg, status = 400) {
  if (!ok) { const e = new Error(msg); e.status = status; throw e; }
}
