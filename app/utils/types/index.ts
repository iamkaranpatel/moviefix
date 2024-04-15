export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[]
  release_date: string
  vote_average: number
  vote_count: number
}

export type MovieListType = Map<number, MovieDetails[]> 

export interface GetMoviesParams {
  primary_release_year: number;
  sort_by: string;
  with_genres?: string;
  query?: string;
  "vote_count.gte"?: number
}