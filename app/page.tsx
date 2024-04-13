"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { useMovieStore } from "./store/movie-store";
import { getAllMovieGenre } from "./utils/endpoint";
import MovieList from "./components/movieInfiniteScroll";

export default function Home() {
  const { setMovieGenres } = useMovieStore((state) => ({
    setMovieGenres: state.setMovieGenres,
  }));

  useEffect(() => {
    const fetchGenere = async () => {
      try {
        const allMovieGenres = await getAllMovieGenre();

        if (allMovieGenres?.genres?.length > 0) {
          setMovieGenres([{ id: 0, name: "All" }, ...allMovieGenres?.genres]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchGenere();
  }, []);
  return (
    <main className={styles.main}>
      <MovieList />

    </main>
  );
}
