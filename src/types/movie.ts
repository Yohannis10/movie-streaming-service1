export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string;
  }[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  name?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}