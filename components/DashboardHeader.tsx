import { theme } from '@/lib/theme';

export default function DashboardHeader() {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '12px' }}>
        GitHub Explorer
      </h1>
      <p style={{ color: theme.colors.textSecondary, fontSize: '18px' }}>
        Search for GitHub users and explore their repositories
      </p>
    </div>
  );
}
