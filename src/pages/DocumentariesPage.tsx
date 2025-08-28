import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { movieApi } from '../services/movieApi';
import MovieGrid from '../components/MovieGrid';
import VideoPlayer from '../components/VideoPlayer';

const DocumentariesPage: React.FC = () => {
  const [documentaries, setDocumentaries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchDocumentaries = async () => {
      try {
        // For demo purposes, we'll use top rated movies as documentaries
        const topRated = await movieApi.getTopRatedMovies();
        setDocumentaries(topRated.slice(5, 20));
      } catch (error) {
        console.error('Error fetching documentaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentaries();
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
        title="Documentaries"
        movies={documentaries}
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

export default DocumentariesPage;