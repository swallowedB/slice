"use client";

export async function publicFetcher<T>(path: string, options: RequestInit = {}) {
  const res = await fetch(path, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error(`🚨 요청 실패 (HTTP ${res.status})`);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}