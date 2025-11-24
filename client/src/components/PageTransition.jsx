import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled components
const TransitionWrapper = styled.div`
  animation: ${fadeInUp} 0.6s ease-out;
  animation-fill-mode: both;
`;

const StaggeredContainer = styled.div`
  > * {
    animation: ${fadeInUp} 0.8s ease-out;
    animation-fill-mode: both;
  }
  
  > *:nth-child(1) { animation-delay: 0.1s; }
  > *:nth-child(2) { animation-delay: 0.2s; }
  > *:nth-child(3) { animation-delay: 0.3s; }
  > *:nth-child(4) { animation-delay: 0.4s; }
  > *:nth-child(5) { animation-delay: 0.5s; }
  > *:nth-child(6) { animation-delay: 0.6s; }
`;

const ScaleTransition = styled.div`
  animation: ${fadeInScale} 0.7s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
`;

const SlideTransition = styled.div`
  animation: ${slideInFromRight} 0.6s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
`;

// Main PageTransition component
const PageTransition = ({ 
  children, 
  type = 'fadeUp', 
  delay = 0, 
  stagger = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  if (stagger) {
    return <StaggeredContainer>{children}</StaggeredContainer>;
  }

  switch (type) {
    case 'scale':
      return <ScaleTransition delay={`${delay}s`}>{children}</ScaleTransition>;
    case 'slide':
      return <SlideTransition delay={`${delay}s`}>{children}</SlideTransition>;
    case 'fadeUp':
    default:
      return <TransitionWrapper style={{ animationDelay: `${delay}s` }}>{children}</TransitionWrapper>;
  }
};

export default PageTransition;
