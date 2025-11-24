import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GridBackground from '../components/GridBackground';
import PageTransition from '../components/PageTransition';

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const HeroSection = styled.section`
  padding: 150px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 120px 1rem 2rem;
    gap: 2rem;
    min-height: 60vh;
  }
  
  @media (max-width: 480px) {
    padding: 100px 0.5rem 1rem;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 480px) {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`;

const BotName = styled.span`
  background: linear-gradient(135deg, #9ca3af, #d1d5db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;


const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 3rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 0.6rem;
    padding: 0 1rem;
  }
`;

const InviteButton = styled.a`
  background: linear-gradient(135deg, #6b7280, #9ca3af);
  color: #ffffff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  
  @media (max-width: 768px) {
    width: 80%;
    text-align: center;
    padding: 0.9rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 90%;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(107, 114, 128, 0.3);
  }
`;

const ExploreButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 2px solid #6b7280;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 80%;
    padding: 0.9rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 90%;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: #6b7280;
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.div`
  flex: 0 0 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex: none;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const BotAvatar = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(107, 114, 128, 0.3);
  box-shadow: 0 20px 40px rgba(107, 114, 128, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 50px rgba(107, 114, 128, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    border: 3px solid rgba(107, 114, 128, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    border: 2px solid rgba(107, 114, 128, 0.3);
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

// Feature Section Styles
const FeatureSection = styled.section`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 0.5rem 2rem;
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const FeatureContent = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(107, 114, 128, 0.1);
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const FeatureDescription = styled.div`
  color: #9ca3af;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1.2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const FeatureButton = styled.a`
  background: rgba(107, 114, 128, 0.2);
  color: #ffffff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  border: 1px solid rgba(107, 114, 128, 0.3);
  
  &:hover {
    background: rgba(107, 114, 128, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
  }
`;

const FeatureVisual = styled.div`
  flex: 0 0 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  @media (max-width: 1024px) {
    flex: none;
    max-width: 600px;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const DashboardPreview = styled.div`
  width: 100%;
  height: 400px;
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const DashboardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DashboardAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const DashboardTitle = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
`;

const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  flex: 1;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #9ca3af;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;


const PromoSection = styled.section`
  padding: 20rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 16rem 1rem 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 14rem 0.5rem 2rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 8rem 2rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 4rem;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 0.5rem 3rem;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 4rem;
    text-align: center;
  }
`;

const FeaturesContent = styled.div`
  flex: 1;
  max-width: 500px;
`;

const FeaturesTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const FeaturesDescription = styled.p`
  font-size: 1.1rem;
  color: #9ca3af;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ffffff;
    transform: translateX(8px);
  }
  
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: transparent;
    border: 2px solid #6b7280;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
  }
  
  &:hover::before {
    border-color: #9ca3af;
  }
`;

const FeaturesVisual = styled.div`
  flex: 1;
  max-width: 600px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommandsCard = styled.div`
  background: rgba(31, 41, 55, 0.9);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(107, 114, 128, 0.2);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
    border-color: rgba(107, 114, 128, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

const CommandsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(107, 114, 128, 0.2);
`;

const BotIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url('https://cdn.discordapp.com/avatars/1366203418653229247/5740d47f3dcce9963c1e335cb566c067.png?size=1024');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(107, 114, 128, 0.3);
`;

const CommandsTitle = styled.h3`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const CommandsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
`;

const CommandItem = styled.div`
  background: rgba(55, 65, 81, 0.6);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 0.8rem;
  color: #9ca3af;
  border: 1px solid rgba(75, 85, 99, 0.3);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
  
  &:hover {
    background: rgba(55, 65, 81, 0.8);
    border-color: rgba(107, 114, 128, 0.4);
    transform: translateY(-1px);
  }
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 3px;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(107, 114, 128, 0.2);
    color: #9ca3af;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 12px;
    height: 12px;
  }
`;


const FloatingDot = styled.div`
  position: absolute;
  width: ${props => props.size || '8px'};
  height: ${props => props.size || '8px'};
  background: ${props => props.color || '#3b82f6'};
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
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


// Demo Section Styles
const DemoSection = styled.section`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 0.5rem 2rem;
  }
`;

const DemoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const DemoSubtitle = styled.p`
  font-size: 1.2rem;
  color: #9ca3af;
  line-height: 1.6;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DemoHighlight = styled.span`
  color: #ffffff;
  font-weight: 600;
`;

const DemoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 6rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const SecondDemoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const DemoSideText = styled.div`
  flex: 0 0 200px;
  padding-top: 2rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SideTextTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SmallButton = styled.div`
  background: linear-gradient(135deg, #4a5568, #2d3748);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #5a6578, #3d4758);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.div`
  width: 14px;
  height: 14px;
  border: 1.5px solid #ffffff;
  border-radius: 2px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 5px;
    height: 5px;
    background: #ffffff;
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 3px;
    height: 3px;
    background: #ffffff;
    border-radius: 50%;
  }
`;

const SideTextIcon = styled.span`
  font-size: 1.2rem;
`;

const SideTextDescription = styled.p`
  font-size: 0.9rem;
  color: #8b949e;
  line-height: 1.5;
`;

const DemoContent = styled.div`
  flex: 1;
  max-width: 500px;
  text-align: left;
  
  @media (max-width: 1024px) {
    max-width: 600px;
    text-align: center;
  }
`;

const DemoCardsContainer = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    max-width: 600px;
    width: 100%;
  }
`;

const SecondDemoContent = styled.div`
  flex: 1;
  max-width: 500px;
  text-align: left;
  
  @media (max-width: 1024px) {
    max-width: 600px;
    text-align: center;
  }
`;

const SecondDemoTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const SecondDemoSubtitle = styled.p`
  font-size: 1.1rem;
  color: #9ca3af;
  line-height: 1.6;
  
  @media (max-width: 1024px) {
    text-align: center;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const DemoCard = styled.div`
  background: #161b22;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(48, 54, 61, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0.875rem;
  }
`;

const UserCard = styled.div`
  background: #0d1117;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid rgba(48, 54, 61, 0.8);
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const BotCard = styled.div`
  background: #0d1117;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid rgba(48, 54, 61, 0.8);
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const DemoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const DemoAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const UserAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(45deg, #7c3aed, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
`;

const DemoName = styled.span`
  color: #f0f6fc;
  font-weight: 500;
  font-size: 0.875rem;
`;

const UserName = styled.span`
  color: #f0f6fc;
  font-weight: 500;
  font-size: 0.875rem;
`;

const DemoBotTag = styled.span`
  background: #5865f2;
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 500;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  text-transform: uppercase;
`;

const VerifyTag = styled.span`
  background: #5865f2;
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 500;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
`;

const DemoMessage = styled.div`
  color: #8b949e;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const DemoUser = styled.span`
  color: #f0f6fc;
  font-weight: 500;
`;

const DemoCommand = styled.a`
  background: transparent;
  color: #8b949e;
  padding: 0;
  border: none;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #f0f6fc;
    text-decoration: underline;
  }
