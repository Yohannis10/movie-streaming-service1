import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Movie } from '../types/movie';
import { getBackdropUrl } from '../services/movieApi';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  movie: Movie;
  onWatchClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie, onWatchClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
      <img
        src={getBackdropUrl(movie.backdrop_path)}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 lg:px-8 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {movie.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 mb-2 text-sm md:text-base"
          >
            {new Date(movie.release_date).getFullYear()} | Comedy horror | 1 Season
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6"
          >
            <button 
              onClick={onWatchClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Watch now</span>
            </button>
            
            <button
              onClick={handleFavoriteClick}
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center"
            >
              <Heart
                className={`w-5 h-5 ${
                  isMovieFavorite ? 'fill-purple-500 text-purple-500' : 'text-white'
                }`}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;