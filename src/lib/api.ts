const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.azim.cc";

// --- Token management ---

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("azim_token");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("azim_refresh");
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem("azim_token", access);
  localStorage.setItem("azim_refresh", refresh);
}

export function clearTokens() {
  localStorage.removeItem("azim_token");
  localStorage.removeItem("azim_refresh");
}

export function isLoggedIn(): boolean {
  return !!getAccessToken();
}

// --- Fetch wrapper ---

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers as Record<string, string>),
  };

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  // Try refresh on 401
  if (res.status === 401 && getRefreshToken()) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      headers["Authorization"] = `Bearer ${getAccessToken()}`;
      const retry = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
      });
      if (retry.ok) return retry.json() as Promise<T>;
    }
    clearTokens();
    throw new ApiError(401, "Session expired");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, (body as { error?: string }).error || res.statusText);
  }

  return res.json() as Promise<T>;
}

async function tryRefresh(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

// --- Public API ---

export interface Comment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export function fetchComments(slug: string) {
  return apiFetch<Comment[]>(`/api/comments/${slug}`, { method: "GET" });
}

export function submitComment(data: {
  postSlug: string;
  authorName: string;
  authorEmail: string;
  body: string;
  turnstileToken: string;
}) {
  return apiFetch<{ message: string }>("/api/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function subscribeNewsletter(data: {
  email: string;
  name?: string;
  turnstileToken: string;
}) {
  return apiFetch<{ message: string }>("/api/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// --- Auth API ---

export function login(email: string, password: string) {
  return apiFetch<{
    accessToken: string;
    refreshToken: string;
    user: { id: string; email: string; name: string; role: string };
  }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getMe() {
  return apiFetch<{
    id: string;
    email: string;
    name: string;
    role: string;
  }>("/api/auth/me");
}

// --- Admin API ---

export interface PendingComment {
  id: string;
  postSlug: string;
  authorName: string;
  authorEmail: string;
  body: string;
  createdAt: string;
}

export function getPendingComments() {
  return apiFetch<PendingComment[]>("/api/admin/comments/pending");
}

export function approveComment(id: string) {
  return apiFetch<{ message: string }>(`/api/admin/comments/${id}/approve`, {
    method: "POST",
  });
}

export function deleteComment(id: string) {
  return apiFetch<{ message: string }>(`/api/admin/comments/${id}`, {
    method: "DELETE",
  });
}

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  confirmed: boolean;
  createdAt: string;
  unsubscribedAt: string | null;
}

export function getSubscribers() {
  return apiFetch<Subscriber[]>("/api/admin/subscribers");
}

export function activateSubscriber(id: string) {
  return apiFetch<{ message: string }>(`/api/admin/subscribers/${id}/activate`, {
    method: "POST",
  });
}

export function deactivateSubscriber(id: string) {
  return apiFetch<{ message: string }>(`/api/admin/subscribers/${id}/deactivate`, {
    method: "POST",
  });
}

export function deleteSubscriber(id: string) {
  return apiFetch<{ message: string }>(`/api/admin/subscribers/${id}`, {
    method: "DELETE",
  });
}

export function sendNewsletter(
  slug: string,
  title: string,
  lede: string
) {
  return apiFetch<{ message: string; recipientCount: number }>(
    `/api/admin/newsletter/send/${slug}`,
    {
      method: "POST",
      body: JSON.stringify({ title, lede }),
    }
  );
}

export interface AdminStats {
  subscribers: { total: number; active: number };
  comments: { total: number; pending: number };
  newslettersSent: number;
}

export function getAdminStats() {
  return apiFetch<AdminStats>("/api/admin/stats");
}

// --- Upload wrapper (multipart) ---

async function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  const headers: Record<string, string> = {};

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Do NOT set Content-Type - browser auto-sets multipart boundary

  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (res.status === 401 && getRefreshToken()) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      headers["Authorization"] = `Bearer ${getAccessToken()}`;
      const retry = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers,
        body: formData,
      });
      if (retry.ok) return retry.json() as Promise<T>;
    }
    clearTokens();
    throw new ApiError(401, "Session expired");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      res.status,
      (body as { error?: string }).error || res.statusText
    );
  }

  return res.json() as Promise<T>;
}

// --- Publish API ---

export function publishArticle(data: {
  file: File;
  title: string;
  lede: string;
  kicker: string;
  date: string;
  keywords?: string;
}) {
  const fd = new FormData();
  fd.append("file", data.file);
  fd.append("title", data.title);
  fd.append("lede", data.lede);
  fd.append("kicker", data.kicker);
  fd.append("date", data.date);
  if (data.keywords) fd.append("keywords", data.keywords);

  return apiUpload<{ message: string; slug: string; url: string }>(
    "/api/admin/publish",
    fd
  );
}
