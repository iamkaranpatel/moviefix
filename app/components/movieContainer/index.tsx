"use client";
import React, { useEffect, useState } from "react";
import Filter from "../filter";
import { getAllMovieByYear, getAllMovieGenre } from "@/app/utils/endpoint";
import { MovieDetails, MovieGenre } from "@/app/utils/types";
import Image from "next/image";

const MovieContainer = () => {
  const [movieGenres, setMovieGenres] = useState<MovieGenre[]>([]);
  const [movieList, setMovieList] = useState<[]>([]);

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

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieList = await getAllMovieByYear(2012);
        console.log(movieList.results)
        // if (movieGenres?.genres?.length > 0) {
        //   setMovieGenres([{ id: 0, name: "All" }, ...movieGenres?.genres]);
        // }
        setMovieList(movieList?.results)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMovieByYear();
  }, []);

  return <div>
    <Filter movieGenres={movieGenres} />
    <ul>
    {
      !!movieList && movieList.map((details: MovieDetails) => {
        return <li key={details?.id}>
          <Image 
            src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL}${details?.poster_path}`}
            width={300}
            height={400}
            alt={details?.title}
          />
          <h2>{details.title}</h2>
        </li>
      })
    }
    </ul>
    </div>;
};

export default MovieContainer;
