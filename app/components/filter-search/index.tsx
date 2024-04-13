import React from 'react'
import styles from "./filter-search.module.css"
import { Search } from 'lucide-react'

const FilterSearch = () => {
  return (
    <form className={styles["filter-search-container"]}>
      <label htmlFor="search">
        <Search size={16} />
      </label>
      <input type="search" name="search" id="search" placeholder='Search' className={styles["filter-search"]} />
    </form>
  )
}

export default FilterSearch