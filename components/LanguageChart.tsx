'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { theme } from '@/lib/theme';
import { Repository } from '@/lib/types';

interface LanguageChartProps {
  repos: Repository[];
}

const COLORS = [
  '#06b6d4',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#6366f1',
];

export default function LanguageChart({ repos }: LanguageChartProps) {
  // Count languages
  const languageData = repos.reduce(
    (acc, repo) => {
      if (repo.primaryLanguage && repo.primaryLanguage !== 'Unknown') {
        const existing = acc.find((l) => l.name === repo.primaryLanguage);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ name: repo.primaryLanguage, value: 1 });
        }
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  if (languageData.length === 0) {
    return (
      <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', padding: '24px', border: `1px solid ${theme.colors.accentMuted}` }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '16px' }}>
          Languages Used
        </h3>
        <p style={{ color: theme.colors.textSecondary }}>
          No language data available
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.colors.bgSurface, borderRadius: theme.radius.base, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', padding: '24px', border: `1px solid ${theme.colors.accentMuted}` }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: '16px' }}>
        Languages Used
      </h3>
      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 60, left: 0 }}>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={80}
              label={false}
            >
              {languageData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} repos`, 'Count']}
              contentStyle={{ backgroundColor: theme.colors.bgOverlay, border: `1px solid ${theme.colors.accentMuted}`, borderRadius: '4px', color: theme.colors.textPrimary }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ paddingTop: '12px', color: theme.colors.textSecondary, fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
