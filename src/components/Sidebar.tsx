import React from 'react';
import { Home, Heart, Film, Calendar, Users, MessageCircle, Settings, LogOut, Play, Tv, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'favorites', label: 'Favourites', icon: Heart },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
    { id: 'documentaries', label: 'Documentaries', icon: FileText },
    { id: 'coming-soon', label: 'Coming soon', icon: Calendar },
  ];

  const bottomItems = [
    { id: 'community', label: 'Community', icon: Users },
    { id: 'social', label: 'Social', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  const handleItemClick = (id: string) => {
    if (id === 'logout') {
      logout();
    } else {
      onTabChange(id);
    }
  };

  return (
    <div className="w-16 lg:w-64 bg-gray-900 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2 justify-center lg:justify-start">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <Play className="w-5 h-5 text-gray-900" />
          </div>
          <span className="hidden lg:block text-white text-xl font-bold">WATCH</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-2 lg:px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden lg:block">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-800 py-4">
        <nav className="space-y-2 px-2 lg:px-4">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg text-left text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="hidden lg:block">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;