`;

const DemoSuccess = styled.div`
  color: #f0f6fc;
  font-size: 0.8rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;






const Home = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const botInviteLink = "https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot";

  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here if you want
      console.log(`Copied: ${text}`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        console.log(`Copied: ${text}`);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <HomeContainer>
      <GridBackground />
      <Navbar user={user} onLogin={onLogin} onLogout={onLogout} />
      
      <HeroSection>
        <PageTransition type="fadeUp" delay={0.1}>
          <HeroContent>
            <HeroTitle>
              <BotName>Logger Bot</BotName>
            </HeroTitle>
            <HeroDescription>
              Comprehensive Discord logging solution with easy setup. Track messages, voice activities, and server events with simple slash commands.
            </HeroDescription>
            <ButtonGroup>
              <InviteButton href={botInviteLink} target="_blank" rel="noopener noreferrer">
                Invite Me
              </InviteButton>
              <ExploreButton onClick={() => user ? navigate('/servers') : {}}>
                {user ? 'Dashboard' : 'Explore Features'}
              </ExploreButton>
            </ButtonGroup>
          </HeroContent>
        </PageTransition>

        <PageTransition type="scale" delay={0.3}>
          <HeroImage>
            <BotAvatar>
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundImage: `url(https://cdn.discordapp.com/avatars/1366203418653229247/5740d47f3dcce9963c1e335cb566c067.png?size=1024)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </BotAvatar>
          </HeroImage>
        </PageTransition>
      </HeroSection>



      <PageTransition type="fadeUp" delay={0.5}>
        <PromoSection>
          <PromoCard>
            <PromoContent>
              <PromoTitle>
                Let Logger Bot take care of your Server
              </PromoTitle>
              <PromoSubtitle>
                Join thousands of servers using Logger Bot for comprehensive Discord logging and monitoring.
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
                    backgroundRepeat: 'no-repeat',
                    border: '2px solid #fff'
                  }}
                  onError={() => console.log('Promo avatar failed to load')}
                />
              </PromoBotIcon>
            </PromoVisual>
          </PromoCard>
        </PromoSection>
      </PageTransition>

      <PageTransition type="fadeUp" delay={0.9}>
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
          © 2024 Logify. All rights reserved.
        </FooterBottom>
        </FooterSection>
      </PageTransition>
    </HomeContainer>
  );
};

export default Home;
