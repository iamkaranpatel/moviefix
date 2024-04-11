"Use Client";

import { MovieGenre } from "@/app/utils/types";
import styles from "./filter.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SliderArrow from "../sliderArrow";
import { useState } from "react";

export default function Filter({ movieGenres }: { movieGenres: MovieGenre[] }) {
  const [tabActive, setTabActive] = useState<number[]>([0]);

  const handleTabActive = (id: number) => {
    if (id === 0) {
      setTabActive([0]);
    } else {
      let newTabs = tabActive.filter((tabId) => tabId !== 0);
      
      if (tabActive.includes(id)) {
        newTabs = tabActive.filter((tabId) => tabId !== id);
        setTabActive([...newTabs]);
      } else {
        newTabs = [...newTabs, id]
        setTabActive([...newTabs]);
      }

      newTabs.length === 0 && setTabActive([0]);
    }
  };

  return (
    <div className={`${styles.filter} swiper-container`}>
      {!!movieGenres && movieGenres?.length > 0 && (
        <>
          <Swiper
            className={styles["filter-container"]}
            slidesPerView={"auto"}
            touchEventsTarget="container"
            grabCursor={true}
            navigation={{
              nextEl: ".right-arrow",
              prevEl: ".left-arrow",
            }}
            modules={[Navigation]}
          >
            {movieGenres.map((genre) => {
              return (
                <SwiperSlide
                  key={genre.id}
                  className={`${styles["filter-slide"]} ${
                    tabActive.includes(genre.id)
                      ? styles["tab-active"]
                      : ""
                  }`}
                >
                  <button onClick={() => handleTabActive(genre.id)}>
                    {genre.name}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <SliderArrow />
        </>
      )}
    </div>
  );
}
