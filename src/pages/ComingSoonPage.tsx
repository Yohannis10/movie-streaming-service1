import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { movieApi } from '../services/movieApi';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';

const ComingSoonPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // For demo purposes, we'll use upcoming movies from the API
        const upcoming = await movieApi.getTrendingMovies();
        setMovies(upcoming.slice(10, 20)); // Get different movies for "coming soon"
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleWatchClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <MovieGrid
        title="Coming Soon"
        movies={movies}
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

export default ComingSoonPage;