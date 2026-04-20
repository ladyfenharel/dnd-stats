import React, { useState, useCallback, useEffect } from 'react';
import { SpellContext } from './spellContext';
import { buildSpellsListUrl, fetchAllSpellsForCorpus } from '../utils/spellsApi';
import { cachedFetchJson } from '../utils/httpCache';

const ITEMS_PER_PAGE = 20;

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
        // Replace the oldest selected spell when adding a third.
        return [prev[1], spellKey];
      }
      return [...prev, spellKey];
    });
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonKeys([]);
  }, []);

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
        allSpellsForCharts,
        chartStatsLoading,
        chartStatsError,
      }}
    >
      {children}
    </SpellContext.Provider>
  );
}
