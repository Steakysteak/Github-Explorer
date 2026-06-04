# GitHub Explorer 🚀

A simple, fast, and modern way to explore GitHub profiles and repositories.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   Create a `.env.local` file:
   ```env
   GITHUB_TOKEN=your_personal_access_token
   ```

   Token is not needed for normal usage for just testing as by default we get 60 hits/minute from github

3. **Run the app**
   ```bash
   npm run dev
   ```

## ✨ Key Features

- **Instant Search**: Find users quickly with debounced search.
- **Deep Insights**: View profile details and repository stats.
- **Smart Analytics**: Language distribution charts.
- **Performance**: In-memory caching (60s TTL) for lightning-fast results.
- **Modern UI**: Clean, responsive dark theme with hidden scrollbars for an "app-like" feel.

## ⚙️ System Flow

```text
[User Input in Search Bar]
         ↓
[Redundancy Check] (Compare with active user to skip redundant calls)
         ↓
[Debounce Mechanism] (500ms delay via memoized utility function)
         ↓
[Frontend: performSearch] (Initiates fetch request to /api/github)
         ↓
[API Route: Controller] (Next.js route handler validates query params)
         ↓
[Rate Limiter] (Protects server - Custom window-based: 4-5 reqs / 10s)
         ↓
[In-Memory Cache] (Check for existing username + page combination)
    ├─ HIT  → [Fast Return] (X-Cache: HIT)
    └─ MISS ↓
       [GitHub Service Layer] (Abstracted business logic)
           ↓
       [GitHub API] (Authenticated fetch for Profile + Repositories)
           ↓
       [Data Transformation] (Mapping GitHub DTOs to Clean Interfaces)
           ↓
       [Update Cache] (Global Map-based storage with 60s TTL)
           ↓
       [Fresh Response] (X-Cache: MISS)
         ↓
[Frontend: State Sync] (Updates Profile, Repo List, and Search History)
         ↓
[Local Storage] (Persists search query for session persistence)
         ↓
[Render View] (Interactive Dashboard with Analytics & Pagination)
```

## 🔌 API Documentation

### `GET /api/github`

Fetches user profile and repositories.

**Parameters:**
- `username` (required): GitHub username.
- `page` (optional): Page number (default: 1).

**Sample Response:**
```json
{
  "profile": { "name": "...", "avatarUrl": "...", "bio": "..." },
  "repositories": [...],
  "fromCache": true
}
```

## 🛠️ Engineering Standards

- **Clean Code**: Highly modular components and custom hooks.
- **DRY Logic**: Shared utilities and services in `lib/`.
- **Meaningful Commits**: Clear, descriptive commit history.
- **Type Safety**: Fully typed with TypeScript.

## 🎁 Bonus Features

- **Redundancy Protection**: Prevents redundant API calls if the query matches the currently loaded data.
- **Smart Rate Limiting**: Custom rate limiting (4-5 requests per 10 seconds) implemented to ensure stable API usage.
- **Architectural Excellence**:
  - **Controller-Service Pattern**: `route.ts` acts as a controller, delegating business logic to the `lib/` service layer.
  - **Consistent Abstraction**: Uniform level of abstraction maintained across frontend components.
  - **Modular Design**: Clear separation between services and utilities in the `lib/` directory.
- **Code Quality**: Strict adherence to DRY principles and maintainable, clean code practices.

### Directory Structure
```
github-explorer/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts               # API proxy handler + caching logic
│   ├── globals.css                    # Tailwind + base styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Main dashboard entry point
│
├── components/
│   ├── DashboardHeader.tsx            # Application header branding
│   ├── EmptyState.tsx                 # Zero-state UI for empty dashboard
│   ├── ErrorDisplay.tsx               # Alert card for gracefully catching API/network errors
│   ├── LanguageChart.tsx              # Recharts component for visual language metric analysis
│   ├── ProfileCard.tsx                # Individual user statistics display
│   ├── RepoCard.tsx                   # Expandable element containing deep repository parameters
│   ├── RepoSection.tsx                # Aggregator card sorting & pagination grid for repos
│   ├── SearchHistory.tsx              # Local storage cache sidebar/list for historic runs
│   ├── SearchInput.tsx                # Isolated input mechanism for handling search entries
│   └── Skeletons.tsx                  # Neutral pulsing components for smooth loading states
│
├── hooks/
│   └── useGithubExplorer.ts           # Central client state machine orchestration hook
│
├── lib/
│   ├── cache.ts                       # In-memory global singletons implementation
│   ├── github-service.ts              # Abstracted upstream API data fetchers
│   ├── github-utils.ts                # Parsers, sorting layers, and structural calculators
│   ├── rateLimitNative.ts             # Tracking window helpers protecting core tokens
│   ├── storage.ts                     # Local storage wrapper managing query collections
│   ├── theme.ts                       # Layout style maps/tokens
│   └── types.ts                       # Explicit frontend and backend type systems
│
├── public/                            # Static asset container
├── .env.example                       # Environment variable declaration template
├── .gitignore                         # Build and dependency safety exclusions

```

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Connect your repository.
2. Add your `GITHUB_TOKEN` to environment variables.
3. Deploy.

---
Built for speed and simplicity.
