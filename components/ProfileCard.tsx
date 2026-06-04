'use client';

import { theme } from '@/lib/theme';
import { Profile } from '@/lib/types';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 4px 6px rgba(0,0,0,0.2)', padding: '24px', display: 'flex', flexDirection: 'column', border: `1px solid ${theme.colors.accentMuted}` }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Avatar */}
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          style={{ width: '96px', height: '96px', borderRadius: '50%', border: `4px solid ${theme.colors.accent}`, marginBottom: '16px' }}
        />

        {/* Name */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '8px' }}>
          {profile.name}
        </h2>

        {/* Bio */}
        <p style={{ color: theme.colors.textSecondary, fontSize: '14px', marginBottom: '24px' }}>
          {profile.bio}
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%', borderTop: `1px solid ${theme.colors.accentMuted}`, paddingTop: '16px' }}>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: theme.colors.accent, marginBottom: '4px' }}>
              {profile.followers}
            </p>
            <p style={{ fontSize: '12px', color: theme.colors.textSecondary }}>Followers</p>
          </div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: theme.colors.accent, marginBottom: '4px' }}>
              {profile.following}
            </p>
            <p style={{ fontSize: '12px', color: theme.colors.textSecondary }}>Following</p>
          </div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: theme.colors.accent, marginBottom: '4px' }}>
              {profile.publicReposCount}
            </p>
            <p style={{ fontSize: '12px', color: theme.colors.textSecondary }}>Repos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
