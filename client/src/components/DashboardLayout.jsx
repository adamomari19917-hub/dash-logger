import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Home, 
  Settings, 
  MessageSquare, 
  Activity, 
  Users, 
  Shield, 
  ChevronDown,
  Server,
  LogOut
} from 'lucide-react';
import GridBackground from './GridBackground';
import Navbar from './Navbar';

const DashboardContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const MainLayout = styled.div`
  display: flex;
  padding-top: 80px;
  min-height: calc(100vh - 80px);
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
`;

const ContentHeader = styled.div`
  margin-bottom: 2rem;
`;

const ContentTitle = styled.h1`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const ContentSubtitle = styled.p`
  color: #b9bbbe;
  font-size: 0.9rem;
  margin: 0;
`;

const LoggingCard = styled.div`
  background: rgba(31, 41, 55, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  min-height: 70vh;
`;

const CardHeader = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.75rem;
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border-radius: 10px;
  margin: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px) saturate(180%);
    -webkit-backdrop-filter: blur(15px) saturate(180%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const CardAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: #6b7280;
`;

const CardHeaderContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h2`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 0.6rem 0;
`;

const CardSubtitle = styled.p`
  color: #b9bbbe;
  font-size: 1rem;
  margin: 0;
`;

const DashboardLayout = ({ user, onLogin, onLogout, children, currentPage = 'logging' }) => {
  const navigate = useNavigate();
  const { serverId: pathServerId } = useParams();
  const location = useLocation();
  const [selectedServer, setSelectedServer] = useState(null);
  const [botData, setBotData] = useState(null);
  
  // Get serverId from query parameters (?server=123) or URL path (/dashboard/123)
  const getServerId = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('server') || pathServerId;
  };
  
  const serverId = getServerId();

  useEffect(() => {
    // Fetch bot data
    const fetchBotData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/bot/status`);
        if (response.ok) {
          const data = await response.json();
          setBotData(data);
        }
      } catch (error) {
        console.error('Error fetching bot data:', error);
      }
    };

    fetchBotData();
  }, []);
  
  useEffect(() => {
    const fetchServerInfo = async () => {
      if (!serverId) {
        setSelectedServer(null);
        return;
      }
      
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3001/api/servers/${serverId}/info`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.server) {
            setSelectedServer(data.server);
          }
        } else {
          console.error('Failed to fetch server info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching server info:', error);
      }
    };
    
    fetchServerInfo();
  }, [serverId]);

  return (
    <DashboardContainer>
      <GridBackground />
      
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />

      <MainLayout>
        <MainContent>

          {currentPage === 'logging' && (
            <LoggingCard>
              <CardHeader>
                <CardHeaderLeft>
                  <CardAvatar>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundImage: `url(https://cdn.discordapp.com/avatars/1366203418653229247/5740d47f3dcce9963c1e335cb566c067.png?size=1024)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  </CardAvatar>
                  <CardHeaderContent>
                    <CardTitle>
                      {botData?.name ? `${botData.name} - Log all actions happening in this server.` : 'Log all actions happening in this server.'}
                    </CardTitle>
                    <CardSubtitle>Click on a category's name to see all its log types.</CardSubtitle>
                  </CardHeaderContent>
                </CardHeaderLeft>
              </CardHeader>
              
              {children}
            </LoggingCard>
          )}

          {currentPage === 'commands' && (
            <LoggingCard>
              <CardHeader>
                <CardHeaderLeft>
                  <CardAvatar>
                    <MessageSquare size={24} />
                  </CardAvatar>
                  <CardHeaderContent>
                    <CardTitle>Bot Commands</CardTitle>
                    <CardSubtitle>Available commands for your server</CardSubtitle>
                  </CardHeaderContent>
                </CardHeaderLeft>
              </CardHeader>
              
              {children}
            </LoggingCard>
          )}

          {currentPage === 'home' && children}
        </MainContent>
      </MainLayout>
    </DashboardContainer>
  );
};

export default DashboardLayout;
