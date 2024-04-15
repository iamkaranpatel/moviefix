import React from "react";
import style from "./skeleton.module.css"

const TabSkeleton = () => {
  return (
    <ul className={`${style["tab-skeleton"]}`}>
      {Array.from({ length: 35 }, (v, i) => (
        <li key={i} className={`${style["line"]} ${style["skeleton-gradient"]}`}></li>
      ))}
    </ul>
  );
};

export default TabSkeleton;
