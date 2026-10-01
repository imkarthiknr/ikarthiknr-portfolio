/**
 * fetch + JSON with a localStorage cache. Keeps the site well under public API
 * rate limits (GitHub allows 60 unauthenticated requests/hour per IP).
 */
export async function fetchCached<T>(url: string, ttlMs = 30 * 60 * 1000): Promise<T> {
  const key = `cache:${url}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const { at, data } = JSON.parse(raw) as { at: number; data: T };
      if (Date.now() - at < ttlMs) return data;
    }
  } catch {
    // storage unavailable — fall through to network
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const data = (await res.json()) as T;

  try {
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // quota exceeded / private mode — ignore
  }
  return data;
}
