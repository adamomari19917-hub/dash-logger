import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GridBackground from '../components/GridBackground';
import PageTransition from '../components/PageTransition';

const AboutContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const AboutContent = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
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

const DeveloperSection = styled.div`
  text-align: center;
  margin-bottom: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
`;

const DeveloperAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
`;

const DeveloperDescription = styled.p`
  color: #d1d5db;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0;
  text-align: left;
  
  a {
    color: #9ca3af;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FAQSection = styled.section`
  margin-top: 2.5rem;
`;

const FAQTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 3.5rem;
`;

const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #374151;
  padding: 1.5rem 0;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover .faq-question::before {
    background: #d1d5db;
  }
`;

const FAQQuestion = styled.div`
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9ca3af;
    flex-shrink: 0;
    transition: background-color 0.2s ease;
  }
`;

const FAQAnswer = styled.div`
  color: #9ca3af;
  font-size: 1rem;
  line-height: 1.65;
  margin-left: 1.75rem;
  overflow: hidden;
  max-height: ${props => props.open ? '250px' : '0'};
  opacity: ${props => props.open ? '1' : '0'};
  padding-top: ${props => props.open ? '0.875rem' : '0'};
  transition: max-height 0.2s ease, 
              opacity 0.2s ease,
              padding-top 0.2s ease;
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

const PromoSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
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


const About = ({ user, onLogin, onLogout }) => {
  const [openQuestions, setOpenQuestions] = useState(new Set());
  const botInviteLink = "https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot";
  const developer = {
    username: 'algo',
    avatar: 'https://cdn.discordapp.com/avatars/1366203418653229247/5740d47f3dcce9963c1e335cb566c067.png?size=1024',
    globalName: 'algo'
  };

  const faqData = [
    {
      question: "Who is working on Logger Bot?",
      answer: `Logger Bot is developed and maintained by ${developer.globalName}, a passionate developer dedicated to creating the best Discord bot experience.`
    },
    {
      question: "When was Logger Bot created?",
      answer: "Logger Bot was created in early 2024 as a comprehensive solution for Discord server management and logging."
    },
    {
      question: "How long did it take to make Logger Bot?",
      answer: "The initial version took approximately 6 months of dedicated development, with continuous improvements being made regularly."
    },
    {
      question: "Are there any upcoming updates in the near future?",
      answer: "Yes! We have exciting features planned including advanced analytics, custom webhooks, and enhanced moderation tools."
    },
    {
      question: "Will Logger Bot be free forever?",
      answer: "Logger Bot will always have a robust free tier. Premium features help support development and server costs."
    },
    {
      question: "Is Logger Bot's code available to the public?",
      answer: "Currently Logger Bot is closed source to ensure security and stability, but we may open-source components in the future."
    },
    {
      question: "What about Logger Bot's uptime?",
      answer: "We maintain 99.9% uptime with redundant infrastructure and 24/7 monitoring to ensure reliable service."
    },
    {
      question: "Which libraries were used to code Logger Bot?",
      answer: "Logger Bot is built with Discord.js, Node.js, React, MongoDB, and various other modern technologies for optimal performance."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <AboutContainer>
      <GridBackground />
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />
      
      <AboutContent>
        <PageTransition type="fadeUp" delay={0.1}>
          <DeveloperSection>
            <DeveloperAvatar>
              {developer.avatar ? (
                <img 
                  src={developer.avatar} 
                  alt={developer.globalName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                '🤖'
              )}
            </DeveloperAvatar>
            <DeveloperDescription>
              Hey, I'm {developer.globalName}, the developer of Logger Bot. Below you can find frequently asked questions. If you still have any questions left, feel free to join <a href="#" target="_blank">Logger Bot's Support Server</a>.
            </DeveloperDescription>
          </DeveloperSection>
        </PageTransition>

        <PageTransition type="fadeUp" delay={0.3}>
          <FAQSection>
            <FAQTitle>Frequently asked questions</FAQTitle>
            
            <FAQList>
            {faqData.map((faq, index) => (
              <FAQItem key={index} onClick={() => toggleQuestion(index)}>
                <FAQQuestion className="faq-question">
                  {faq.question}
                </FAQQuestion>
                <FAQAnswer open={openQuestions.has(index)}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
            </FAQList>
          </FAQSection>
        </PageTransition>
      </AboutContent>
      
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
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Other Links</FooterTitle>
            <FooterExternalLink href="https://github.com/yourusername/logger-bot" target="_blank" rel="noopener noreferrer">Documentation</FooterExternalLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </FooterColumn>
        </FooterContainer>
        
        <FooterBottom>
          © 2025 Logify Logger. All rights reserved.
        </FooterBottom>
      </FooterSection>
    </AboutContainer>
  );
};

export default About;
