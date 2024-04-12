"use client";
import React, { useEffect, useState } from "react";
import Filter from "../filter";
import { getAllMovieGenre } from "@/app/utils/endpoint";
import { MovieGenre } from "@/app/utils/types";
import MovieList from "../movieList/movie-list";

const MovieContainer = () => {
  const [movieGenres, setMovieGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const fetchGenere = async () => {
      try {
        const movieGenres = await getAllMovieGenre();

        if (movieGenres?.genres?.length > 0) {
          setMovieGenres([{ id: 0, name: "All" }, ...movieGenres?.genres]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchGenere();
  }, []);

  return (
    <div>
      <Filter movieGenres={movieGenres} />
      <MovieList movieGenres={movieGenres} />
    </div>
  );
};

export default MovieContainer;
