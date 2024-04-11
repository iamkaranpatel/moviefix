import axios from "axios";

/**
 * create full API url
 * @param {string} endpoint - endpoint w/o '/'
 * @returns {string} - full api url
 */
const createApiEndpoint = (endpoint: string): string => {
  return `${endpoint}`;
};

// single source for Endpoints mapping
const endpoints = new Map([["MovieGenere", createApiEndpoint("genre/movie/list")]]);

export const api = axios.create({
  baseURL: process.env.NEXT_MOVIE_API_URL,
  params: {
    "api_key": process.env.NEXT_MOVIE_API_KEY,
  },
  // withCredentials: true,
});

export const getAllMovieGenere = async () => {
  return (
    await api.get(endpoints.get("MovieGenere")!)
  ).data;
};
