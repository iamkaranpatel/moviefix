"use client";
import React, { useEffect, useState } from "react";
import { getMovies, getSearchMovies } from "@/app/utils/endpoint";
import styles from "./movie-infinite-scroll.module.css";
import yearsArray from "@/app/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader";
import MovieListDetails from "../movie-list-details";
import { useMovieStore } from "@/app/store/movie-store";
import FilterSearch from "../filter-search";
import MovieCard from "../skeleton/movie-card";

interface ErrorType {
  error: boolean | null;
  message?: string;
}

const MovieList = () => {
  const {
    movieList,
    setMovieList,
    movieGenres,
    tabActive,
    setIndex,
    index,
    search,
  } = useMovieStore((state) => ({
    movieList: state.movieList,
    movieGenres: state.movieGenres,
    tabActive: state.tabActive,
    index: state.index,
    setMovieList: state.setMovieList,
    setIndex: state.setIndex,
    search: state.search,
  }));

  const [hasMore, setHasMore] = useState(true);
  const genreList = !tabActive.includes(0) ? tabActive : [];
  const [isMounted, setIsMounted] = useState(true);
  const [isError, setIsError] = useState<ErrorType>({
    error: null,
    message: "No Result Found",
  });

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieListByYear = search
          ? await getSearchMovies(yearsArray[0], genreList, search)
          : await getMovies(yearsArray[0], genreList);
        const newDetails = genreList ? new Map() : new Map(movieList);
        newDetails.set(yearsArray[0], movieListByYear?.results);
        setMovieList(newDetails);
        setIsError({ error: false });
        if (newDetails.get(2012)?.length === 0) {
          setHasMore(false);
          setIsError({ error: true, message: "No Result Found" });
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.log("error", error);
        setIsError({
          error: true,
          message: "Something went wrong please try again",
        });
      }
    };

    fetchMovieByYear();
  }, [tabActive, search]);

  const fetchMoreData = async () => {
    try {
      const movieListByYear = search
        ? await getSearchMovies(yearsArray[0], genreList, search)
        : await getMovies(yearsArray[0], genreList);
      const newDetails = new Map(movieList);
      newDetails.set(yearsArray[index], movieListByYear?.results);
      setMovieList(newDetails);
      index < yearsArray.length ? setHasMore(true) : setHasMore(false);
      setIsError({ error: false });
    } catch (error) {
      console.log("error", error);
      setIsError({
        error: true,
        message: "Something went wrong please try again",
      });
    } finally {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    setIsMounted(false);
  }, []);

  if (isMounted) {
    return <MovieCard />;
  }

  if (isError.error)
    return <div className={styles["no-result"]}>{isError.message}</div>;

  return (
    <>
      <div>
        <div className="wrapper">
          <FilterSearch className={styles["mobile-form"]} />
        </div>
      </div>
      {[...movieList?.keys()].length > 0 && (
        <InfiniteScroll
          dataLength={[...movieList?.keys()].length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div style={{ padding: "20px 0" }}>
              <Loader />
            </div>
          }
          style={{ overflow: "hidden" }}
        >
          <div className={styles["movie-list-section"]}>
            <div className={`wrapper ${styles["movie-list-details"]}`}>
              {[...movieList?.keys()].map((movieYear) => (
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
      )}
    </>
  );
};

export default MovieList;
