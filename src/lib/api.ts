export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    cache: 'no-store',
  });
  const text = await res.text();
  let json: any = {};
  try { json = text ? JSON.parse(text) : {}; } catch { json = {}; }
  if (!res.ok) {
    throw new Error(json.detail || `Request failed (${res.status})`);
  }
  return json as T;
}
