import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';
import { Movie } from '../types/movie';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);

  const handleWatchClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayerOpen(true);
  };

  if (favorites.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
          <p className="text-gray-400">Start adding movies to your favorites to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MovieGrid
        title="Favourites"
        movies={favorites}
        onWatchClick={handleWatchClick}
      />
      
      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        movieTitle={selectedMovie?.title || ''}
      />
    </div>
  );
};

export default FavoritesPage;