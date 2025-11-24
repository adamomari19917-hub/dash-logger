import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { AuthProvider } from './AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import ServerSelector from './pages/ServerSelector';

const pageTransition = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgba(107, 114, 128, 0.1);
    color: #ffffff;
    overflow-x: hidden;
  }
  
  html {
    scroll-behavior: auto;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: #0a0a0a;
`;

const PageWrapper = styled.div`
  animation: ${pageTransition} 0.4s ease-out;
  animation-fill-mode: both;
`;

// Component to handle scroll reset on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll reset without animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [pathname]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);

  // Check for stored user data on app load
  useEffect(() => {
    const userData = localStorage.getItem('discordUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('discordUser');
      }
    }
  }, []);

  const handleLogin = () => {
    const clientId = '1421528633289216093';
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const scope = 'identify email guilds';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=consent`;
    
    const width = 800;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      discordAuthUrl,
      'Discord Login',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('discordUser');
    localStorage.removeItem('userGuilds');
    setUser(null);
  };

  return (
    <AuthProvider>
      <AppContainer>
        <GlobalStyle />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route 
              path="/" 
              element={
                <PageWrapper>
                  <Home user={user} onLogin={handleLogin} onLogout={handleLogout} />
                </PageWrapper>
              } 
            />
            <Route 
              path="/about" 
              element={
                <PageWrapper>
                  <About user={user} onLogin={handleLogin} onLogout={handleLogout} />
                </PageWrapper>
              } 
            />
            <Route 
              path="/logs" 
              element={
                <PageWrapper>
                  <Logs user={user} onLogin={handleLogin} onLogout={handleLogout} />
                </PageWrapper>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PageWrapper>
                  <Settings user={user} onLogin={handleLogin} onLogout={handleLogout} />
                </PageWrapper>
              } 
            />
            <Route 
              path="/server-selector" 
              element={
                <PageWrapper>
                  <ServerSelector user={user} onLogin={handleLogin} onLogout={handleLogout} />
                </PageWrapper>
              } 
            />
          </Routes>
        </Router>
      </AppContainer>
    </AuthProvider>
  );
}

export default App;
