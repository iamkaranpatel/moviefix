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
  const [isError, setIsError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMovieByYear = async () => {
      try {
        const movieListByYear = await getMovies(yearsArray[0], genreList);
        const newDetails = genreList ? new Map() : new Map(movieList);
        newDetails.set(yearsArray[0], movieListByYear?.results);
        setMovieList(newDetails);
        setFilteredData(newDetails);
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
      setFilteredData(newDetails);
      filterBySearch(search, newDetails);

      index < yearsArray.length ? setHasMore(true) : setHasMore(false);
    } catch (error) {
      console.log("error", error);
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
        setIsError(true);
      }

      setFilteredData(searchFilterData);
      setSearchMovieList(searchFilterData);
      setHasMore(false);
    } else {
      setFilteredData(movieData);
      setHasMore(true);
    }
  };

  useEffect(() => {
    filterBySearch(search, movieList);
  }, [search]);

  if (isError)
    return <div className={styles["no-result"]}>No Result found</div>;

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
