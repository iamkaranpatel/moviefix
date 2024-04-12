"use client";
import React, { useEffect, useState } from "react";
import { getAllMovieByYear } from "@/app/utils/endpoint";
import { MovieDetails, MovieGenre } from "@/app/utils/types";
import Image from "next/image";
import { Star } from "lucide-react";
import styles from "./movie-lising.module.css";
import yearsArray, { formatDate } from "@/app/utils/utils";

const MovieList = ({ movieGenres }: { movieGenres: MovieGenre[] }) => {
  const [movieList, setMovieList] = useState<[]>([]);
  

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieList = await getAllMovieByYear(2012);
        setMovieList(movieList?.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMovieByYear();
  }, []);
  return (
    <div className={styles["movie-list-section"]}>
      <div className="wrapper">
        <ul className={styles["movie-list-container"]}>
          {!!movieList &&
            movieList.map((details: MovieDetails) => {
              return (
                <li key={details?.id}>
                  <div className={styles["movie-poster"]}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE_URL}${details?.poster_path}`}
                      width={300}
                      height={400}
                      alt={details?.title}
                    />
                    <div className={styles["vote-details"]}>
                      <div className={styles["rating"]}>
                        <Star size={16} />
                        <span>{details.vote_average.toFixed(2)}</span>
                      </div>
                      {/* <span className={styles["vote-count"]}>({details.vote_count})</span> */}
                    </div>
                  </div>
                  <div className={styles["movie-info"]}>
                    <h2>{details.title}</h2>
                    <p>{details.overview}</p>
                    <div>
                      <span className={styles["release-date"]}>
                        Release Date:{" "}
                      </span>
                      <span>{formatDate(details.release_date)}</span>
                    </div>
                    <ul className={styles["genre-type"]}>
                      {details.genre_ids.map((id) => {
                        const genre = movieGenres.find((genre) => {
                          return genre.id === id && genre.name;
                        });
                        return genre && <li key={genre.id}>{genre.name}</li>;
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
