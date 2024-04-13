"use client";
import React, { useEffect, useState } from "react";
import { getMovies } from "@/app/utils/endpoint";
import styles from "./movie-infinite-scroll.module.css";
import yearsArray from "@/app/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader";
import MovieListDetails from "../movie-list-details";
import { useMovieStore } from "@/app/store/movie-store";

const MovieList = () => {
  const { movieList, setMovieList, movieGenres, tabActive, setIndex, index } = useMovieStore((state) => ({
    movieList: state.movieList,
    movieGenres: state.movieGenres,
    tabActive: state.tabActive,
    index: state.index,
    setMovieList: state.setMovieList,
    setIndex: state.setIndex,
  }));

  const [year, setYear] = useState(yearsArray[0]);
  const [hasMore, setHasMore] = useState(true);
  const genreList = !tabActive.includes(0) ? tabActive : [];

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieListByYear = await getMovies(year, genreList);
        const newDetails = genreList ? new Map() : new Map(movieList);
        newDetails.set(year, movieListByYear?.results);
        setMovieList(newDetails);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchMovieByYear();
  }, [tabActive]);

  const fetchMoreData = async () => {
    try {
      const movieListByYear = await getMovies(yearsArray[index], genreList);
      const newDetails = new Map(movieList);
      newDetails.set(yearsArray[index], movieListByYear?.results);
      setMovieList(newDetails);

      index < yearsArray.length ? setHasMore(true) : setHasMore(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIndex( index + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={[...movieList?.keys()].length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<div style={{padding: '20px 0'}}><Loader /></div>}
      style={{overflow: "hidden"}}
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
