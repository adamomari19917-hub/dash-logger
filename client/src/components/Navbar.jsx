import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LogOut, ChevronDown, Home, Info, Activity, Settings, UserPlus, HelpCircle, Palette } from 'lucide-react';

const NavigationBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(${props => props.visible ? '0' : '-100%'});
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.isDashboard ? '1000' : '100'};
  transition: transform 0.25s ease-out;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  min-height: 100px;
  max-height: 100px;
  will-change: transform;
  pointer-events: auto;
  
  @media (max-width: 768px) {
    height: 80px;
    min-height: 80px;
    max-height: 80px;
  }
  
  @media (max-width: 480px) {
    height: 70px;
    min-height: 70px;
    max-height: 70px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  position: relative;
  padding: 0 1rem;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.25rem;
    justify-content: space-between;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
  margin-left: 3rem;
  min-height: 40px;
  min-width: 120px;
  
  @media (max-width: 768px) {
    margin-left: 1rem;
    font-size: 1.1rem;
    gap: 0.5rem;
    min-width: 100px;
  }
  
  @media (max-width: 480px) {
    margin-left: 0.5rem;
    font-size: 1rem;
    gap: 0.4rem;
    min-width: 50px;
    justify-content: flex-start;
  }
`;

const LogoText = styled.span`
  font-weight: 700;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NavLogoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
  margin-left: 2rem;
  min-height: 40px;
  position: relative;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: auto;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
    margin-left: 1rem;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;


const NavRight = styled.div`
  margin-right: 3rem;
  min-height: 40px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-right: 1rem;
  }
  
  @media (max-width: 480px) {
    margin-right: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &.active {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LoginButton = styled.button`
  background: #6b7280;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #9ca3af;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-right: -1rem;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    gap: 0;
    padding: 0.25rem;
    margin-right: 0;
  }
`;

const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

const UserDisplayName = styled.span`
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #e5e7eb;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownArrow = styled.div`
  color: #9ca3af;
  transition: all 0.2s ease;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(31, 41, 55, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem 0;
  min-width: 160px;
  width: 160px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
  z-index: 1000;
  opacity: ${props => props.open ? 1 : 0};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transform: translateY(${props => props.open ? '0' : '-15px'}) scale(${props => props.open ? 1 : 0.95});
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    right: -0.5rem;
    min-width: 140px;
    width: 140px;
    margin-top: 0.25rem;
  }
`;

const LogoDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 180px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: ${props => props.open ? 1 : 0};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transform: translateY(${props => props.open ? '0' : '-10px'});
  transition: all 0.2s ease;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: translateX(3px);
  }
  
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const DropdownLink = styled(Link)`
  width: 100%;
  padding: 0.6rem 1rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: translateX(3px);
  }
`;

const LogoutDropdownItem = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 0.4rem;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    transform: translateX(3px);
  }
`;


const Navbar = ({ user, onLogin, onLogout }) => {
  const location = useLocation();
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navLinksRef = useRef(null);
  const linkRefs = useRef({});
  const [currentUser, setCurrentUser] = useState(user);

  // Update currentUser whenever the user prop changes (from App component)
  useEffect(() => {
    setCurrentUser(user);
    setIsLoading(false);
  }, [user]);

  // Close dropdowns when navigating between pages
  useEffect(() => {
    setDropdownOpen(false);
    setLogoDropdownOpen(false);
  }, [location.pathname]);


  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Always show nav when at very top
          if (currentScrollY <= 10) {
            setNavVisible(true);
          }
          // Hide nav when scrolling down past threshold
          else if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setNavVisible(false);
          }
          // Show nav IMMEDIATELY on ANY upward scroll movement
          else if (currentScrollY < lastScrollY) {
            setNavVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
      if (logoDropdownOpen && !event.target.closest('[data-logo-dropdown]')) {
        setLogoDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen, logoDropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleLogoDropdown = () => {
    setLogoDropdownOpen(!logoDropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setLogoDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const getUserAvatar = (userData) => {
    if (!userData) return null;
    
    if (userData.avatar) {
      return `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=64`;
    }
    return `https://cdn.discordapp.com/embed/avatars/${(userData.discriminator || 0) % 5}.png`;
  };

  const getUserDisplayName = (userData) => {
    if (!userData) return 'User';
    
    return userData.displayName || userData.global_name || userData.username || 'User';
  };

  // Check if current page is Dashboard
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <NavigationBar visible={navVisible} isDashboard={isDashboard}>
      <NavContainer>
        <NavLogo>
          <NavLogoIcon onClick={toggleLogoDropdown} data-logo-dropdown>
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
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <LogoDropdown open={logoDropdownOpen} data-logo-dropdown>
              <DropdownLink to="/home">Home</DropdownLink>
              <DropdownLink to="/about">About</DropdownLink>
              <DropdownLink to="/status">Status</DropdownLink>
              <DropdownLink to="/dashboard">Dashboard</DropdownLink>
              <DropdownLink href="https://discord.gg/N7G2BQVC4g" target="_blank">Support</DropdownLink>
              <LogoutDropdownItem onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </LogoutDropdownItem>
            </LogoDropdown>
          </NavLogoIcon>
          <LogoText>Logify</LogoText>
        </NavLogo>

        <NavLinks ref={navLinksRef}>
          <NavLink 
            key="home" 
            to="/" 
            ref={el => linkRefs.current.home = el}
            className={location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            key="about" 
            to="/about" 
            ref={el => linkRefs.current.about = el}
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </NavLink>
          <NavLink 
            key="status" 
            to="/status" 
            ref={el => linkRefs.current.status = el}
            className={location.pathname === '/status' ? 'active' : ''}
          >
            Status
          </NavLink>
          <a 
            key="support" 
            href="https://discord.gg/N7G2BQVC4g" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <NavLink 
              ref={el => linkRefs.current.support = el}
              className={location.pathname === '/support' ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              Support
            </NavLink>
          </a>

        </NavLinks>

        <NavRight>
        {!isLoading && !currentUser ? (
          <LoginButton onClick={onLogin}>
            Login
          </LoginButton>
        ) : !isLoading && currentUser ? (
          <UserProfile onClick={toggleDropdown} data-dropdown>
            <UserAvatar 
              src={getUserAvatar(currentUser)}
              alt={getUserDisplayName(currentUser)}
            />
            <UserDisplayName>{getUserDisplayName(currentUser)}</UserDisplayName>
            <DropdownArrow open={dropdownOpen}>
              <ChevronDown size={16} />
            </DropdownArrow>
            <UserDropdown open={dropdownOpen} data-dropdown>
              <DropdownLink to="/home">
                Home
              </DropdownLink>
              <DropdownLink to="/about">
                About
              </DropdownLink>
              <DropdownLink to="/status">
                Status
              </DropdownLink>
              <DropdownItem>
                Invite Me
              </DropdownItem>
              <DropdownLink href="https://discord.gg/N7G2BQVC4g" target="_blank">
                Support
              </DropdownLink>
              <DropdownItem>
                Dashboard
              </DropdownItem>
              <LogoutDropdownItem onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </LogoutDropdownItem>
            </UserDropdown>
          </UserProfile>
        ) : null}
        </NavRight>
      </NavContainer>
    </NavigationBar>
  );
};

export default Navbar;
