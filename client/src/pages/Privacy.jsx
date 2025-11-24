import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GridBackground from '../components/GridBackground';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const PrivacyContent = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 100px 1rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 90px 0.5rem 1rem;
  }
`;

const TitleCard = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const PrivacyTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;


const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  border-bottom: 2px solid #374151;
  padding-bottom: 0.5rem;
`;

const SectionContent = styled.div`
  color: #d1d5db;
  font-size: 1rem;
  line-height: 1.7;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  strong {
    color: #ffffff;
    font-weight: 600;
  }
`;

const ContactLink = styled.a`
  color: #60a5fa;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PromoSection = styled.section`
  padding: 4rem 2rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

const PromoCard = styled.div`
  background: #1f2937;
  border-radius: 16px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 2rem;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    gap: 1.5rem;
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
  width: 120px;
  height: 120px;
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
    width: 100px;
    height: 100px;
  }
`;


const FooterSection = styled.footer`
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  padding: 4rem 2rem 2rem;
  margin-top: 6rem;
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
  width: 48px;
  height: 48px;
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

const botInviteLink = "https://discord.com/oauth2/authorize?client_id=1421528633289216093&permissions=8&integration_type=0&scope=bot";

const Privacy = ({ user, onLogin, onLogout }) => {
  return (
    <PrivacyContainer>
      <GridBackground />
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />
      
      <PrivacyContent>
        <TitleCard>
          <PrivacyTitle>Privacy Policy for Logify Logger</PrivacyTitle>
        </TitleCard>
        
        <SectionContent>
          <p>
            Logify Logger  is a Discord bot that provides complete logging of server events (hereinafter referred to as the "Service"). This Privacy Policy explains how we collect, use, and protect your information while using the Service.
          </p>
          <p>
            <strong>By using Logify Logger, you agree to this Privacy Policy.</strong>
          </p>
        </SectionContent>

        <Section>
          <SectionTitle>Definitions</SectionTitle>
          <SectionContent>
            <p><strong>Service:</strong> The Service refers to the Logify Logger Discord Bot, used to monitor and log events in Discord servers.</p>
            <p><strong>Personal Data:</strong> Personal Data refers to any information that identifies or can identify a Discord user, such as User ID, username, or discriminator.</p>
            <p><strong>Usage Data:</strong> Usage Data is automatically collected information related to the operation of the Service, such as logged events, server and channel IDs, and bot configuration.</p>
            <p><strong>Data Controller:</strong> We, the operators of Logify Logger, are the Data Controller responsible for handling your data.</p>
            <p><strong>Data Subject (User):</strong> The Data Subject is any individual using Logify Logger in Discord servers.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Information We Collect</SectionTitle>
          <SectionContent>
            <p>Logify Logger collects the minimum data necessary to provide logging services:</p>
            <ul>
              <li>Discord User IDs and usernames (for logging events)</li>
              <li>Server IDs, Channel IDs (for event logging)</li>
              <li>Event types (message edits, deletions, joins/leaves, voice activity, moderation actions)</li>
            </ul>
            <p><strong>Note:</strong> Logify Logger does not log message content or any sensitive personal information.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>How We Use Data</SectionTitle>
          <SectionContent>
            <p>We use collected data only to:</p>
            <ul>
              <li>Provide and maintain logging services</li>
              <li>Monitor server activity for proper bot functionality</li>
              <li>Detect and prevent misuse or abuse of the Service</li>
              <li>Notify server admins about errors or updates</li>
            </ul>
            <p>We do not use your data for marketing, advertisements, or sharing with third parties.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Data Storage & Retention</SectionTitle>
          <SectionContent>
            <ul>
              <li>Configuration data (like log channels and settings) may be stored temporarily to ensure proper bot function.</li>
              <li>Event data (user IDs, server IDs, event type) is only retained for operational purposes and may be deleted when no longer needed.</li>
              <li>We do not store messages or private content permanently.</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Data Security</SectionTitle>
          <SectionContent>
            <ul>
              <li>We implement reasonable measures to protect your data.</li>
              <li>However, no electronic storage or transmission is 100% secure. By using Logify Logger, you accept this risk.</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Data Sharing</SectionTitle>
          <SectionContent>
            <p>We do not sell, trade, or otherwise share your personal information.</p>
            <p>Data may be disclosed only to:</p>
            <ul>
              <li>Comply with a legal obligation</li>
              <li>Prevent abuse of the Service</li>
              <li>Protect the safety of users or the public</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Links & Third-Party Services</SectionTitle>
          <SectionContent>
            <ul>
              <li>Logify Logger may interact with Discord and other approved integrations.</li>
              <li>We are not responsible for the privacy policies of third-party services.</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Children's Privacy</SectionTitle>
          <SectionContent>
            <ul>
              <li>Logify Logger is not designed for children under 13.</li>
              <li>We do not knowingly collect data from children.</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Changes to This Policy</SectionTitle>
          <SectionContent>
            <ul>
              <li>We may update this Privacy Policy occasionally.</li>
              <li>Changes will be posted here, and the "Last Updated" date will reflect the newest version.</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Contact Information </SectionTitle>
          <SectionContent>
            <p>For questions about this Privacy Policy or Logify Logger, contact our support server: <ContactLink href="https://discord.gg/N7G2BQVC4g" target="_blank" rel="noopener noreferrer">https://discord.gg/N7G2BQVC4g</ContactLink></p>
          </SectionContent>
        </Section>

      </PrivacyContent>
      
      <PromoSection>
        <PromoCard>
          <PromoContent>
            <PromoTitle>Let Logify take care of your Server</PromoTitle>
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
    </PrivacyContainer>
  );
};

export default Privacy;
