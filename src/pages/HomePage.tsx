import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { movieApi } from '../services/movieApi';
import HeroSection from '../components/HeroSection';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';

const HomePage: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, trending] = await Promise.all([
          movieApi.getPopularMovies(),
          movieApi.getTrendingMovies(),
        ]);

        setFeaturedMovie(trending[0]);
        setPopularMovies(popular.slice(0, 10));
        setContinueWatching(trending.slice(1, 6));
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

  const handleHeroWatchClick = () => {
    if (featuredMovie) {
      handleWatchClick(featuredMovie);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {featuredMovie && <HeroSection movie={featuredMovie} onWatchClick={handleHeroWatchClick} />}
      
      <MovieGrid
        title="Movies"
        movies={popularMovies}
        onWatchClick={handleWatchClick}
      />
      
      <MovieGrid
        title="Continue watching"
        movies={continueWatching}
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

export default HomePage;