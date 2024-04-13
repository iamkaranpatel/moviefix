"use client";
import React, { useEffect } from "react";
import Filter from "../filter";
import { getAllMovieGenre } from "@/app/utils/endpoint";
import MovieList from "../movieInfiniteScroll";
import { useMovieStore } from "@/app/store/movie-store";

const MovieContainer = () => {
  const { movieGenres, setMovieGenres } = useMovieStore((state) => ({
    movieGenres: state.movieGenres,
    setMovieGenres: state.setMovieGenres,
  }));

  useEffect(() => {
    const fetchGenere = async () => {
      try {
        const movieGenres = await getAllMovieGenre();

        if (movieGenres?.genres?.length > 0) {
          setMovieGenres([...movieGenres?.genres]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchGenere();
  }, []);

  return (
    <div>
      <Filter />
      <MovieList />
    </div>
  );
};

export default MovieContainer;
