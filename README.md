# D&D Spell Explorer

A React dashboard for exploring and comparing D&D spells from **Open5e v2**, with searchable tables, class/school tagging, optional analytics charts, and shareable spell detail routes.

**Live demo:** [https://ladyfenharel.github.io/dnd-stats/](https://ladyfenharel.github.io/dnd-stats/)

## What This Project Shows

- Building a data-heavy UI with clear UX tradeoffs (speed vs completeness)
- Handling third-party API changes (Open5e v1 -> v2 migration)
- Designing interactive table tooling (filtering, sorting, compare workflow)
- Improving perceived performance with a layered cache

## Tech Stack

- **React 19 + Vite** for fast dev/build cycles
- **React Router** for nested routing and deep-link detail pages (`/spells/:key`)
- **MUI** for component system, accessibility, and responsive layout
- **Recharts** for school/level visualizations
- **Vitest + ESLint + GitHub Actions** for baseline quality checks

## Feature Highlights

- **Search + filters** for level, school, and class (`name__icontains`, `level`, `school__key`, `classes__key`)
- **Interactive table tags**:
  - row-level interaction system using semantic chip-based filtering
  - color-coded school/class chips
  - click school/class chips to prioritize matching rows at the top
- **Spell comparison system**:
  - state-driven comparison engine for multi-entity evaluation
  - select up to 2 spells from the table
  - side-by-side summary panel for quick evaluation
- **Deep links + resilient detail page**:
  - direct navigation to `/spells/:key`
  - fetches missing spell details on refresh/direct load
- **Optional charts** (toggle show/hide):
  - school distribution
  - level distribution
  - based on full paginated corpus fetch
- **Caching layer**:
  - in-memory + `localStorage` cache with TTL
  - reduces repeated network latency for list/detail/corpus requests

## Key Engineering Decisions

- **Paginated table, full-corpus charts**  
  The table is page-based for interaction speed; charts intentionally fetch the full dataset so aggregate visuals are accurate.

- **Focused chip sorting**  
  Clicking a row-level class/school chip does targeted sorting (bring matching rows to top), which is more useful than generic alphabetical sort when scanning.

- **Client-side cache with TTLs**  
  Different TTLs by use case (short for list pages, longer for detail/corpus) to balance freshness and responsiveness.

## System Architecture

The application is structured as a client-side data exploration system:

- **API Layer**: Fetches paginated spell data from Open5e v2
- **Service Layer**: Normalizes and caches responses with TTL-based invalidation
- **State Layer**: Manages filters, comparison selection, and routing state
- **UI Layer**: Renders interactive tables, detail views, charts, and comparison panels

Simple flow:

`API -> Service Layer -> Cache -> State -> UI`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

```bash
npm run lint
npm run test
npm run build
```

## Production Preview

```bash
npm run build
npm run preview
```

For GitHub Pages-style routing, use `http://localhost:4173/dnd-stats/` (port may vary).

## Deployment

Configured for GitHub Pages under `/dnd-stats/`.

```bash
npm run deploy
```

## Data Source and Licensing

Spell data is provided by [Open5e](https://open5e.com/).  
See [Open5e legal](http://open5e.com/legal) for source document licensing.
