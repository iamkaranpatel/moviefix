"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./header.module.css";
import Filter from "../filter";
import FilterSearch from "../filter-search";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={`wrapper ${style["header-wrapper"]}`}>
        <div className={style["header-top"]}>
          <Link href="/" title="movieix">
            <Image width={124} height={34} src="/moviefix.svg" alt="moviefix" />
          </Link>
          <FilterSearch />
        </div>
        <Filter />
      </div>
    </header>
  );
};

export default Header;
