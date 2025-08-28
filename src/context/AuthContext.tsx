import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SignupData } from '../types/movie';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUserAvatar: (avatar: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login - accept any credentials
    if (username && password) {
      const newUser: User = {
        id: '1',
        username: username,
        email: `${username}@example.com`,
        name: username,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo signup - accept any valid data
    if (data.name && data.email && data.password && data.password === data.confirmPassword) {
      const newUser: User = {
        id: Date.now().toString(),
        username: data.name.toLowerCase().replace(/\s+/g, ''),
        email: data.email,
        name: data.name,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const updateUserAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, updateUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};