import axios from "axios";
import { GetMoviesParams } from "./types";

/**
 * create full API url
 * @param {string} endpoint - endpoint w/o '/'
 * @returns {string} - full api url
 */
const createApiEndpoint = (endpoint: string): string => {
  return `${endpoint}`;
};

// single source for Endpoints mapping
const endpoints = new Map([
  ["MovieGenere", createApiEndpoint("genre/movie/list")],
  ["DiscoverMovie", createApiEndpoint("discover/movie")],
  ["SearchMovie", createApiEndpoint("search/movie")],
]);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOVIE_API_URL,
  params: {
    "api_key": process.env.NEXT_PUBLIC_MOVIE_API_KEY,
  },
});

export const getAllMovieGenre = async () => {
  return (
    await api.get(endpoints.get("MovieGenere")!)
  ).data;
};

export const getMovies = async (year: number, genreTab: number[] = []) => {
  const params: GetMoviesParams = {
    'primary_release_year': year,
    "sort_by": "popularity.desc",
    "vote_average": 1.1
  }

  if(genreTab.length > 0) {
    params["with_genres"] = genreTab.join(" | ")
  }
  return (
    await api.get(endpoints.get("DiscoverMovie")!, {
      params: params
    })
  ).data;
};

export const getSearchMovies = async (year: number, genreTab: number[] = [], search: string) => {
  const params: GetMoviesParams = {
    query: search,
    'primary_release_year': year,
    "sort_by": "popularity.desc",
    "vote_average": 1.1
  }

  if(genreTab.length > 0) {
    params["with_genres"] = genreTab.join(" | ")
  }
  return (
    await api.get(endpoints.get("SearchMovie")!, {
      params: params
    })
  ).data;
};
