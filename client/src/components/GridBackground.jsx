import React, { useMemo } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  overflow: hidden;
`;

const GridPattern = styled.div`
  display: none;
`;

const FloatingSquares = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Square = styled.div`
  position: absolute;
  background: rgba(156, 163, 175, 0.12);
  border: 1px solid rgba(156, 163, 175, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(3px);
  animation: float ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(156, 163, 175, 0.1);
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg) scale(1);
      opacity: 0.5;
    }
    25% {
      transform: translateY(-15px) rotate(45deg) scale(1.05);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-30px) rotate(90deg) scale(1.1);
      opacity: 0.9;
    }
    75% {
      transform: translateY(-15px) rotate(135deg) scale(1.05);
      opacity: 0.7;
    }
  }
`;

const GridBackground = () => {
  // Generate random squares only once using useMemo
  const squares = useMemo(() => {
    // Fixed positions - these will never change on refresh
    const fixedPositions = [
      // Top area squares
      { left: 15, top: 10, size: 25 },
      { left: 85, top: 8, size: 20 },
      { left: 50, top: 5, size: 18 },
      { left: 25, top: 15, size: 22 },
      { left: 75, top: 12, size: 28 },
      
      // Bottom area squares  
      { left: 20, top: 85, size: 24 },
      { left: 80, top: 88, size: 26 },
      { left: 60, top: 90, size: 20 },
      { left: 40, top: 85, size: 23 },
      
      // Left side squares
      { left: 8, top: 30, size: 19 },
      { left: 12, top: 60, size: 21 },
      { left: 5, top: 45, size: 17 },
      
      // Right side squares
      { left: 92, top: 35, size: 22 },
      { left: 88, top: 65, size: 18 },
      { left: 95, top: 50, size: 20 },
      
      // Middle area squares (fewer)
      { left: 30, top: 40, size: 16 },
      { left: 70, top: 45, size: 14 },
      { left: 45, top: 50, size: 15 },
      
      // Large accent squares (very few)
      { left: 10, top: 20, size: 45 },
      { left: 85, top: 70, size: 50 },
      { left: 60, top: 25, size: 42 }
    ];

    // Create squares with fixed positions but random animations
    return fixedPositions.map((pos, i) => ({
      id: `fixed-${i}`,
      size: pos.size,
      left: pos.left,
      top: pos.top,
      duration: 15 + (i % 10), // Varied but consistent durations
      delay: i * 0.5 // Staggered delays
    }));
  }, []);

  return (
    <BackgroundContainer>
      <GridPattern />
      <FloatingSquares>
        {squares.map(square => (
          <Square
            key={square.id}
            style={{
              width: `${square.size}px`,
              height: `${square.size}px`,
              left: `${square.left}%`,
              top: `${square.top}%`,
            }}
            duration={square.duration}
            delay={square.delay}
          />
        ))}
      </FloatingSquares>
    </BackgroundContainer>
  );
};

export default GridBackground;
