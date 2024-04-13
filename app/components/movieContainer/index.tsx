"use client";
import React, { useEffect } from "react";
import Filter from "../filter";
import { getAllMovieGenre } from "@/app/utils/endpoint";
import MovieList from "../movieInfiniteScroll";
import { useMovieStore } from "@/app/store/movie-store";

const MovieContainer = () => {
  const { setMovieGenres } = useMovieStore((state) => ({
    setMovieGenres: state.setMovieGenres,
  }));

  useEffect(() => {
    const fetchGenere = async () => {
      try {
        const allMovieGenres = await getAllMovieGenre();

        if (allMovieGenres?.genres?.length > 0) {
          setMovieGenres([{ id: 0, name: "All" }, ...allMovieGenres?.genres]);
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
