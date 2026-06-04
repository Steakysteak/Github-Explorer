'use client';

import { theme } from '@/lib/theme';

export function ProfileSkeleton() {
  return (
    <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 4px 6px rgba(0,0,0,0.2)', padding: '24px', maxWidth: '448px', width: '100%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', border: `1px solid ${theme.colors.accentMuted}` }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: theme.colors.bgOverlay, borderRadius: '50%' }} />
        <div style={{ flex: 1, width: '100%' }}>
          <div style={{ height: '24px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, marginBottom: '8px', width: '75%', marginLeft: 'auto', marginRight: 'auto' }} />
          <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '50%', marginLeft: 'auto', marginRight: 'auto' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '8px' }}>
        <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '100%' }} />
        <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '85%' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '8px' }}>
          <div style={{ height: '24px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base }} />
          <div style={{ height: '24px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base }} />
          <div style={{ height: '24px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base }} />
        </div>
      </div>
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', padding: '16px', width: '100%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', border: `1px solid ${theme.colors.accentMuted}` }}>
      <div style={{ height: '24px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '33%', marginBottom: '12px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '100%' }} />
        <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '80%' }} />
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
        <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '25%' }} />
        <div style={{ height: '16px', backgroundColor: theme.colors.bgOverlay, borderRadius: theme.radius.base, width: '25%' }} />
      </div>
    </div>
  );
}

export function RepoSkeletonList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {[...Array(5)].map((_, i) => (
        <RepoSkeleton key={i} />
      ))}
    </div>
  );
}
