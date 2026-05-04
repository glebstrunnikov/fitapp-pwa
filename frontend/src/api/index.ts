import type { User } from "@/types/auth";
import type { WorkoutPlanData } from "@/types/workouts";
import { getAllProgram, putAllProgram } from "@/stores/idb";

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

// --- program sync ---

let pendingSaveController: AbortController | null = null;
let savePollingInterval: ReturnType<typeof setInterval> | null = null;

export async function apiSaveProgram(data: WorkoutPlanData[]): Promise<void> {
  // Deduplicate: cancel any in-flight save, this one replaces it
  pendingSaveController?.abort("replaced");

  const controller = new AbortController();
  pendingSaveController = controller;

  const timeoutId = setTimeout(() => controller.abort("timeout"), 7000);

  try {
    const res = await apiFetch("/user-data", {
      method: "PUT",
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      if (savePollingInterval !== null) {
        clearInterval(savePollingInterval);
        savePollingInterval = null;
      }
      pendingSaveController = null;
    }
  } catch {
    clearTimeout(timeoutId);
    // Only start polling if timed out, not if replaced by a newer call
    if (controller.signal.reason === "timeout") {
      if (savePollingInterval !== null) clearInterval(savePollingInterval);
      savePollingInterval = setInterval(
        () => apiSaveProgram(data),
        15 * 60 * 1000,
      );
    }
  }
}

export async function apiLoadProgram(): Promise<WorkoutPlanData[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await apiFetch("/user-data", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data: WorkoutPlanData[] = await res.json();
      await putAllProgram(data);
      return data;
    }
  } catch {
    clearTimeout(timeoutId);
  }

  // Server unreachable — fall back to IDB
  const cached = await getAllProgram();
  if (cached.length) return cached;

  // Nothing anywhere — start fresh and queue a save
  const empty: WorkoutPlanData[] = [];
  apiSaveProgram(empty);
  return empty;
}
