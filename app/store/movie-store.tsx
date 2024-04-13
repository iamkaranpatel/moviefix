import { create } from "zustand";
import { MovieGenre, MovieListType } from "../utils/types";

interface MovieStoreState {
  movieGenres: MovieGenre[];
  movieList: MovieListType;
  tabActive: number[];
  setMovieGenres: (detail: MovieGenre[]) => void;
  setTabActive: (tabs: number[]) => void;
  setMovieList: (movieDetails: MovieListType) => void;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
  movieGenres: [{ id: 0, name: "All" }],
  movieList: new Map(),
  tabActive: [0],
  setMovieGenres: (genreData: MovieGenre[]) =>
    set((state) => ({ movieGenres: [...state.movieGenres, ...genreData] })),
  setTabActive: (tabs: number[]) => set((state) => ({ tabActive: [...tabs] })),
  setMovieList: (movieDetails: MovieListType) =>
    set(() => ({ movieList: movieDetails })),
}));
