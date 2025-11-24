import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MessageSquare, Settings, Users, Shield, Activity } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const CommandsContainer = styled.div`
  padding: 1.5rem;
`;

const CommandSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const CommandCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CommandName = styled.h4`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  font-family: 'Courier New', monospace;
`;

const CommandDescription = styled.p`
  color: #b9bbbe;
  font-size: 0.9rem;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
`;

const CommandUsage = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #8e9297;
  border-left: 3px solid #6b7280;
`;

const Commands = ({ user, onLogin, onLogout }) => {
  const { serverId } = useParams();
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading commands
    const loadCommands = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCommands([
        {
          category: 'Moderation',
          icon: Shield,
          commands: [
            {
              name: '/ban',
              description: 'Ban a user from the server',
              usage: '/ban @user [reason]'
            },
            {
              name: '/kick',
              description: 'Kick a user from the server',
              usage: '/kick @user [reason]'
            },
            {
              name: '/mute',
              description: 'Mute a user in the server',
              usage: '/mute @user [duration] [reason]'
            },
            {
              name: '/warn',
              description: 'Warn a user',
              usage: '/warn @user [reason]'
            }
          ]
        },
        {
          category: 'Utility',
          icon: Settings,
          commands: [
            {
              name: '/userinfo',
              description: 'Get information about a user',
              usage: '/userinfo [@user]'
            },
            {
              name: '/serverinfo',
              description: 'Get information about the server',
              usage: '/serverinfo'
            },
            {
              name: '/avatar',
              description: 'Get a user\'s avatar',
              usage: '/avatar [@user]'
            }
          ]
        },
        {
          category: 'Logging',
          icon: Activity,
          commands: [
            {
              name: '/logs',
              description: 'View recent server logs',
              usage: '/logs [type] [limit]'
            },
            {
              name: '/audit',
              description: 'Search audit logs',
              usage: '/audit [action] [user] [date]'
            }
          ]
        },
        {
          category: 'General',
          icon: MessageSquare,
          commands: [
            {
              name: '/help',
              description: 'Show help information',
              usage: '/help [command]'
            },
            {
              name: '/ping',
              description: 'Check bot latency',
              usage: '/ping'
            },
            {
              name: '/invite',
              description: 'Get bot invite link',
              usage: '/invite'
            }
          ]
        }
      ]);
      
      setLoading(false);
    };

    loadCommands();
  }, [serverId]);

  if (loading) {
    return (
      <DashboardLayout user={user} onLogin={onLogin} onLogout={onLogout} currentPage="commands">
        <CommandsContainer>
          <div style={{ color: '#b9bbbe', textAlign: 'center', padding: '2rem' }}>
            Loading commands...
          </div>
        </CommandsContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} onLogin={onLogin} onLogout={onLogout} currentPage="commands">
      <CommandsContainer>
        {commands.map((section) => (
          <CommandSection key={section.category}>
            <SectionTitle>
              <section.icon size={20} />
              {section.category} Commands
            </SectionTitle>
            <CommandGrid>
              {section.commands.map((command) => (
                <CommandCard key={command.name}>
                  <CommandName>{command.name}</CommandName>
                  <CommandDescription>{command.description}</CommandDescription>
                  <CommandUsage>{command.usage}</CommandUsage>
                </CommandCard>
              ))}
            </CommandGrid>
          </CommandSection>
        ))}
      </CommandsContainer>
    </DashboardLayout>
  );
};

export default Commands;
