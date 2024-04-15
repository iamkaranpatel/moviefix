import { MovieDetails, MovieGenre } from "@/app/utils/types";
import React from "react";
import styles from "./movie-list-details.module.css";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatDate } from "@/app/utils/utils";
import { Libre_Baskerville } from "next/font/google";
import { useMovieStore } from "@/app/store/movie-store";

interface MovieListDetailsProps {
  year: number;
  movieListData: MovieDetails[] | [];
  movieGenres: MovieGenre[];
}
const libre = Libre_Baskerville({ weight: ["400", "700"], subsets: ["latin"] });

const MovieListDetails = ({
  year,
  movieListData,
  movieGenres,
}: MovieListDetailsProps) => {
  const {} = useMovieStore((state) => ({ search: state.search }));
  return (
    <div className={styles["movie-year-list"]}>
      {!!movieListData && movieListData.length > 0 && (
        <h2 className={`${styles["year-heading"]} ${libre.className}`}>
          {year}
        </h2>
      )}
      <ul className={styles["movie-list-container"]}>
        {!!movieListData &&
          movieListData.length > 0 &&
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
                  </div>
                </div>
                <div className={styles["movie-info"]}>
                  <h3>{details.title}</h3>
                  <p>{details.overview}</p>
                  <div>
                    <span className={styles["release-date-label"]}>
                      Release Date:{" "}
                    </span>
                    <span className={styles["release-date"]}>
                      {formatDate(details.release_date)}
                    </span>
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
