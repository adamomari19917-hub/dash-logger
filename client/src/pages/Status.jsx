import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDown, ChevronUp, Activity, Server, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import GridBackground from '../components/GridBackground';

const StatusContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const StatusContent = styled.div`
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 80px 1rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 70px 0.5rem 1rem;
  }
`;

const StatusBanner = styled.div`
  background: ${props => props.allOnline ? '#6b7280' : '#ef4444'};
  color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  text-transform: capitalize;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ServiceCard = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 0.75rem 1rem;
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ServiceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ServiceDetails = styled.div``;

const ServiceName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  letter-spacing: -0.025em;
`;

const ServiceDescription = styled.p`
  color: #a1a1aa;
  margin: 0.125rem 0 0 0;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.status === 'online' ? '#6b7280' : '#ef4444'};
  color: #ffffff;
  text-transform: capitalize;
  letter-spacing: 0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  transition: all 0.2s ease;
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
`;

const ServiceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #9ca3af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ExpandButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #9ca3af;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`;

const ExpandedContent = styled.div`
  margin-top: ${props => props.expanded ? '1.5rem' : '0'};
  padding-top: ${props => props.expanded ? '1.5rem' : '0'};
  border-top: ${props => props.expanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  max-height: ${props => props.expanded ? '500px' : '0'};
  overflow: hidden;
  opacity: ${props => props.expanded ? '1' : '0'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.expanded ? 'translateY(0)' : 'translateY(-10px)'};
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  color: #9ca3af;
  font-size: 0.9rem;
`;

const MetricValue = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

// Uptime History Styles
const UptimeSection = styled.div`
  margin-top: 4rem;
`;

const UptimeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const UptimeTitle = styled.h2`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const UptimeTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const UptimeTab = styled.button`
  background: ${props => props.active ? '#6b7280' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#9ca3af'};
  border: 1px solid ${props => props.active ? '#6b7280' : '#4b5563'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #6b7280;
    color: #ffffff;
  }
`;

const ServiceTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ServiceTab = styled.button`
  background: ${props => props.active ? '#6b7280' : '#374151'};
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #6b7280;
  }
`;

const UptimeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 2rem;
`;

const UptimeStats = styled.div`
  min-width: 150px;
`;

const UptimeLabel = styled.div`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const UptimePercentage = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CalendarContainer = styled.div`
  flex: 1;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const MonthLabel = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.25rem;
  max-width: 500px;
`;

const CalendarDay = styled.div`
  width: 28px;
  height: 28px;
  background: ${props => props.status === 'good' ? '#22c55e' : '#374151'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const UptimeFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToggleLabel = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: #374151;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
`;

const PromoSection = styled.section`
  padding: 2rem 2rem;
  max-width: 1200px;
  margin: 24rem auto 0;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin: 18rem auto 0;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    margin: 12rem auto 0;
  }
`;

const PromoCard = styled.div`
  background: #1f2937;
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 150px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    gap: 1rem;
  }
`;

const PromoContent = styled.div`
  flex: 1;
  z-index: 2;
`;

const PromoTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const PromoSubtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const PromoButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
  }
`;

const PromoVisual = styled.div`
  flex: 0 0 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex: none;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const PromoBotIcon = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const FooterSection = styled.footer`
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  padding: 3rem 2rem 2rem;
  margin-top: 10rem;
  border-top: 1px solid rgba(107, 114, 128, 0.2);
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const FooterExternalLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterLogo = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(107, 114, 128, 0.3);
  box-shadow: -4px 0 8px rgba(156, 163, 175, 0.08), 
              4px 0 8px rgba(156, 163, 175, 0.08),
              -6px 0 12px rgba(255, 255, 255, 0.02),
              6px 0 12px rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: -6px 0 10px rgba(156, 163, 175, 0.12), 
                6px 0 10px rgba(156, 163, 175, 0.12),
                -8px 0 15px rgba(255, 255, 255, 0.03),
                8px 0 15px rgba(255, 255, 255, 0.03);
    transform: scale(1.01);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const FooterBrandName = styled.span`
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5rem;
`;

const FooterDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(107, 114, 128, 0.2);
  margin-top: 3rem;
  padding-top: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.85rem;
