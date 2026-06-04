import { Repository, SortByOption } from './types';

/**
 * Sorts a list of repositories based on the selected option.
 */
export function sortRepositories(repos: Repository[], sortBy: SortByOption): Repository[] {
  return [...repos].sort((a, b) => {
    switch (sortBy) {
      case SortByOption.Stars:
        return b.starCount - a.starCount;
      case SortByOption.Name:
        return a.name.localeCompare(b.name);
      case SortByOption.Updated:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });
}

/**
 * Simple debounce utility with cancel functionality.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: NodeJS.Timeout;
  
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
