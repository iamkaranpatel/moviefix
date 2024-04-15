# MovieFix

MovieFix is a web application for listing Movie from 2012 to current year, built using [Next.js](https://nextjs.org/) using [TMDB API](https://developer.themoviedb.org/reference/discover-movie) and used Typescript

## Getting Started

For running this project node version 20+

First, run the development server use below command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

First, run the build server use below command:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Overview

1. This project list 20 movies per year from 2012 to current year, As we scroll movie data will be fetched based on year

2. Movies can be filtered by it's genere, we can select multiple genre and get result based on it, for getting all genre result select all filter

3. Implemented Search Partially as current [TMDB Search API](https://developer.themoviedb.org/docs/search-and-query-for-details) provides limited paramates, Implemented search on fetched movie data it will search on movie title and description
