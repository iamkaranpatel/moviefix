import React from "react";
import style from "./skeleton.module.css"

const MovieCard = () => {
  return (
    <div className={style["skeleton-movie-continer"]}>
      <div className="wrapper">
        <div className={`${style["skeleton-heading"]} ${style["skeleton-gradient"]}`}></div>
        <ul className={style["skeleton-movie-list"]}>
          {Array.from({ length: 6 }, (v, i) => (
            <li key={i} className={style["skeleton-movie-card"]}>
              <div className={`${style["skeleton-image"]} ${style["skeleton-gradient"]}`}></div>
              <div className={style["skeleton-details"]}>
                <div className={`${style["skeleton-heading"]} ${style["skeleton-gradient"]}`}></div>
                <div className={`${style["h12"]} ${style["h150"]} ${style["skeleton-gradient"]}`}></div>
                <div className={`${style["h8"]} ${style["h75"]} ${style["skeleton-gradient"]}`}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieCard;
