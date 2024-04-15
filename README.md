# Moviefix

Moviefix is a web application for listing Movie from 2012 to current year, built using [Next.js](https://nextjs.org/), [TMDB API](https://developer.themoviedb.org/reference/discover-movie) and Typescript.

## Getting Started

To run this project, ensure you have Node.js version 20 or higher installed.

After cloning the repository, navigate to its directory and install the dependencies using `npm install` command

Create a `.env` file containing below key and value details

1. **NEXT_PUBLIC_MOVIE_API_URL**=`https://api.themoviedb.org/3/` ( *For Movie API default URL* )
2. **NEXT_PUBLIC_MOVIE_IMAGE_URL**=`https://image.tmdb.org/t/p/original/` ( *For Movie Image Default URL* )
3. **NEXT_PUBLIC_MOVIE_API_KEY** ( *Assign TMDB API key to this variable* )

To run the development server use below command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

1. This project list 20 movies per year from 2012 to current year, As we scroll movie data will be fetched based on year

2. Users can filter movies by genre. Multiple genres can be selected, and selecting all genres will display all movies.

3. Search functionality is implemented using  [TMDB Search API](https://developer.themoviedb.org/docs/search-and-query-for-details).
<br />***Note:*** Above search API has a limitation, we can't club search API with genre filters
