import axios from 'axios';
import { Movie, MovieDetails, Genre } from '../types/movie';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Demo API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieApi = {
  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await api.get('/movie/popular');
    return response.data.results;
  },

  getTrendingMovies: async (): Promise<Movie[]> => {
    const response = await api.get('/trending/movie/week');
    return response.data.results;
  },

  getTopRatedMovies: async (): Promise<Movie[]> => {
    const response = await api.get('/movie/top_rated');
    return response.data.results;
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await api.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  },
};

export const getImageUrl = (path: string): string => {
  return `${IMAGE_BASE_URL}${path}`;
};

export const getBackdropUrl = (path: string): string => {
  return `${BACKDROP_BASE_URL}${path}`;
};