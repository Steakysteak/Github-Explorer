# GitHub Explorer 🚀

A simple, fast, and modern way to explore GitHub profiles and repositories.

Experience the live application here: **[github-explorer-sandy-nu.vercel.app](https://github-explorer-sandy-nu.vercel.app/)**


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

Fetches comprehensive GitHub user profile data and their public repositories.

- **Method**: `GET`
- **Path**: `/api/github`
- **Request Body**: None (Uses query parameters)
- **Parameters**:
  - `username` (required): The GitHub handle to search for.
  - `page` (optional): Page number for repository pagination (default: 1).

- **Response Shape**:
```json
{
  "profile": {
    "login": "string",
    "name": "string",
    "avatarUrl": "string",
    "bio": "string",
    "location": "string",
    "company": "string",
    "followers": number,
    "following": number,
    "publicReposCount": number,
    "htmlUrl": "string"
  },
  "repositories": [
    {
      "id": number,
      "name": "string",
      "description": "string",
      "starCount": number,
      "forkCount": number,
      "language": "string",
      "htmlUrl": "string",
      "lastUpdated": "ISO-8601 string"
    }
  ],
  "fromCache": boolean
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

## 🔗 Live Demo

Experience the live application here: **[github-explorer-sandy-nu.vercel.app](https://github-explorer-sandy-nu.vercel.app/)**

## 💻 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) for hybrid rendering and API routes.
- **Library**: [React 19](https://react.dev/) for component-driven UI.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for modern, utility-first responsive design.
- **Analytics**: [Recharts](https://recharts.org/) for interactive language distribution charts.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety.
- **State & Persistence**: Custom Hooks + LocalStorage for history and search state management.

## 🛠️ How to Run Locally

If you have **Node.js** installed, follow these steps to run the project locally:

1. **Clone & Enter Directory**
   ```bash
   git clone <your-repo-url>
   cd github-explorer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment** (Optional but recommended)
   Create a `.env.local` file to increase GitHub API rate limits:
   ```env
   GITHUB_TOKEN=your_personal_access_token
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔮 Next Steps & Future Roadmap

**What was prioritized:**
- Core search experience and responsive dashboard.
- Backend proxying with intelligent caching and rate limiting.
- Clean, maintainable architecture (Controller-Service pattern).

**What's next:**
- **Automated Testing**: Implement unit tests (Jest) for services and E2E tests (Playwright) for critical paths.
- **Advanced Filtering**: Add ability to filter repositories by language or sort by multiple criteria.
- **Infinite Scrolling**: Replace the "Load More" button with a seamless scroll experience.
- **Comparison Tool**: Allow users to compare two GitHub profiles side-by-side.
- **Dark/Light Mode**: Full theme toggle support beyond the current dark-first aesthetic.

---
Built for speed and simplicity.
