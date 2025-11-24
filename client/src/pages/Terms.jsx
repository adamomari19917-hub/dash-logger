import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GridBackground from '../components/GridBackground';

const TermsContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const TermsContent = styled.div`
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

const TermsTitle = styled.h1`
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

const Terms = ({ user, onLogin, onLogout }) => {
  return (
    <TermsContainer>
      <GridBackground />
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />
      
      <TermsContent>
        <TitleCard>
          <TermsTitle>Terms of Service for Logify Logger</TermsTitle>
        </TitleCard>
        
        <SectionContent>
          <p>
            Welcome to Logify Logger, a Discord bot that provides comprehensive logging of server events (hereinafter referred to as the "Service"). By using Logify Logger, you agree to be bound by these Terms of Service.
          </p>
          <p>
            <strong>By adding Logify Logger to your Discord server or using the Service, you agree to these Terms of Service.</strong>
          </p>
        </SectionContent>

        <Section>
          <SectionTitle>Acceptance of Terms</SectionTitle>
          <SectionContent>
            <p>By accessing and using Logify Logger, you accept and agree to be bound by the terms and provision of this agreement.</p>
            <p>If you do not agree to abide by the above, please do not use this service.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Use License</SectionTitle>
          <SectionContent>
            <p>Permission is granted to temporarily use Logify Logger for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the bot's materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained in Logify Logger</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Disclaimer</SectionTitle>
          <SectionContent>
            <p>The materials on Logify Logger are provided on an 'as is' basis. Logify Logger makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>Further, Logify Logger does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Limitations</SectionTitle>
          <SectionContent>
            <p>In no event shall Logify Logger or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Logify Logger, even if Logify Logger or a Logify Logger authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Accuracy of Materials</SectionTitle>
          <SectionContent>
            <p>The materials appearing in Logify Logger could include technical, typographical, or photographic errors. Logify Logger does not warrant that any of the materials on its service are accurate, complete, or current. Logify Logger may make changes to the materials contained in its service at any time without notice. However, Logify Logger does not make any commitment to update the materials.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Links</SectionTitle>
          <SectionContent>
            <p>Logify Logger has not reviewed all of the sites linked to our service and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Logify Logger of the site. Use of any such linked website is at the user's own risk.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Modifications</SectionTitle>
          <SectionContent>
            <p>Logify Logger may revise these terms of service at any time without notice. By using this service, you are agreeing to be bound by the then current version of these terms of service.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Governing Law</SectionTitle>
          <SectionContent>
            <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Contact Information</SectionTitle>
          <SectionContent>
             <p>For questions about this Privacy Policy or Logify Logger, contact our support server: <ContactLink href="https://discord.gg/N7G2BQVC4g" target="_blank" rel="noopener noreferrer">https://discord.gg/N7G2BQVC4g</ContactLink></p>
          </SectionContent>
        </Section>

      </TermsContent>
      
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
    </TermsContainer>
  );
};

export default Terms;
