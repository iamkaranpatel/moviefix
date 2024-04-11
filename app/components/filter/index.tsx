import { MovieGenre } from "@/app/utils/types";
import styles from "./filter.module.css";

export default function Filter({movieGenres}: {movieGenres: MovieGenre[]}) {
  
  return (
   <div className={styles.filter}>
    {
      !!movieGenres && movieGenres?.length > 0 && <ul>
        {
          movieGenres.map((genre) => {
            return <li key={genre.id}>
              <button>
                {genre.name}
              </button>
            </li>
          })
        }
      </ul>
    }
   </div>
  );
}
