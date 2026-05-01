import type { User } from "@/types/auth";

const BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api";

export function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function apiGetMe(): Promise<User | null> {
  try {
    const res = await apiFetch("/auth/me");
    if (res.ok) return res.json();
  } catch {
    // network error — no session
  }
  return null;
}

export async function apiLogin(email: string, password: string): Promise<User> {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Login failed");
  }
  return res.json();
}

export async function apiRegister(
  email: string,
  password: string,
): Promise<User> {
  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Registration failed");
  }
  return res.json();
}

export async function apiLogout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" });
}
