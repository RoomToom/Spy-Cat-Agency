// src/lib/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

type Json = Record<string, any> | undefined;

export function extractErrorMessage(err: any): string {
  // Підтягуємо деталі FastAPI (detail), або текст статусу
  const body = err?.body ?? err;
  const raw = body?.detail ?? body?.message ?? err?.message ?? "Request failed";
  if (typeof raw === "string") return raw;
  try {
    return JSON.stringify(raw);
  } catch {
    return "Request failed";
  }
}

async function request<T>(
  path: string,
  options?: RequestInit & { json?: Json }
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const { json, ...init } = options || {};
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(init.headers || {}),
  };

  const res = await fetch(url, {
    ...init,
    headers,
    body: json ? JSON.stringify(json) : init.body ?? null,
    cache: "no-store",
  });

  const text = await res.text();
  let payload: any = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }

  if (!res.ok) {
    const e = new Error();
    (e as any).status = res.status;
    (e as any).body = payload;
    (e as any).message = extractErrorMessage({ body: payload });
    throw e;
  }

  return payload as T;
}

/** ---------- Cats API ---------- */

export type Cat = {
  id: number;
  name: string;
  years_experience: number;
  breed: string;
  salary: number;
  current_mission_id: number | null;
};

export type CreateCatDTO = {
  name: string;
  years_experience: number;
  breed: string;
  salary: number;
};

export const CatsAPI = {
  list: () => request<Cat[]>("/api/v1/cats"),
  create: (data: CreateCatDTO) =>
    request<Cat>("/api/v1/cats", { method: "POST", json: data }),
  get: (id: number) => request<Cat>(`/api/v1/cats/${id}`),
  updateSalary: (id: number, salary: number) =>
    request<Cat>(`/api/v1/cats/${id}`, { method: "PATCH", json: { salary } }),
  remove: (id: number) =>
    request<void>(`/api/v1/cats/${id}`, { method: "DELETE" }),
};
