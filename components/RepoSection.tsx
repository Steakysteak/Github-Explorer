import { theme } from '@/lib/theme';
import { Repository, SortByOption } from '@/lib/types';
import { sortRepositories } from '@/lib/github-utils';
import RepoCard from './RepoCard';
import EmptyState from './EmptyState';

interface RepoSectionProps {
  repos: Repository[];
  totalRepos: number;
  sortBy: SortByOption;
  onSortChange: (sort: SortByOption) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export default function RepoSection({
  repos,
  totalRepos,
  sortBy,
  onSortChange,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: RepoSectionProps) {
  const sortedRepos = sortRepositories(repos, sortBy);

  return (
    <div style={{ gridColumn: 'span 9' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '16px' }}>
            Repositories ({repos.length} of {totalRepos})
          </h2>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {([SortByOption.Stars, SortByOption.Name, SortByOption.Updated] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => onSortChange(sort)}
              style={{
                padding: '8px 16px',
                borderRadius: theme.radius.base,
                fontSize: '14px',
                fontWeight: '500',
                border: `1px solid ${sortBy === sort ? theme.colors.accent : theme.colors.accentMuted}`,
                cursor: 'pointer',
                backgroundColor: sortBy === sort ? theme.colors.accent : theme.colors.bgSurface,
                color: sortBy === sort ? theme.colors.bgBase : theme.colors.textPrimary,
                transition: theme.transition,
              }}
              onMouseEnter={(e) => {
                if (sortBy !== sort) {
                  e.currentTarget.style.backgroundColor = theme.colors.bgOverlay;
                  e.currentTarget.style.borderColor = theme.colors.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (sortBy !== sort) {
                  e.currentTarget.style.backgroundColor = theme.colors.bgSurface;
                  e.currentTarget.style.borderColor = theme.colors.accentMuted;
                }
              }}
            >
              {sort === SortByOption.Stars
                ? '⭐ Stars'
                : sort === SortByOption.Name
                  ? '📝 Name'
                  : '📅 Updated'}
            </button>
          ))}
        </div>
      </div>

      {/* Repos List */}
      {sortedRepos.length > 0 ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {sortedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: isLoadingMore ? theme.colors.accentMuted : theme.colors.accent,
                color: theme.colors.bgBase,
                fontWeight: '500',
                borderRadius: theme.radius.base,
                border: 'none',
                cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                transition: theme.transition,
              }}
              onMouseEnter={(e) => {
                if (!isLoadingMore) e.currentTarget.style.backgroundColor = theme.colors.volt;
              }}
              onMouseLeave={(e) => {
                if (!isLoadingMore) e.currentTarget.style.backgroundColor = theme.colors.accent;
              }}
            >
              {isLoadingMore ? 'Loading more...' : 'Load More Repos'}
            </button>
          )}

          {!hasMore && repos.length > 0 && (
            <p style={{ textAlign: 'center', color: theme.colors.textSecondary, paddingTop: '16px', paddingBottom: '16px' }}>
              No more repositories to load
            </p>
          )}
        </>
      ) : (
        <EmptyState message="No repositories found" />
      )}
    </div>
  );
}
