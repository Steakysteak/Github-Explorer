import { theme } from '@/lib/theme';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function SearchInput({ value, onChange, isLoading }: SearchInputProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <input
        type="text"
        placeholder="Search GitHub username (e.g., torvalds, octocat)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search for GitHub users by username"
        aria-busy={isLoading}
        aria-describedby="search-help"
        style={{
          width: '100%',
          padding: '16px 20px',
          borderRadius: theme.radius.base,
          border: `1px solid ${theme.colors.accentMuted}`,
          backgroundColor: theme.colors.bgSurface,
          color: theme.colors.textPrimary,
          fontSize: '16px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: theme.transition,
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = theme.colors.accent; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = theme.colors.accentMuted; }}
      />
      <p id="search-help" style={{ fontSize: '12px', color: theme.colors.textSecondary, marginTop: '12px' }}>
        Start typing to search (debounced)
      </p>
    </div>
  );
}
