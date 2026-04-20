import React, { useState, useCallback, useEffect } from 'react';
import { SpellContext } from './spellContext';
import { buildSpellsListUrl, fetchAllSpellsForCorpus } from '../utils/spellsApi';
import { cachedFetchJson } from '../utils/httpCache';

const ITEMS_PER_PAGE = 20;
const SPELL_LISTS_STORAGE_KEY = 'dnd-spell-lists-v1';
/** Previous key — read once to migrate saved data */
const SPELL_LISTS_LEGACY_STORAGE_KEY = 'dnd-spell-loadouts-v1';

function createSpellListId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `spell-list-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeSpellListEntries(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      Array.isArray(item.spells) &&
      typeof item.createdAt === 'number',
  );
}

function readStoredSpellLists() {
  try {
    const primary = localStorage.getItem(SPELL_LISTS_STORAGE_KEY);
    let lists = normalizeSpellListEntries(primary ? JSON.parse(primary) : []);

    if (lists.length === 0) {
      const legacy = localStorage.getItem(SPELL_LISTS_LEGACY_STORAGE_KEY);
      lists = normalizeSpellListEntries(legacy ? JSON.parse(legacy) : []);
    }

    const byId = new Map();
    for (const entry of lists) {
      if (!byId.has(entry.id)) byId.set(entry.id, entry);
    }
    return [...byId.values()].sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function SpellProvider({ children }) {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(
    buildSpellsListUrl({ pageSize: ITEMS_PER_PAGE, searchQuery: '', filters: {} }),
  );
  const [previousUrl, setPreviousUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortResetToken, setSortResetToken] = useState(0);
  const [comparisonKeys, setComparisonKeys] = useState([]);
  const [spellListDraftKeys, setSpellListDraftKeys] = useState([]);
  const [savedSpellLists, setSavedSpellLists] = useState([]);

  const [allSpellsForCharts, setAllSpellsForCharts] = useState([]);
  const [chartStatsLoading, setChartStatsLoading] = useState(true);
  const [chartStatsError, setChartStatsError] = useState(null);

  const fetchSpells = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cachedFetchJson(url, { ttlMs: 60 * 1000 });
      setSpells(Array.isArray(data.results) ? data.results : []);
      setNextUrl(data.next ?? null);
      setPreviousUrl(data.previous ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (nextUrl) {
      fetchSpells(nextUrl);
      setCurrentPage((prev) => prev + 1);
    }
  }, [nextUrl, fetchSpells]);

  const goToPreviousPage = useCallback(() => {
    if (previousUrl) {
      fetchSpells(previousUrl);
      setCurrentPage((prev) => prev - 1);
    }
  }, [previousUrl, fetchSpells]);

  const requestSortReset = useCallback(() => {
    setSortResetToken((prev) => prev + 1);
  }, []);

  const toggleComparisonSpell = useCallback((spellKey) => {
    setComparisonKeys((prev) => {
      if (prev.includes(spellKey)) {
        return prev.filter((k) => k !== spellKey);
      }
      if (prev.length >= 2) {
        return [prev[1], spellKey];
      }
      return [...prev, spellKey];
    });
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonKeys([]);
  }, []);

  const toggleSpellListSpell = useCallback((spellKey) => {
    setSpellListDraftKeys((prev) => {
      if (prev.includes(spellKey)) {
        return prev.filter((k) => k !== spellKey);
      }
      return [...prev, spellKey];
    });
  }, []);

  const clearSpellListDraft = useCallback(() => {
    setSpellListDraftKeys([]);
  }, []);

  const saveSpellList = useCallback(
    (name) => {
      const trimmed = name?.trim();
      if (!trimmed || spellListDraftKeys.length === 0) {
        return false;
      }
      const next = {
        id: createSpellListId(),
        name: trimmed,
        spells: [...spellListDraftKeys],
        createdAt: Date.now(),
      };
      setSavedSpellLists((prev) => [next, ...prev]);
      return true;
    },
    [spellListDraftKeys],
  );

  const openSpellList = useCallback((spellListId) => {
    setSavedSpellLists((prev) => {
      const list = prev.find((entry) => entry.id === spellListId);
      if (!list) {
        return prev;
      }
      setSpellListDraftKeys(list.spells);
      return prev;
    });
  }, []);

  const deleteSpellList = useCallback((spellListId) => {
    setSavedSpellLists((prev) => prev.filter((entry) => entry.id !== spellListId));
  }, []);

  useEffect(() => {
    setSavedSpellLists(readStoredSpellLists());
  }, []);

  useEffect(() => {
    localStorage.setItem(SPELL_LISTS_STORAGE_KEY, JSON.stringify(savedSpellLists));
  }, [savedSpellLists]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setChartStatsLoading(true);
      setChartStatsError(null);
      try {
        const all = await fetchAllSpellsForCorpus();
        if (!cancelled) {
          setAllSpellsForCharts(all);
        }
      } catch (err) {
        if (!cancelled) {
          setChartStatsError(err.message);
        }
      } finally {
        if (!cancelled) {
          setChartStatsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const url = buildSpellsListUrl({ pageSize: ITEMS_PER_PAGE, searchQuery, filters });
    fetchSpells(url);
    setCurrentPage(1);
  }, [searchQuery, filters, fetchSpells]);

  return (
    <SpellContext.Provider
      value={{
        spells,
        loading,
        error,
        currentPage,
        nextUrl,
        previousUrl,
        setCurrentPage,
        goToNextPage,
        goToPreviousPage,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        sortResetToken,
        requestSortReset,
        comparisonKeys,
        toggleComparisonSpell,
        clearComparison,
        spellListDraftKeys,
        toggleSpellListSpell,
        clearSpellListDraft,
        savedSpellLists,
        saveSpellList,
        openSpellList,
        deleteSpellList,
        allSpellsForCharts,
        chartStatsLoading,
        chartStatsError,
      }}
    >
      {children}
    </SpellContext.Provider>
  );
}
