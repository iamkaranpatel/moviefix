"use client";

import React, { useEffect, useState } from "react";
import styles from "./filter-search.module.css";
import { Search } from "lucide-react";
import { useMovieStore } from "@/app/store/movie-store";

const FilterSearch = ({ className }: { className?: string }) => {
  const { search, setSearch, setTabActive } = useMovieStore((state) => ({
    search: state.search,
    setSearch: state.setSearch,
    setTabActive: state.setTabActive,
  }));

  const [query, setQuery] = useState(search);

  const UpdateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(query);
      setTabActive([0]);
      typeof window !== "undefined" && window.scrollTo(0, 0);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <form className={`${styles["filter-search-container"]} ${className || ""}`}>
      <label htmlFor="search">
        <Search size={16} />
      </label>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        className={styles["filter-search"]}
        onChange={UpdateQuery}
        value={query}
      />
    </form>
  );
};

export default FilterSearch;
