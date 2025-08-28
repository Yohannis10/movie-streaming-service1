import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { movieApi } from '../services/movieApi';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, topRated] = await Promise.all([
          movieApi.getPopularMovies(),
          movieApi.getTopRatedMovies(),
        ]);

        // Combine and deduplicate movies
        const allMovies = [...popular, ...topRated];
        const uniqueMovies = allMovies.filter((movie, index, self) => 
          index === self.findIndex(m => m.id === movie.id)
        );

        setMovies(uniqueMovies);
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
        title="All Movies"
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

export default MoviesPage;