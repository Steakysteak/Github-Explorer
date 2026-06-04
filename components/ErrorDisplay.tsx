import { theme } from '@/lib/theme';

interface ErrorDisplayProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div style={{ backgroundColor: theme.colors.bgOverlay, borderLeft: `4px solid ${theme.colors.volt}`, padding: '24px', borderRadius: theme.radius.base, marginBottom: '24px' }}>
      <h3 style={{ fontWeight: 'bold', color: theme.colors.volt, marginBottom: '8px' }}>Error</h3>
      <p style={{ color: theme.colors.textSecondary }}>{message}</p>
    </div>
  );
}
