'use client';

import { useState, useCallback, useMemo } from 'react';
import { SearchStatus, SortByOption, Profile, Repository } from '@/lib/types';
import { saveSearchToLocalStorage } from '@/lib/storage';
import { debounce } from '@/lib/github-utils';

export function useGithubExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUser, setActiveUser] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.Stars);
  const [status, setStatus] = useState<SearchStatus>(SearchStatus.Idle);
  const [errorMsg, setErrorMsg] = useState('');
  const [totalRepos, setTotalRepos] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  const performSearch = useCallback(async (username: string, targetPage = 1) => {
    if (!username) return;

    const normalizedUsername = username.toLowerCase().trim();

    if (targetPage === 1) {
      setStatus(SearchStatus.Loading);
      setRepos([]);
      setFromCache(false);
    } else {
      setIsFetchingMore(true);
    }
    
    setErrorMsg('');

    try {
      const res = await fetch(
        `/api/github?username=${encodeURIComponent(normalizedUsername)}&page=${targetPage}`
      );
      const data = await res.json();

      if (!res.ok) {
        setStatus(SearchStatus.Error);
        setErrorMsg(data.error || 'Something went wrong.');
        setProfile(null);
        return;
      }

      setProfile(data.profile);
      setRepos((prev) =>
        targetPage === 1 ? data.repositories : [...prev, ...data.repositories]
      );
      setActiveUser(normalizedUsername);
      setPage(targetPage);
      setStatus(SearchStatus.Success);
      setTotalRepos(data.profile.publicReposCount);
      setHasMore((targetPage * 30) < data.profile.publicReposCount);
      setFromCache(!!data.fromCache);

      saveSearchToLocalStorage(normalizedUsername);
    } catch (err) {
      setStatus(SearchStatus.Error);
      setErrorMsg('Failed to fetch data. Please try again.');
      setProfile(null);
    } finally {
      setIsFetchingMore(false);
    }
  }, []);

  // Debounced search callback
  const debouncedSearch = useMemo(
    () => debounce((query: string) => performSearch(query, 1), 500),
    [performSearch]
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const normalized = query.toLowerCase().trim();
    
    if (normalized.length > 0) {
      // Only trigger if it's different from the active user
      if (normalized !== activeUser.toLowerCase()) {
        debouncedSearch(query);
      }
    } else {
      debouncedSearch.cancel();
      setActiveUser('');
      setStatus(SearchStatus.Idle);
      setProfile(null);
      setRepos([]);
    }
  };

  const loadMoreRepos = () => {
    performSearch(activeUser, page + 1);
  };

  const handleRecentClick = (username: string) => {
    debouncedSearch.cancel();
    setSearchQuery(username);
    if (username.toLowerCase().trim() !== activeUser.toLowerCase()) {
      performSearch(username, 1);
    }
  };

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    profile,
    repos,
    sortBy,
    setSortBy,
    status,
    errorMsg,
    totalRepos,
    hasMore,
    isFetchingMore,
    loadMoreRepos,
    handleRecentClick,
    fromCache,
  };
}
