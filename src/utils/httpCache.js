const CACHE_PREFIX = 'dnd-stats-cache:v1:';
const memoryCache = new Map();

function nowMs() {
  return Date.now();
}

function cacheKeyForUrl(url) {
  return `${CACHE_PREFIX}${url}`;
}

function readLocalStorageEntry(key) {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.expiresAt !== 'number') return null;
    if (parsed.expiresAt <= nowMs()) {
      window.localStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}

function writeLocalStorageEntry(key, value, ttlMs) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        value,
        expiresAt: nowMs() + ttlMs,
      }),
    );
  } catch {
    // Ignore quota/privacy errors; memory cache is still active.
  }
}

/**
 * Fetches JSON with memory + localStorage cache.
 * @template T
 * @param {string} url
 * @param {{ ttlMs?: number, force?: boolean }} [options]
 * @returns {Promise<T>}
 */
export async function cachedFetchJson(url, options = {}) {
  const ttlMs = options.ttlMs ?? 5 * 60 * 1000;
  const force = options.force ?? false;
  const key = cacheKeyForUrl(url);

  if (!force) {
    const mem = memoryCache.get(key);
    if (mem && mem.expiresAt > nowMs()) {
      return mem.value;
    }
    const persisted = readLocalStorageEntry(key);
    if (persisted != null) {
      memoryCache.set(key, { value: persisted, expiresAt: nowMs() + ttlMs });
      return persisted;
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const expiresAt = nowMs() + ttlMs;
  memoryCache.set(key, { value: data, expiresAt });
  writeLocalStorageEntry(key, data, ttlMs);
  return data;
}

export function clearHttpCache() {
  memoryCache.clear();
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const keysToDelete = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // no-op
  }
}
