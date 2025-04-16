// SpellContext.jsx
import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const SpellContext = createContext();

export const useSpells = () => {
  return useContext(SpellContext);
};

const ITEMS_PER_PAGE = 20;

export const SpellProvider = ({ children }) => {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(`https://api.open5e.com/v1/spells/?limit=${ITEMS_PER_PAGE}`);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const hasInitialLoad = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const fetchSpells = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSpells(data.results);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (nextUrl) {
      fetchSpells(nextUrl);
      setCurrentPage(prev => prev + 1);
    }
  }, [nextUrl, fetchSpells]);

  const goToPreviousPage = useCallback(() => {
    if (previousUrl) {
      fetchSpells(previousUrl);
      setCurrentPage(prev => prev - 1);
    }
  }, [previousUrl, fetchSpells]);

  // Re-fetch spells whenever the search query or filters change
  useEffect(() => {
    const constructUrl = () => {
      let url = `https://api.open5e.com/v1/spells/?limit=${ITEMS_PER_PAGE}`;
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }
      if (filters.level) {
        url += `&level_int=${filters.level === '0' ? 0 : parseInt(filters.level)}`;
      }
      if (filters.school) {
        url += `&school=${filters.school}`;
      }
      return url;
    };

    fetchSpells(constructUrl());
    setCurrentPage(1); // Reset to the first page on new search/filter
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
      }}
    >
      {children}
    </SpellContext.Provider>
  );
};

export default SpellContext;