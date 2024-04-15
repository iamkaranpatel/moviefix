"use client";
import React, { useEffect, useState } from "react";
import { getMovies } from "@/app/utils/endpoint";
import styles from "./movie-infinite-scroll.module.css";
import yearsArray from "@/app/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader";
import MovieListDetails from "../movie-list-details";
import { useMovieStore } from "@/app/store/movie-store";
import FilterSearch from "../filter-search";
import { MovieListType } from "@/app/utils/types";
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
    searchMovieList,
    setSearchMovieList,
  } = useMovieStore((state) => ({
    movieList: state.movieList,
    movieGenres: state.movieGenres,
    tabActive: state.tabActive,
    index: state.index,
    setMovieList: state.setMovieList,
    setIndex: state.setIndex,
    search: state.search,
    setSearchMovieList: state.setSearchMovieList,
    searchMovieList: state.searchMovieList,
  }));

  const [hasMore, setHasMore] = useState(true);
  const genreList = !tabActive.includes(0) ? tabActive : [];
  const [filteredData, setFilteredData] = useState(movieList);
  const [isMounted, setIsMounted] = useState(true);
  const [isError, setIsError] = useState<ErrorType>({
    error: null,
    message: "No Result Found",
  });

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieListByYear = await getMovies(yearsArray[0], genreList);
        const newDetails = genreList ? new Map() : new Map(movieList);
        newDetails.set(yearsArray[0], movieListByYear?.results);
        setMovieList(newDetails);
        setFilteredData(newDetails);
        setIsError({ error: false });
      } catch (error) {
        console.log("error", error);
        setIsError({
          error: true,
          message: "Something went wrong please try again",
        });
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
      setFilteredData(newDetails);
      filterBySearch(search, newDetails);

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

  const filterBySearch = (query: string, movieData: MovieListType) => {
    if (query.length > 0) {
      const searchFilterData = new Map(movieData);

      for (let [key, value] of searchFilterData) {
        const newVal = value.filter((movie) => {
          return movie.title.toLowerCase().includes(query.toLowerCase());
        });

        if (newVal.length > 0) {
          searchFilterData.set(key, newVal);
        } else {
          searchFilterData.delete(key);
        }
      }

      if ([...searchFilterData?.keys()].length === 0) {
        setIsError({ error: true, message: "No Result Found" });
      } else {
        setIsError({ error: false });
      }

      setFilteredData(searchFilterData);
      setSearchMovieList(searchFilterData);
      setHasMore(false);
    } else {
      setFilteredData(movieData);
      setHasMore(true);
      setIsError({ error: false });
    }
  };

  useEffect(() => {
    filterBySearch(search, movieList);
  }, [search]);

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
      {[...filteredData?.keys()].length > 0 && (
        <InfiniteScroll
          dataLength={[...filteredData?.keys()].length}
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
              {[...filteredData?.keys()].map((movieYear) => (
                <MovieListDetails
                  key={movieYear}
                  year={movieYear}
                  movieListData={filteredData.get(movieYear) || []}
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
