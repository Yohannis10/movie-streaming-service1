import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  onWatchClick?: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ title, movies, onMovieClick, onWatchClick }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MovieCard
              movie={movie}
              onClick={() => onMovieClick?.(movie)}
              onWatchClick={() => onWatchClick?.(movie)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;