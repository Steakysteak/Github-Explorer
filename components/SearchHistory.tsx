'use client';

import { useState } from 'react';
import { theme } from '@/lib/theme';

interface SearchHistoryProps {
  onSelectRecent: (username: string) => void;
}

export default function SearchHistory({ onSelectRecent }: SearchHistoryProps) {
  const [recentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recent_github_searches');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse recent searches', e);
        }
      }
    }
    return [];
  });

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', padding: '16px', width: '100%', border: `1px solid ${theme.colors.accentMuted}` }}>
      <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '12px', textTransform: 'uppercase' }}>
        Recently Searched
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {recentSearches.map((username) => (
          <button
            key={username}
            onClick={() => onSelectRecent(username)}
            style={{
              padding: '6px 12px',
              fontSize: '14px',
              backgroundColor: theme.colors.bgOverlay,
              color: theme.colors.accent,
              borderRadius: theme.radius.pill,
              border: `1px solid ${theme.colors.accent}`,
              cursor: 'pointer',
              transition: theme.transition,
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = theme.colors.accent;
              e.currentTarget.style.color = theme.colors.bgBase;
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = theme.colors.bgOverlay;
              e.currentTarget.style.color = theme.colors.accent;
            }}
          >
            {username}
          </button>
        ))}
      </div>
    </div>
  );
}
