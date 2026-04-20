import { cachedFetchJson } from './httpCache';

export const OPEN5E_SPELLS_BASE = 'https://api.open5e.com/v2/spells';

/** v2 caps page_size at 50 */
export const SPELLS_PAGE_SIZE_MAX = 50;

export function buildSpellsListUrl({ pageSize = 20, searchQuery = '', filters = {} }) {
  const params = new URLSearchParams();
  const size = Math.min(Math.max(1, pageSize), SPELLS_PAGE_SIZE_MAX);
  params.set('page_size', String(size));
  if (searchQuery) {
    params.set('name__icontains', searchQuery);
  }
  if (filters.level !== undefined && filters.level !== '') {
    params.set('level', filters.level === '0' ? '0' : String(parseInt(filters.level, 10)));
  }
  if (filters.school) {
    params.set('school__key', filters.school);
  }
  if (filters.classKey) {
    params.set('classes__key', filters.classKey);
  }
  return `${OPEN5E_SPELLS_BASE}/?${params.toString()}`;
}

export function spellDetailUrl(spellKey) {
  return `${OPEN5E_SPELLS_BASE}/${encodeURIComponent(spellKey)}/`;
}

/** First page URL for walking `next` until all spells are loaded (charts). */
export function chartCorpusFirstPageUrl() {
  return `${OPEN5E_SPELLS_BASE}/?page_size=${SPELLS_PAGE_SIZE_MAX}`;
}

/**
 * Fetches every spell page (v2 has no bulk limit above 50/page).
 * @returns {Promise<object[]>}
 */
export async function fetchAllSpellsForCorpus() {
  const out = [];
  let url = chartCorpusFirstPageUrl();
  while (url) {
    const data = await cachedFetchJson(url, { ttlMs: 6 * 60 * 60 * 1000 });
    const batch = data.results;
    if (Array.isArray(batch)) {
      out.push(...batch);
    }
    url = data.next || null;
  }
  return out;
}
