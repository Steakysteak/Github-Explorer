'use client';

import ProfileCard from '@/components/ProfileCard';
import LanguageChart from '@/components/LanguageChart';
import SearchHistory from '@/components/SearchHistory';
import { ProfileSkeleton, RepoSkeletonList } from '@/components/Skeletons';
import DashboardHeader from '@/components/DashboardHeader';
import SearchInput from '@/components/SearchInput';
import ErrorDisplay from '@/components/ErrorDisplay';
import EmptyState from '@/components/EmptyState';
import RepoSection from '@/components/RepoSection';
import { theme } from '@/lib/theme';
import { SearchStatus } from '@/lib/types';
import { useGithubExplorer } from '@/hooks/useGithubExplorer';

export default function Dashboard() {
  const {
    searchQuery,
    setSearchQuery,
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
  } = useGithubExplorer();

  return (
    <main role="main" aria-label="GitHub Explorer Application" style={{ minHeight: '100vh', backgroundColor: theme.colors.bgBase, paddingTop: '48px', paddingBottom: '48px' }}>
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '24px', paddingRight: '24px' }}>
        
        <DashboardHeader />

        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          isLoading={status === SearchStatus.Loading} 
        />

        {status === SearchStatus.Success && fromCache && (
          <div style={{ 
            marginBottom: '20px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '4px 12px', 
            backgroundColor: theme.colors.bgSurface, 
            borderRadius: theme.radius.pill, 
            border: `1px solid ${theme.colors.accentMuted}`,
            fontSize: '12px',
            color: theme.colors.accent
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: theme.colors.accent, borderRadius: '50%' }} />
            Served from cache
          </div>
        )}

        {status !== SearchStatus.Idle && (
          <div style={{ marginBottom: '40px' }}>
            <SearchHistory onSelectRecent={handleRecentClick} />
          </div>
        )}

        {status === SearchStatus.Loading && (
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ flex: 1 }}>
              <ProfileSkeleton />
            </div>
            <div style={{ flex: 1 }}>
              <RepoSkeletonList />
            </div>
          </div>
        )}

        {status === SearchStatus.Error && <ErrorDisplay message={errorMsg} />}

        {status === SearchStatus.Success && profile && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '40px', marginBottom: '40px' }}>
            {/* Sidebar: Profile & Chart */}
            <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <ProfileCard profile={profile} />
              {repos.length > 0 && <LanguageChart repos={repos} />}
            </div>

            {/* Main: Repos */}
            <RepoSection 
              repos={repos}
              totalRepos={totalRepos}
              sortBy={sortBy}
              onSortChange={setSortBy}
              hasMore={hasMore}
              onLoadMore={loadMoreRepos}
              isLoadingMore={isFetchingMore}
            />
          </div>
        )}

        {status === SearchStatus.Idle && (
          <EmptyState 
            isIdle 
            message="Start by typing a GitHub username above to explore their profile and repositories." 
          />
        )}
      </div>
    </main>
  );
}
