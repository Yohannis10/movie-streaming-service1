import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8">
          <button className="text-white font-medium">Movies</button>
          <button className="text-gray-400 hover:text-white transition-colors">Series</button>
          <button className="text-gray-400 hover:text-white transition-colors">Documentaries</button>
        </nav>

        {/* Search and User */}
        <div className="flex items-center space-x-2 lg:space-x-6">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            <Search className="w-6 h-6" />
          </button>
          
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none w-48 lg:w-64"
            />
          </form>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-2 lg:space-x-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
              alt={user?.username}
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden lg:block text-white font-medium">{user?.username}</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;