"use client";

interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
}

export async function fetcher<T>(path: string, options: RequestInit = {}) {
  const url = `/api/proxy${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = `🚨 요청 실패 (HTTP ${res.status})`;
    try {
      const body = (await res.json()) as ApiErrorResponse;
      if (body.message) message = body.message;
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
