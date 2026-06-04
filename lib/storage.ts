export function saveSearchToLocalStorage(username: string) {
  if (typeof window === 'undefined') return;
  const historic = JSON.parse(
    localStorage.getItem('recent_github_searches') || '[]'
  );
  const updated = [username, ...historic.filter((u: string) => u !== username)].slice(
    0,
    5
  );
  localStorage.setItem('recent_github_searches', JSON.stringify(updated));
}
