"use client";

import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import style from "./back-to-top.module.css";

const BackToTop = () => {
  const [scrollVisible, setScrollVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 300) {
      setScrollVisible(true);
    } else {
      setScrollVisible(false);
    }
  };

  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={scrollToTop}
      className={`${style["back-to-top"]} ${scrollVisible ? style.active : ""}`}
    >
      <ArrowUp className="text-background" />
    </button>
  );
};

export default BackToTop;
