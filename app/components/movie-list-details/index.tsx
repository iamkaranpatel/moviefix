import { MovieDetails, MovieGenre } from "@/app/utils/types";
import React from "react";
import styles from "./movie-list-details.module.css";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatDate } from "@/app/utils/utils";

interface MovieListDetailsProps {
  year: number;
  movieListData: MovieDetails[] | [];
  movieGenres: MovieGenre[];
}
const MovieListDetails = ({
  year,
  movieListData,
  movieGenres,
}: MovieListDetailsProps) => {

  return (
    <div>
      <h2 className={styles["year-heading"]}>{year}</h2>
      <ul className={styles["movie-list-container"]}>
        {!!movieListData &&
          movieListData.map((details: MovieDetails) => {
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
                  <h3>{details.title}</h3>
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
  );
};

export default MovieListDetails;
