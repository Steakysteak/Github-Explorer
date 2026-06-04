export enum SearchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum SortByOption {
  Stars = 'stars',
  Name = 'name',
  Updated = 'updated',
}

export interface Profile {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  publicReposCount: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  primaryLanguage: string;
  starCount: number;
  lastUpdated: string;
  openIssuesCount: number;
  defaultBranch: string;
}
