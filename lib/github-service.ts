import { Profile, Repository } from './types';

interface GitHubUserResponse {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GitHubRepoResponse {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  open_issues_count: number;
  default_branch: string;
}

export interface GitHubData {
  profile: Profile;
  repositories: Repository[];
}

/**
 * Fetches and formats GitHub profile and repository data.
 */
export async function fetchGitHubData(username: string, page: string = '1'): Promise<GitHubData | { error: string; status: number }> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    ...(token && { Authorization: `token ${token}` }),
  };

  try {
    // 1. Fetch User Profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });

    if (profileRes.status === 404) {
      return { error: 'GitHub user not found', status: 404 };
    }

    if (profileRes.status === 403) {
      return { error: 'GitHub API rate limit hit. Try later.', status: 429 };
    }

    if (!profileRes.ok) throw new Error('Failed to fetch user profile');

    const profileData: GitHubUserResponse = await profileRes.json();

    // 2. Fetch Paginated Repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=30&sort=updated`,
      { headers }
    );

    if (!reposRes.ok) throw new Error('Failed to fetch repositories');
    const reposData: GitHubRepoResponse[] = await reposRes.json();

    // 3. Format and Return
    return {
      profile: {
        avatarUrl: profileData.avatar_url,
        name: profileData.name || profileData.login,
        bio: profileData.bio || 'No biography provided.',
        followers: profileData.followers,
        following: profileData.following,
        publicReposCount: profileData.public_repos,
      },
      repositories: reposData.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available.',
        primaryLanguage: repo.language || 'Unknown',
        starCount: repo.stargazers_count,
        lastUpdated: repo.updated_at,
        openIssuesCount: repo.open_issues_count,
        defaultBranch: repo.default_branch,
      })),
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    return { error: 'Internal Server Error', status: 500 };
  }
}