`;

const Status = ({ user, onLogin, onLogout }) => {
  const botInviteLink = "https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot";
  const [services, setServices] = useState({
    mainBot: {
      name: 'Main Bot',
      description: 'Core Discord bot service',
      status: 'online',
      uptime: '99.9%',
      guilds: 0,
      users: 0,
      commands: 0,
      ping: 0,
      version: '1.0.0'
    },
    dashboard: {
      name: 'Dashboard',
      description: 'Web dashboard interface',
      status: 'online',
      uptime: '100%',
      responseTime: '45ms'
    },
    api: {
      name: 'API Server',
      description: 'Backend API services',
      status: 'online',
      uptime: '99.8%',
      requests: '1.2k/min',
      responseTime: '120ms'
    }
  });

  const [expandedServices, setExpandedServices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bot/status');
        if (response.ok) {
          const data = await response.json();
          setServices(prev => ({
            ...prev,
            mainBot: {
              ...prev.mainBot,
              status: data.status === 'offline' ? 'offline' : 'online',
              guilds: data.servers || 0,
              users: data.users || 0,
              commands: data.commands || 0,
              ping: data.ping || 0,
              version: data.version || '1.0.0'
            }
          }));
        }
      } catch (error) {
        console.error('Failed to fetch bot status:', error);
        setServices(prev => ({
          ...prev,
          mainBot: {
            ...prev.mainBot,
            status: 'offline'
          }
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); 

    return () => clearInterval(interval);
  }, []);

  const toggleService = (serviceKey) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceKey]: !prev[serviceKey]
    }));
  };

  const allServicesOnline = Object.values(services).every(service => service.status === 'online');

  const getServiceIcon = (serviceKey) => {
    switch (serviceKey) {
      case 'mainBot':
        return <Activity size={24} />;
      case 'dashboard':
        return <Server size={24} />;
      case 'api':
        return <Zap size={24} />;
      default:
        return <Activity size={24} />;
    }
  };

  return (
    <StatusContainer>
      <GridBackground />
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />
      
      <StatusContent>
        <StatusBanner allOnline={allServicesOnline}>
          {allServicesOnline ? 'All systems operational' : 'Some systems experiencing issues'}
        </StatusBanner>

        <ServicesGrid>
          {Object.entries(services).map(([serviceKey, service]) => (
            <ServiceCard key={serviceKey}>
              <ServiceHeader onClick={() => toggleService(serviceKey)}>
                <ServiceInfo>
                  <ServiceDetails>
                    <ServiceName>{service.name}</ServiceName>
                    <ServiceDescription>{service.description}</ServiceDescription>
                  </ServiceDetails>
                </ServiceInfo>
                <StatusBadge status={service.status}>
                  {service.status === 'online' ? 'Operational' : 'Offline'}
                </StatusBadge>
              </ServiceHeader>

              {serviceKey === 'mainBot' && (
                <ServiceStats>
                  <StatItem>
                    <StatValue>{loading ? '...' : service.guilds.toLocaleString()}</StatValue>
                    <StatLabel>Servers</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{loading ? '...' : service.commands}</StatValue>
                    <StatLabel>Commands</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{loading ? '...' : service.ping}ms</StatValue>
                    <StatLabel>Ping</StatLabel>
                  </StatItem>
                </ServiceStats>
              )}

              <ExpandedContent expanded={expandedServices[serviceKey]}>
                {serviceKey === 'mainBot' && (
                  <>
                    <MetricRow>
                      <MetricLabel>Uptime</MetricLabel>
                      <MetricValue>{service.uptime}</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Version</MetricLabel>
                      <MetricValue>{service.version}</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Status</MetricLabel>
                      <MetricValue>{service.status === 'online' ? 'Operational' : 'Offline'}</MetricValue>
                    </MetricRow>
                  </>
                )}

                {serviceKey === 'dashboard' && (
                  <>
                    <MetricRow>
                      <MetricLabel>Uptime</MetricLabel>
                      <MetricValue>{service.uptime}</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Response Time</MetricLabel>
                      <MetricValue>{service.responseTime}</MetricValue>
                    </MetricRow>
                  </>
                )}

                {serviceKey === 'api' && (
                  <>
                    <MetricRow>
                      <MetricLabel>Uptime</MetricLabel>
                      <MetricValue>{service.uptime}</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Requests/min</MetricLabel>
                      <MetricValue>{service.requests}</MetricValue>
                    </MetricRow>
                    <MetricRow>
                      <MetricLabel>Avg Response Time</MetricLabel>
                      <MetricValue>{service.responseTime}</MetricValue>
                    </MetricRow>
                  </>
                )}
              </ExpandedContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </StatusContent>
      
      <PromoSection>
        <PromoCard>
          <PromoContent>
            <PromoTitle>
              Let Logify take care of your Server
            </PromoTitle>
            <PromoSubtitle>
              Join thousands of servers using Logify Logger for comprehensive Discord logging and monitoring.
            </PromoSubtitle>
            <PromoButton href={botInviteLink} target="_blank" rel="noopener noreferrer">
              Add To Discord
            </PromoButton>
          </PromoContent>
          <PromoVisual>
            <PromoBotIcon>
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
            </PromoBotIcon>
          </PromoVisual>
        </PromoCard>
      </PromoSection>
      
      <FooterSection>
        <FooterContainer>
          <FooterColumn>
            <FooterBrand>
              <FooterLogo>
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
              </FooterLogo>
              <FooterBrandName>Logify</FooterBrandName>
            </FooterBrand>
            <FooterDescription>
              A powerful Discord logging bot that tracks and records all server activities. Monitor messages, user actions, and server changes with detailed logs.
            </FooterDescription>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Website Pages</FooterTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/status">Status</FooterLink>
            <FooterExternalLink href="https://discord.gg/N7G2BQVC4g" target="_blank" rel="noopener noreferrer">Support</FooterExternalLink>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Other Links</FooterTitle>
            <FooterExternalLink href="https://discord.gg/N7G2BQVC4g" target="_blank" rel="noopener noreferrer">Support</FooterExternalLink>
            <FooterExternalLink href="https://github.com/yourusername/logger-bot" target="_blank" rel="noopener noreferrer">Documentation</FooterExternalLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </FooterColumn>
        </FooterContainer>
        
        <FooterBottom>
          © 2025 Logify Logger. All rights reserved.
        </FooterBottom>
      </FooterSection>
    </StatusContainer>
  );
};

export default Status;
