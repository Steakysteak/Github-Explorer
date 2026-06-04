import { theme } from '@/lib/theme';

interface EmptyStateProps {
  message: string;
  isIdle?: boolean;
}

export default function EmptyState({ message, isIdle }: EmptyStateProps) {
  return (
    <div style={{ 
      backgroundColor: theme.colors.bgSurface, 
      borderRadius: theme.radius.base, 
      boxShadow: isIdle ? `0 4px 6px rgba(0,0,0,0.2)` : 'none',
      padding: isIdle ? '64px' : '32px', 
      textAlign: 'center', 
      border: `1px solid ${theme.colors.accentMuted}` 
    }}>
      <p style={{ color: theme.colors.textSecondary, fontSize: isIdle ? '18px' : '16px' }}>
        {message}
      </p>
    </div>
  );
}
