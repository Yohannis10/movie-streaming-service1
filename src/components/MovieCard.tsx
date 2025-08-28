import React from 'react';
import { Heart, Play } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/movieApi';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  onWatchClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onWatchClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWatchClick?.();
  };

  const getGenreText = () => {
    const year = new Date(movie.release_date).getFullYear();
    return `${year} | Action comedy`; // Simplified for demo
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Watch Button - appears on hover */}
        <button
          onClick={handleWatchClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-700"
        >
          <Play className="w-6 h-6 text-white ml-1" />
        </button>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <Heart
            className={`w-5 h-5 ${
              isMovieFavorite ? 'fill-purple-500 text-purple-500' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{getGenreText()}</p>
      </div>
    </motion.div>
  );
};

export default MovieCard;