import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import styles from "./slider-arrow.module.css";

const SliderArrow = () => {
  return (
    <>
      <button className={`left-arrow ${styles["left-arrow"]}`}>
        <ChevronLeft size={24} />
      </button>
      <button className={`right-arrow ${styles["right-arrow"]}`}>
        <ChevronRight size={24} />
      </button>
    </>
  );
};

export default SliderArrow;
