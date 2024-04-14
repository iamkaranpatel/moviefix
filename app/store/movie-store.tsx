import { create } from "zustand";
import { MovieGenre, MovieListType } from "../utils/types";

interface MovieStoreState {
  movieGenres: MovieGenre[];
  movieList: MovieListType;
  tabActive: number[];
  index: number;
  search: string;
  searchMovieList: MovieListType;
  setMovieGenres: (detail: MovieGenre[]) => void;
  setTabActive: (tabs: number[]) => void;
  setMovieList: (movieDetails: MovieListType) => void;
  setIndex: (newIndex: number) => void;
  setSearch: (query: string) => void;
  setSearchMovieList: (movieDetails: MovieListType) => void;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
  movieGenres: [{ id: 0, name: "All" }],
  movieList: new Map(),
  tabActive: [0],
  index: 1,
  search: '',
  searchMovieList: new Map(),
  setMovieGenres: (genreData: MovieGenre[]) =>
    set(() => ({ movieGenres: [...genreData] })),
  setTabActive: (tabs) => set(() => ({ tabActive: [...tabs] })),
  setMovieList: (movieDetails) =>
    set(() => ({ movieList: movieDetails })),
  setIndex: (newIndex) => set(() => ({index: newIndex})),
  setSearch: (query) => set(() => ({search: query})),
  setSearchMovieList: (movieDetails) =>
    set(() => ({ searchMovieList: movieDetails })),
}));
