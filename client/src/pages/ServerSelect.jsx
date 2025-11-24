import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GridBackground from '../components/GridBackground';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ServerSelectContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 1rem 2rem;
    max-width: 500px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #b9bbbe;
  font-size: 1rem;
  margin: 0;
`;

const ServerListContainer = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  max-height: 500px;
  display: flex;
  flex-direction: column;
`;

const ServerListHeader = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #374151;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServerListTitle = styled.h3`
  color: #8e9297;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0;
`;

const SyncButton = styled.button`
  background: #6b7280;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: #9ca3af;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #4f545c;
    cursor: not-allowed;
    transform: none;
  }
`;


const ServerListScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
  padding-right: 0.5rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const ServerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.5rem;
`;

const ServerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  background: transparent;
  opacity: ${props => props.hasBot ? 1 : 0.4};
  
  &:hover {
    background: rgba(55, 65, 81, 0.5);
    opacity: ${props => props.hasBot ? 1 : 0.6};
  }
  
  ${props => props.selected && `
    background: #5865f2;
    opacity: 1;
    
    &:hover {
      background: #4752c4;
      opacity: 1;
    }
  `}
`;

const ServerIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #2d3748;
  font-size: 1.5rem;
  margin-right: 1rem;
  position: relative;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #2f3136;
  background: ${props => props.online ? '#3ba55c' : '#747f8d'};
`;

const ServerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ServerName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const ServerStatus = styled.p`
  font-size: 0.875rem;
  color: ${props => props.online ? '#3ba55c' : '#8e9297'};
  margin: 0;
  font-weight: 400;
`;

const ServerArrow = styled.div`
  color: #72767d;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.15s ease;
  
  ${ServerItem}:hover & {
    opacity: 1;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 1rem;
  padding: 2rem;
`;

const NoServerCard = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  text-align: center;
`;

const NoServerTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.75rem 0;
`;

const NoServerDescription = styled.p`
  color: #9ca3af;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
`;

const botInviteLink = "https://discord.com/oauth2/authorize?client_id=1421528633289216093&permissions=8&integration_type=0&scope=bot";

const ServerSelect = ({ user, onLogin, onLogout }) => {
  const [userServers, setUserServers] = useState([]);
  const [botServers, setBotServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchUserServers();
    fetchBotServers();
  }, [user]);

  const fetchUserServers = async () => {
    try {
      const storedGuilds = localStorage.getItem('userGuilds');

      if (storedGuilds && storedGuilds !== 'undefined' && storedGuilds !== 'null') {
        try {
          const guilds = JSON.parse(storedGuilds);

          if (Array.isArray(guilds) && guilds.length > 0) {
            const serversWithInvitePermission = guilds.filter(guild =>
              guild.owner || (parseInt(guild.permissions) & 0x20) === 0x20
            );
            setUserServers(serversWithInvitePermission);
            return;
          }
        } catch (parseError) {
          console.error('Error parsing stored guilds:', parseError);
        }
      }

      setUserServers([]);

    } catch (err) {
      console.error('Error fetching user servers:', err);
      setUserServers([]);
    }
  };

  const fetchBotServers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/bot-servers`);
      if (!response.ok) {
        throw new Error('Failed to fetch bot servers');
      }

      const data = await response.json();
      setBotServers(data.guilds || []);
    } catch (err) {
      console.error('Error fetching bot servers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getServerIcon = (server) => {
    if (server.icon) {
      return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
    }
    return null;
  };

  const isBotInServer = (serverId) => {
    return botServers.some(botServer => botServer.id === serverId);
  };

  const handleServerSelect = (server) => {
    const hasBot = isBotInServer(server.id);

    if (hasBot) {
      window.location.href = `/dashboard?server=${server.id}`;
    } else {
      window.open(`${botInviteLink}&guild_id=${server.id}`, '_blank');
    }
  };

  const handleSyncServers = async () => {
    if (!user) return;

    setSyncing(true);
    try {
      // Refresh user data from Discord API
      const authToken = localStorage.getItem('authToken');
      const discordAccessToken = localStorage.getItem('discordAccessToken');

      if (discordAccessToken) {
        const response = await fetch(`${API_URL}/api/auth/refresh-user`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ discordAccessToken })
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.guilds) {
            localStorage.setItem('userGuilds', JSON.stringify(userData.guilds));
          }
        }
      }

      // Refresh both user and bot servers
      await Promise.all([
        fetchUserServers(),
        fetchBotServers()
      ]);
    } catch (error) {
      console.error('Error syncing servers:', error);
    } finally {
      setSyncing(false);
    }
  };


  return (
    <ServerSelectContainer>
      <GridBackground />
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />

      <MainContent>
        <PageHeader>
          <PageTitle>Select a Server</PageTitle>
          <PageSubtitle>
            Choose a Discord server to access Logger Bot dashboard or invite the bot
          </PageSubtitle>
        </PageHeader>

        <ServerListContainer>
          <ServerListHeader>
            <ServerListTitle>Choose a Discord server to access Logger Bot dashboard or invite Me</ServerListTitle>
            {user && (
              <SyncButton onClick={handleSyncServers} disabled={syncing}>
                {syncing ? 'Syncing...' : 'Sync Servers'}
              </SyncButton>
            )}
          </ServerListHeader>

          {loading ? (
            <LoadingMessage>Loading your servers...</LoadingMessage>
          ) : !user ? (
            <NoServerCard>
              <NoServerTitle>Login Required</NoServerTitle>
              <NoServerDescription>
                Please login with Discord to view your servers.
              </NoServerDescription>
            </NoServerCard>
          ) : userServers.length === 0 ? (
            <NoServerCard>
              <NoServerTitle>No Server Access</NoServerTitle>
              <NoServerDescription>
                You don't have any Discord servers with manage permissions.
              </NoServerDescription>
            </NoServerCard>
          ) : (
            <ServerListScrollArea>
              <ServerList>
                {userServers
                  .sort((a, b) => {
                    const aHasBot = isBotInServer(a.id);
                    const bHasBot = isBotInServer(b.id);
                    if (aHasBot && !bHasBot) return -1;
                    if (!aHasBot && bHasBot) return 1;
                    return a.name.localeCompare(b.name);
                  })
                  .map(server => {
                    const hasBot = isBotInServer(server.id);
                    return (
                      <ServerItem
                        key={server.id}
                        selected={selectedServer === server.id}
                        hasBot={hasBot}
                        onClick={() => handleServerSelect(server)}
                      >
                        <ServerIcon>
                          {getServerIcon(server) ? (
                            <img
                              src={getServerIcon(server)}
                              alt={server.name}
                            />
                          ) : (
                            server.name.charAt(0).toUpperCase()
                          )}
                          <StatusIndicator online={hasBot} />
                        </ServerIcon>

                        <ServerInfo>
                          <ServerName>{server.name}</ServerName>
                        </ServerInfo>

                        <ServerArrow>
                          {hasBot ? '→' : '+'}
                        </ServerArrow>
                      </ServerItem>
                    );
                  })}
              </ServerList>
            </ServerListScrollArea>
          )}
        </ServerListContainer>
      </MainContent>
    </ServerSelectContainer>
  );
};

export default ServerSelect;
