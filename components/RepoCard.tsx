'use client';

import { useState } from 'react';
import { theme } from '@/lib/theme';
import { Repository } from '@/lib/types';

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', overflow: 'hidden', border: `1px solid ${theme.colors.accentMuted}` }}>
      {/* Collapsed View */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${repo.name} - ${isOpen ? 'Collapse' : 'Expand'} repository details`}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: '16px',
          textAlign: 'left',
          border: 'none',
          backgroundColor: theme.colors.bgSurface,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          transition: theme.transition,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.colors.bgOverlay; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.colors.bgSurface; }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '8px' }}>
            {repo.name}
          </h3>
          <p style={{ fontSize: '14px', color: theme.colors.textSecondary, marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {repo.description}
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: theme.colors.textSecondary, flexWrap: 'wrap' }}>
            {repo.primaryLanguage !== 'Unknown' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: theme.colors.accent, borderRadius: '50%' }} />
                {repo.primaryLanguage}
              </span>
            )}
            <span>⭐ {repo.starCount}</span>
            <span>Updated {formatDate(repo.lastUpdated)}</span>
          </div>
        </div>
        <div style={{ marginLeft: '16px', flexShrink: 0, color: theme.colors.textSecondary }}>
          {isOpen ? '▼' : '▶'}
        </div>
      </button>

      {/* Expanded View */}
      {isOpen && (
        <div style={{ backgroundColor: theme.colors.bgOverlay, borderTop: `1px solid ${theme.colors.accentMuted}`, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: theme.colors.textSecondary, textTransform: 'uppercase', marginBottom: '4px' }}>
              Open Issues
            </p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: theme.colors.textPrimary }}>
              {repo.openIssuesCount}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: theme.colors.textSecondary, textTransform: 'uppercase', marginBottom: '4px' }}>
              Default Branch
            </p>
            <p style={{ fontSize: '14px', color: theme.colors.textPrimary, fontFamily: 'monospace', backgroundColor: theme.colors.bgSurface, padding: '4px 8px', borderRadius: theme.radius.base, border: `1px solid ${theme.colors.accentMuted}` }}>
              {repo.defaultBranch}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
