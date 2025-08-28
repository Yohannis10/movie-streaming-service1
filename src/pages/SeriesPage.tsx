import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { movieApi } from '../services/movieApi';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';

const SeriesPage: React.FC = () => {
  const [series, setSeries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // For demo purposes, we'll use trending movies as series
        const trending = await movieApi.getTrendingMovies();
        setSeries(trending.slice(0, 15));
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
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
        title="TV Series"
        movies={series}
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

export default SeriesPage;