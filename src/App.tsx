import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import MoviesPage from './pages/MoviesPage';
import ComingSoonPage from './pages/ComingSoonPage';
import SeriesPage from './pages/SeriesPage';
import DocumentariesPage from './pages/DocumentariesPage';
import { movieApi } from './services/movieApi';
import { Movie } from './types/movie';

const MainApp: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await movieApi.searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const renderContent = () => {
    if (isSearching && searchResults.length > 0) {
      return (
        <div className="p-4 lg:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {searchResults.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">{movie.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'movies':
        return <MoviesPage />;
      case 'series':
        return <SeriesPage />;
      case 'documentaries':
        return <DocumentariesPage />;
      case 'coming-soon':
        return <ComingSoonPage />;
      default:
        return <HomePage />;
    }
  };

  if (!user) {
    return <LoginForm onSuccess={() => {}} />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <MainApp />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;