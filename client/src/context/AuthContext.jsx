import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userGuilds, setUserGuilds] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('discordUser');
    const guildsData = localStorage.getItem('userGuilds');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        if (guildsData) {
          const parsedGuilds = JSON.parse(guildsData);
          setUserGuilds(parsedGuilds);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('discordUser');
        localStorage.removeItem('userGuilds');
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, guildsData = []) => {
    setUser(userData);
    setUserGuilds(guildsData);
    
    // Store in localStorage
    localStorage.setItem('discordUser', JSON.stringify(userData));
    if (guildsData.length > 0) {
      localStorage.setItem('userGuilds', JSON.stringify(guildsData));
    }
  };

  const logout = () => {
    setUser(null);
    setUserGuilds([]);
    
    // Clear localStorage
    localStorage.removeItem('discordUser');
    localStorage.removeItem('userGuilds');
  };

  const updateGuilds = (guildsData) => {
    setUserGuilds(guildsData);
    localStorage.setItem('userGuilds', JSON.stringify(guildsData));
  };

  const value = {
    user,
    userGuilds,
    loading,
    login,
    logout,
    updateGuilds,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
