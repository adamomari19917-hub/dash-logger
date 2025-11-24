import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Home from './pages/Home';
import About from './pages/About';
import Status from './pages/Status';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Dashboard from './pages/Dashboard';
import ServerSelect from './pages/ServerSelect';
import AuthCallback from './pages/AuthCallback';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const simplePageTransition = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
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
  
  html {
    background-color: #2d3748;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  
  html::-webkit-scrollbar {
    display: none; /* WebKit */
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #2d3748;
    color: #ffffff;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  
  body::-webkit-scrollbar {
    display: none; /* WebKit */
  }
  
  /* Disable image saving and right-click */
  img {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: #2d3748;
`;

const PageWrapper = styled.div`
  animation: ${simplePageTransition} 0.3s ease-out;
  animation-fill-mode: both;
`;


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [botData, setBotData] = useState(null);

  // Function to fetch bot data
  const fetchBotData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bot/status`);
      if (response.ok) {
        const data = await response.json();
        setBotData(data);
        console.log('✅ Bot data fetched:', data);
      }
    } catch (error) {
      console.error('❌ Error fetching bot data:', error);
    }
  };

  // Function to refresh user data from Discord
  const refreshUserData = async () => {
    const accessToken = localStorage.getItem('discordAccessToken');
    const authToken = localStorage.getItem('authToken');

    if (!accessToken || !authToken) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/refresh-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with fresh user data
        localStorage.setItem('discordUser', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        console.log('✅ User data refreshed successfully');
      } else if (data.needsReauth) {
        console.log('🔄 Access token expired, user needs to re-authenticate');
        // Don't automatically log out, just skip the refresh
      }
    } catch (error) {
      console.error('❌ Failed to refresh user data:', error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('discordUser');
    const userToken = localStorage.getItem('authToken');

    if (userData && userToken) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('discordUser');
        localStorage.removeItem('authToken');
      }
    }

    // Set up periodic user data refresh (every 2 minutes)
    const refreshInterval = setInterval(() => {
      if (localStorage.getItem('discordUser') && localStorage.getItem('discordAccessToken')) {
        refreshUserData();
      }
    }, 2 * 60 * 1000); // 2 minutes

    // Initial refresh after 10 seconds if user is logged in
    const initialRefreshTimeout = setTimeout(() => {
      if (localStorage.getItem('discordUser') && localStorage.getItem('discordAccessToken')) {
        refreshUserData();
      }
    }, 10000);

    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'DISCORD_AUTH_SUCCESS') {
        const { user, token, guilds, accessToken, refreshToken } = event.data;
        localStorage.setItem('discordUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        if (accessToken) {
          localStorage.setItem('discordAccessToken', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('discordRefreshToken', refreshToken);
        }
        if (guilds) {
          localStorage.setItem('userGuilds', JSON.stringify(guilds));
        }
        setUser(user);
        console.log('Login successful!');
      } else if (event.data.type === 'DISCORD_AUTH_CODE') {
        console.log('Processing auth code in main window...');
        handleAuthCode(event.data.code);
      } else if (event.data.type === 'DISCORD_AUTH_ERROR') {
        console.error('Login failed:', event.data.error);
        if (!user) {
          alert('Login failed: ' + event.data.error);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      clearInterval(refreshInterval);
      clearTimeout(initialRefreshTimeout);
      window.removeEventListener('message', handleMessage);
    };
  }, [user]);

  const handleAuthCode = async (code) => {
    try {
      console.log('📡 Processing auth code in main window...');

      const response = await fetch(`${API_URL}/api/auth/discord/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('discordUser', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        if (data.accessToken) {
          localStorage.setItem('discordAccessToken', data.accessToken);
        }
        if (data.refreshToken) {
          localStorage.setItem('discordRefreshToken', data.refreshToken);
        }
        if (data.guilds) {
          localStorage.setItem('userGuilds', JSON.stringify(data.guilds));
        }
        setUser(data.user);
        console.log(' Login successful via main window!');
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error(' Auth code processing failed:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogin = () => {
    localStorage.removeItem('processedCodes');
    localStorage.removeItem('discordUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('discordAccessToken');
    localStorage.removeItem('discordRefreshToken');
    localStorage.removeItem('userGuilds');
    sessionStorage.clear();

    const clientId = '1421528633289216093';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const scope = 'identify email guilds';
    const state = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2, 15);
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&prompt=consent&t=${timestamp}&nonce=${nonce}`;
    const width = 800;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    console.log('Starting fresh login flow...');

    const windowName = `DiscordLogin_${timestamp}_${nonce}`;
    const popup = window.open(
      discordAuthUrl,
      windowName,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,location=no,menubar=no,toolbar=no`
    );

    if (!popup) {
      alert('Popup blocked! Please allow popups for this site and try again.');
    } else {
      popup.focus();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('discordUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('discordAccessToken');
    localStorage.removeItem('discordRefreshToken');
    localStorage.removeItem('userGuilds');
    setUser(null);
  };

  return (
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
            path="/home"
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
            path="/status"
            element={
              <PageWrapper>
                <Status user={user} onLogin={handleLogin} onLogout={handleLogout} />
              </PageWrapper>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageWrapper>
                <Privacy user={user} onLogin={handleLogin} onLogout={handleLogout} />
              </PageWrapper>
            }
          />
          <Route
            path="/terms"
            element={
              <PageWrapper>
                <Terms user={user} onLogin={handleLogin} onLogout={handleLogout} />
              </PageWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageWrapper>
                <Dashboard user={user} onLogin={handleLogin} onLogout={handleLogout} />
              </PageWrapper>
            }
          />
          <Route
            path="/servers"
            element={
              <PageWrapper>
                <ServerSelect user={user} onLogin={handleLogin} onLogout={handleLogout} />
              </PageWrapper>
            }
          />
          <Route
            path="/auth/callback"
            element={<AuthCallback />}
          />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
