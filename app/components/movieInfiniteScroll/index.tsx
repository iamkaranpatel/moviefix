"use client";
import React, { useEffect, useState } from "react";
import { getAllMovieByYear } from "@/app/utils/endpoint";
import styles from "./movie-infinite-scroll.module.css";
import yearsArray from "@/app/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader";
import MovieListDetails from "../movie-list-details";
import { useMovieStore } from "@/app/store/movie-store";

const MovieList = () => {
  const { movieList, setMovieList, movieGenres } = useMovieStore((state) => ({
    movieList: state.movieList,
    movieGenres: state.movieGenres,
    setMovieList: state.setMovieList,
  }));

  const [index, setIndex] = useState(1);
  const [year, setYear] = useState(yearsArray[0]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieListByYear = await getAllMovieByYear(year);
        const newDetails = new Map(movieList);
        newDetails.set(year, movieListByYear?.results);
        setMovieList(newDetails);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMovieByYear();
  }, []);

  const fetchMoreData = async () => {
    console.log(yearsArray[index])
    try {
      const movieListByYear = await getAllMovieByYear(yearsArray[index]);
      const newDetails = new Map(movieList);
      newDetails.set(yearsArray[index], movieListByYear?.results);
      setMovieList(newDetails);

      index < yearsArray.length ? setHasMore(true) : setHasMore(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={[...movieList?.keys()].length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={"loading"}
    >
      <div className={styles["movie-list-section"]}>
        <div className={`wrapper ${styles["movie-list-details"]}`}>
          {[...movieList?.keys()].length > 0 &&
            [...movieList?.keys()].map((movieYear) => (
              <MovieListDetails
                key={movieYear}
                year={movieYear}
                movieListData={movieList.get(movieYear) || []}
                movieGenres={movieGenres}
              />
            ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default MovieList;
