import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const DashboardContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;


const DashboardContent = styled.div`
  flex: 1;
  padding: 2rem;
  padding-bottom: 8rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  
  /* Add proper top padding to avoid navbar overlap */
  padding-top: 120px;
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 100px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    padding-top: 90px;
  }
`;

const MainCard = styled.div`
  background: rgba(15, 20, 25, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px) saturate(150%);
  -webkit-backdrop-filter: blur(15px) saturate(150%);
`;

const Header = styled.div`
  background: rgba(10, 15, 20, 0.7);
  padding: 1.5rem;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-radius: 8px;
  margin: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:hover {
    background: rgba(15, 20, 25, 0.8);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const SiteAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
    animation: rotate 2s linear infinite;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const HeaderTitle = styled.h1`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const HeaderSubtitle = styled.p`
  color: #b9bbbe;
  font-size: 0.9rem;
  margin: 0;
`;

const SearchContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #40444b;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #ffffff;
  font-size: 1rem;
  z-index: 2;
  pointer-events: none;
`;

const SearchInput = styled.input`
  background: rgba(10, 15, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 25px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  color: #ffffff;
  font-size: 0.9rem;
  width: 100%;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #72767d;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(15, 20, 25, 0.7);
    backdrop-filter: blur(12px) saturate(140%);
    -webkit-backdrop-filter: blur(12px) saturate(140%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(12, 17, 22, 0.65);
  }
`;

const ActionButton = styled.button`
  background: #6b7280;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: #9ca3af;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background: #4f545c;
    cursor: not-allowed;
  }
`;

const LoggingContainer = styled.div`
  background: transparent;
  overflow-y: auto;
  max-height: 60vh;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
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

const CategoryItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.25rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(79, 84, 92, 0.3);
  }
`;

const CategoryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryMenuIcon = styled.div`
  margin-right: 0.2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const CategoryName = styled.h3`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const SetChannelButton = styled.button`
  background: rgba(79, 84, 92, 0.2);
  color: #dcddde;
  border: 1px solid rgba(79, 84, 92, 0.3);
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 36px;
  
  &:hover {
    background: rgba(79, 84, 92, 0.4);
    color: #ffffff;
  }
`;

const RemoveChannelButton = styled.button`
  background: rgba(79, 84, 92, 0.2);
  color: #dcddde;
  border: 1px solid rgba(79, 84, 92, 0.3);
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.6rem;
  min-width: 24px;
  height: 24px;
  
  &:hover {
    background: rgba(79, 84, 92, 0.4);
    color: #ffffff;
    border-color: rgba(79, 84, 92, 0.5);
  }
`;

const ChannelText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
`;

const ButtonChannelIcon = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #72767d;
`;

const SubCategoryContainer = styled.div`
  background: rgba(20, 25, 30, 0.7);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  max-height: ${props => props.expanded ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.25s ease-out;
  will-change: max-height;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const SubCategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
  border-radius: 6px;
  margin: 0.125rem 0.5rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(79, 84, 92, 0.3);
  }
`;

const SubCategoryName = styled.span`
  color: #dcddde;
  font-size: 0.9rem;
`;

const SubChannelButton = styled.button`
  background: rgba(79, 84, 92, 0.2);
  color: #dcddde;
  border: 1px solid rgba(79, 84, 92, 0.3);
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 32px;
  
  &:hover {
    background: rgba(79, 84, 92, 0.4);
    color: #ffffff;
  }
`;

const ChannelModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
`;

const ModalContent = styled.div`
  background: rgba(15, 20, 25, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  width: 90%;
  max-width: 500px;
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
`;

const ModalHeader = styled.div`
  background: rgba(10, 15, 20, 0.8);
  padding: 1.75rem;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-radius: 10px;
  margin: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: rgba(15, 20, 25, 0.85);
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #8e9297;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #ffffff;
  }
`;

const ModalSubtitle = styled.p`
  color: #b9bbbe;
  font-size: 0.9rem;
  margin: 0;
  padding: 0 0 0.5rem 0;
`;

const ChannelList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem;
  
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

const ChannelCategoryItem = styled.div`
  margin-bottom: 0.5rem;
`;

const ChannelCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(79, 84, 92, 0.16);
  }
`;

const ChannelCategoryArrow = styled.span`
  color: #8e9297;
  font-size: 1rem;
  transition: transform 0.2s;
  transform: ${props => props.expanded ? 'rotate(0deg)' : 'rotate(-90deg)'};
`;

const ChannelCategoryName = styled.span`
  color: #8e9297;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const ChannelGroup = styled.div`
  display: ${props => props.expanded ? 'block' : 'none'};
  margin-left: 0.5rem;
`;

const ChannelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(79, 84, 92, 0.16);
  }
`;

const ChannelIcon = styled.span`
  color: #8e9297;
  font-size: 1rem;
`;

const ChannelName = styled.span`
  color: #dcddde;
  font-size: 0.9rem;
`;

const SaveBanner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: #1a202c;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  display: ${props => (props.show || props.animatingOut) ? 'flex' : 'none'};
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: ${props => {
    if (props.animatingOut) return 'translateY(150%) scale(0.95)';
    return props.show ? 'translateY(0) scale(1)' : 'translateY(150%) scale(0.95)';
  }};
  opacity: ${props => props.animatingOut ? '0' : '1'};
  transition: all 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const SaveBannerText = styled.span`
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const SaveBannerButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SaveButton = styled.button`
  background: rgba(79, 84, 92, 0.2);
  color: #dcddde;
  border: 1px solid rgba(79, 84, 92, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &:hover:not(:disabled) {
    background: rgba(79, 84, 92, 0.4);
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background: rgba(79, 84, 92, 0.1);
    color: #72767d;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResetButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  color: #dcddde;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MassEditHeader = styled.div`
  background: rgba(15, 20, 25, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MassEditCounter = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
`;

const TypeCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 0.75rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 2px solid #6b7280;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
  
  &:checked {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  
  &:checked::after {
    content: '✓';
    position: absolute;
    top: -2px;
    left: 1px;
    color: white;
    font-size: 12px;
    font-weight: bold;
  }
  
  &:hover {
    border-color: #9ca3af;
  }
`;

const CategoryCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 2px solid #6b7280;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
  
  &:checked {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  
  &:checked::after {
    content: '✓';
    position: absolute;
    top: -2px;
    left: 2px;
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  
  &:hover {
    border-color: #9ca3af;
  }
`;



const Dashboard = ({ user, onLogin, onLogout }) => {
  const { serverId: pathServerId } = useParams();
  const location = useLocation();
  
  // Get serverId from query parameters (?server=123) or URL path (/dashboard/123)
  const getServerId = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('server') || pathServerId;
  };
  
  const serverId = getServerId();
  useEffect(() => {
    console.log('🔍 Dashboard serverId from query/path:', serverId);
    console.log('🔍 Current URL:', window.location.href);
    console.log('🔍 Query params:', location.search);
  }, [serverId, location]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [serverChannels, setServerChannels] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [channelError, setChannelError] = useState(null);
  const [expandedChannelCategories, setExpandedChannelCategories] = useState({});
  const [selectedChannels, setSelectedChannels] = useState({});
  const [savedChannels, setSavedChannels] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [botData, setBotData] = useState(null);
  const [isMassEditMode, setIsMassEditMode] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(new Set());

  const logCategories = [
    {
      name: 'Applications',
      subcategories: [
        'App Add',
        'App Remove',
        'App Update',
        'App Command Permission Update'
      ]
    },
    {
      name: 'Channels',
      subcategories: [
        'Channel Create',
        'Channel Delete',
        'Channel Edit',
        'Channel Permissions',
        'Channel Topic',
        'Channel Name',
        'Channel Slowmode',
        'Channel NSFW',
        'Channel Category',
        'Channel Limit'
      ]
    },
    {
      name: 'Discord AutoMod',
      subcategories: [
        'AutoMod Rule Create',
        'AutoMod Rule Delete',
        'AutoMod Rule Update',
        'AutoMod Action Execution'
      ]
    },
    {
      name: 'Emojis',
      subcategories: [
        'Emoji Create',
        'Emoji Delete',
        'Emoji Name',
        'Emoji Roles'
      ]
    },
    {
      name: 'Events',
      subcategories: [
        'Event Create',
        'Event Delete',
        'Event Update',
        'Event User Add',
        'Event User Remove'
      ]
    },
    {
      name: 'Invites',
      subcategories: [
        'Invite Create',
        'Invite Delete'
      ]
    },
    {
      name: 'Messages',
      subcategories: [
        'Message Delete',
        'Message Bulk Delete',
        'Message Edit',
        'Message Publish',
        'Message Command'
      ]
    },
    {
      name: 'Polls',
      subcategories: [
        'Poll Create',
        'Poll Delete', 
        'Poll Finalize',
        'Poll Votes Add',
        'Poll Votes Remove'
      ]
    },
    {
      name: 'Roles',
      subcategories: [
        'Role Create',
        'Role Delete',
        'Role Update',
        'Role Permissions'
      ]
    },
    {
      name: 'Stage',
      subcategories: [
        'Stage Instance Create',
        'Stage Instance Delete',
        'Stage Instance Update'
      ]
    },
    {
      name: 'Server',
      subcategories: [
        'Server Name Update',
        'Server Avatar Update',
        'Server Banner Update',
        'User Kick',
        'User Leave',
        'User Join',
        'Ban Add',
        'Ban Remove',
        'AFK Channel Update',
        'Message Notification Update',
        'Discovery Splash Update',
        'Server Icon Update',
        'MFA Update',
        'Server Description Update',
        'Server Owner Update',
        'Server Boost Level Update',
        'Server Rules Channel Update',
        'Server Vanity Update',
        'Verification Level Update',
        'Server Widget Update',
        'Verified Update',
        'Onboarding Channel Update',
        'Onboarding Question Add',
        'Onboarding Question Remove',
        'Onboarding Question Update'
      ]
    },
    {
      name: 'Stickers',
      subcategories: [
        'Sticker Create',
        'Sticker Delete',
        'Sticker Update'
      ]
    },
    {
      name: 'Soundboard',
      subcategories: [
        'Soundboard Sound Create',
        'Soundboard Sound Delete',
        'Soundboard Sound Update'
      ]
    },
    {
      name: 'Threads',
      subcategories: [
        'Thread Create',
        'Thread Delete',
        'Thread Update',
        'Thread Member Update'
      ]
    },
    {
      name: 'Users',
      subcategories: [
        'User Name',
        'User Role Add',
        'User Role Remove',
        'User Avatar',
        'User Timeout',
        'User Timeout Remove'
      ]
    },
    {
      name: 'Voice',
      subcategories: [
        'Voice Join',
        'Voice Leave',
        'Voice Move',
        'Voice Mute',
        'Voice Unmute',
        'Voice Deafen',
        'Voice Undeafen',
        'Voice Self Mute',
        'Voice Self Unmute',
        'Voice Self Deafen',
        'Voice Self Undeafen',
        'Voice Stage',
        'Voice Unstage'
      ]
    },
    {
      name: 'Webhooks',
      subcategories: [
        'Webhook Create',
        'Webhook Delete',
        'Webhook Update'
      ]
    },
    {
      name: 'Moderation',
      subcategories: [
        'Auto Moderation Ban Add',
        'Ban Remove',
        'Case Delete',
        'Mass Case Delete',
        'Case Update',
        'Kick Add',
        'Mute Add',
        'Mute Remove',
        'User Note Remove',
        'User Note Add'
      ]
    }
  ];


  const fetchBotData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/bot/status`);
      if (response.ok) {
        const data = await response.json();
        setBotData(data);
        console.log('Bot data fetched:', data);
      }
    } catch (error) {
      console.error('Error fetching bot data:', error);
    }
  };

  const fetchServerChannels = async (serverId) => {
    if (!serverId) return;
    
    setLoadingChannels(true);
    setChannelError(null); 
    try {
      const authToken = localStorage.getItem('authToken');
      console.log('Fetching channels for server:', serverId);
      
      const response = await fetch(`http://localhost:3001/api/servers/${serverId}/channels`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('API Error:', errorData);
        
        if (response.status === 403) {
          throw new Error('Bot does not have access to this server');
        } else if (response.status === 404) {
          throw new Error('Server not found');
        } else {
          throw new Error(errorData.message || `Failed to fetch channels: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('Channels data received:', data);
      
      if (data.success && data.channels) {
        setServerChannels(data.channels);
        console.log('Channels set:', data.channels);
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching server channels:', error);
      setChannelError(error.message);
      setServerChannels([]);
    } finally {
      setLoadingChannels(false);
    }
  };

  useEffect(() => {
    // Fetch bot data when component mounts
    fetchBotData();
  }, []);

  useEffect(() => {
    if (serverId) {
      console.log('Dashboard loaded with serverId from URL:', serverId);
      fetchServerChannels(serverId);
    } else {
      console.log('No serverId found in URL - please select a server from ServerSelect');
      setChannelError('Please select a server from the Server Select page to view its channels.');
    }
  }, [serverId]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const openChannelModal = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowChannelModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeChannelModal = () => {
    setShowChannelModal(false);
    setSelectedCategory(null);
    document.body.style.overflow = 'unset';
  };

  const selectChannel = (channel, categoryName) => {
    // Handle mass edit mode
    if (selectedCategory === 'Mass Edit - Set Channel') {
      selectChannelForMassEdit(channel);
      return;
    }
    
    // Handle set all types mode
    if (selectedCategory === 'Set All Types') {
      selectChannelForAllTypes(channel);
      return;
    }
    
    setSelectedChannels(prev => {
      const newChannels = {
        ...prev,
        [categoryName]: channel
      };
      
      const hasChanges = JSON.stringify(newChannels) !== JSON.stringify(savedChannels);
      setHasUnsavedChanges(hasChanges);
      
      return newChannels;
    });
    closeChannelModal();
  };

  const removeChannel = (categoryName, e) => {
    e.stopPropagation();
    console.log('Removing channel for category:', categoryName);
    setSelectedChannels(prev => {
      const newChannels = { ...prev };
      delete newChannels[categoryName];
      
      console.log('Channels after removal:', newChannels);
      console.log('Current savedChannels:', savedChannels);
      
      const hasChanges = JSON.stringify(newChannels) !== JSON.stringify(savedChannels);
      setHasUnsavedChanges(hasChanges);
      
      console.log('Has unsaved changes after removal:', hasChanges);
      
      return newChannels;
    });
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      
      console.log('Saving channel configurations:', selectedChannels);
      console.log('Current savedChannels before save:', savedChannels);
      

      const configToSave = { ...selectedChannels };
      localStorage.setItem(`channelConfig_${serverId}`, JSON.stringify(configToSave));
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3001/api/config/servers/${serverId}/config`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            channelConfigurations: configToSave
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Bot configuration updated successfully:', result);
        } else {
          console.error('❌ Failed to update bot configuration:', response.status);
          // Still continue with local save even if bot update fails
        }
      } catch (apiError) {
        console.error('❌ Error communicating with bot API:', apiError);
        // Still continue with local save even if bot update fails
      }
      
      setSavedChannels(configToSave);
      setHasUnsavedChanges(false);
      
      console.log('Saved configuration:', configToSave);
      
      // Exit mass edit mode and trigger animation on save
      setIsMassEditMode(false);
      setSelectedTypes(new Set());
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
      }, 1200);
      
    } catch (error) {
      console.error('Error saving channel configurations:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetChanges = () => {
    setSelectedChannels({ ...savedChannels });
    setHasUnsavedChanges(false);
    
    // Exit mass edit mode and trigger animation on reset
    setIsMassEditMode(false);
    setSelectedTypes(new Set());
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
    }, 1200);
  };

  const handleTypeSelection = (typeName, isChecked) => {
    const newSelectedTypes = new Set(selectedTypes);
    if (isChecked) {
      newSelectedTypes.add(typeName);
    } else {
      newSelectedTypes.delete(typeName);
    }
    setSelectedTypes(newSelectedTypes);
  };

  const handleCategorySelection = (categoryName, isChecked) => {
    const category = logCategories.find(cat => cat.name === categoryName);
    const newSelectedTypes = new Set(selectedTypes);
    
    if (isChecked) {
      // Add category and all its subcategories
      newSelectedTypes.add(categoryName);
      category.subcategories.forEach(sub => newSelectedTypes.add(sub));
    } else {
      // Remove category and all its subcategories
      newSelectedTypes.delete(categoryName);
      category.subcategories.forEach(sub => newSelectedTypes.delete(sub));
    }
    setSelectedTypes(newSelectedTypes);
  };

  const handleMassSetChannel = () => {
    if (selectedTypes.size === 0) return;
    setSelectedCategory('Mass Edit - Set Channel');
    setShowChannelModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMassRemoveChannel = () => {
    if (selectedTypes.size === 0) return;
    
    const newChannels = { ...selectedChannels };
    selectedTypes.forEach(typeName => {
      delete newChannels[typeName];
    });
    
    setSelectedChannels(newChannels);
    const hasChanges = JSON.stringify(newChannels) !== JSON.stringify(savedChannels);
    setHasUnsavedChanges(hasChanges);
    
    // Keep mass edit mode active, only clear selections
    setSelectedTypes(new Set());
  };

  const selectChannelForMassEdit = (channel) => {
    const newChannels = { ...selectedChannels };
    selectedTypes.forEach(typeName => {
      newChannels[typeName] = channel;
    });
    
    setSelectedChannels(newChannels);
    const hasChanges = JSON.stringify(newChannels) !== JSON.stringify(savedChannels);
    setHasUnsavedChanges(hasChanges);
    
    // Keep mass edit mode active, only close modal and clear selections
    setSelectedTypes(new Set());
    closeChannelModal();
  };

  const selectChannelForAllTypes = (channel) => {
    const newChannels = { ...selectedChannels };
    
    // Set all categories and subcategories to the selected channel
    logCategories.forEach(category => {
      newChannels[category.name] = channel;
      category.subcategories.forEach(subcategory => {
        newChannels[subcategory] = channel;
      });
    });
    
    setSelectedChannels(newChannels);
    const hasChanges = JSON.stringify(newChannels) !== JSON.stringify(savedChannels);
    setHasUnsavedChanges(hasChanges);
    
    closeChannelModal();
  };

  const handleRemoveAllChannels = () => {
    const newChannels = {};
    
    // Remove all channels by creating empty object (no channels set)
    setSelectedChannels(newChannels);
    const hasChanges = JSON.stringify(newChannels) !== JSON.stringify(savedChannels);
    setHasUnsavedChanges(hasChanges);
  };
  useEffect(() => {
    if (serverId) {
      const savedConfig = localStorage.getItem(`channelConfig_${serverId}`);
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          console.log('Loading saved config:', parsedConfig);
          setSelectedChannels(parsedConfig);
          setSavedChannels(parsedConfig);
          setHasUnsavedChanges(false);
        } catch (error) {
          console.error('Error loading saved configuration:', error);
        }
      } else {
        setSelectedChannels({});
        setSavedChannels({});
        setHasUnsavedChanges(false);
      }
    }
  }, [serverId]);

  const toggleChannelCategory = (categoryId) => {
    setExpandedChannelCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };


  const getDiscordChannelIcon = (channel) => {
    return '#';
  };


  const organizeChannelsByCategory = (channels) => {
    const categories = {};
    const uncategorizedChannels = [];

    channels.forEach(channel => {
      if (channel.type === 0 || channel.type === 5) {
        if (channel.parentId) {
          const category = channels.find(c => c.id === channel.parentId && c.type === 4);
          if (category) {
            if (!categories[category.id]) {
              categories[category.id] = {
                name: category.name,
                channels: []
              };
            }
            categories[category.id].channels.push(channel);
          } else {
            uncategorizedChannels.push(channel);
          }
        } else {
          uncategorizedChannels.push(channel);
        }
      }
    });

    return { categories, uncategorizedChannels };
  };

  const filteredCategories = logCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout user={user} onLogin={onLogin} onLogout={onLogout} currentPage="logging">
      <SaveBanner show={hasUnsavedChanges} animatingOut={isAnimatingOut}>
        <SaveBannerText>Careful — you have unsaved changes!</SaveBannerText>
        <SaveBannerButtons>
          <ResetButton onClick={resetChanges} disabled={isSaving}>Reset</ResetButton>
          <SaveButton onClick={saveChanges} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </SaveBannerButtons>
      </SaveBanner>

      <SearchContainer>
        <SearchInputContainer>
          <SearchIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search for types"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputContainer>
        <ActionButton onClick={() => fetchServerChannels(serverId)}>
          {loadingChannels ? 'Syncing...' : 'Sync Channels'}
        </ActionButton>
        {!isMassEditMode ? (
          <>
            <ActionButton onClick={() => {
              setSelectedCategory('Set All Types');
              setShowChannelModal(true);
              document.body.style.overflow = 'hidden';
            }}>Set channel for all types</ActionButton>
            <ActionButton onClick={handleRemoveAllChannels}>Remove channel for all types</ActionButton>
            <ActionButton onClick={() => setIsMassEditMode(true)}>Mass edit</ActionButton>
          </>
        ) : (
          <>
            <ActionButton onClick={() => {
              setIsMassEditMode(false);
              setSelectedTypes(new Set());
            }} style={{background: '#e21818'}}>Cancel</ActionButton>
            <ActionButton onClick={handleMassSetChannel} disabled={selectedTypes.size === 0} style={{background: selectedTypes.size > 0 ? '#3b82f6' : '#6b7280'}}>
              Set channel
            </ActionButton>
            <ActionButton onClick={handleMassRemoveChannel} disabled={selectedTypes.size === 0} style={{background: selectedTypes.size > 0 ? '#3b82f6' : '#6b7280'}}>
              Remove channel
            </ActionButton>
          </>
        )}
      </SearchContainer>


      <LoggingContainer>
      {filteredCategories.map((category) => (
        <CategoryItem key={category.name}>
          <CategoryHeader onClick={() => toggleCategory(category.name)}>
            <CategoryLeft>
              <CategoryMenuIcon>
                <Menu size={16} />
              </CategoryMenuIcon>
              {isMassEditMode && (
                <CategoryCheckbox
                  type="checkbox"
                  checked={selectedTypes.has(category.name)}
                  onChange={(e) => handleCategorySelection(category.name, e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <CategoryName>{category.name}</CategoryName>
            </CategoryLeft>
            <SetChannelButton 
              onClick={(e) => {
                e.stopPropagation();
                if (!e.target.closest('button[data-remove]')) {
                  openChannelModal(category.name);
                }
              }}
            >
              {selectedChannels[category.name] ? (
                <>
                  <ButtonChannelIcon>#</ButtonChannelIcon>
                  <ChannelText>{selectedChannels[category.name].name}</ChannelText>
                  <RemoveChannelButton data-remove onClick={(e) => removeChannel(category.name, e)}>
                    ×
                  </RemoveChannelButton>
                </>
              ) : (
                'Set category channel'
              )}
            </SetChannelButton>
          </CategoryHeader>
          
          {category.subcategories.length > 0 && (
            <SubCategoryContainer expanded={expandedCategories[category.name]}>
              {category.subcategories.map((subcategory) => (
                <SubCategoryItem key={subcategory}>
                  <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
                    {isMassEditMode && (
                      <TypeCheckbox
                        type="checkbox"
                        checked={selectedTypes.has(subcategory)}
                        onChange={(e) => handleTypeSelection(subcategory, e.target.checked)}
                      />
                    )}
                    <SubCategoryName>{subcategory}</SubCategoryName>
                  </div>
                  <SubChannelButton 
                    onClick={(e) => {
                      if (!e.target.closest('button[data-remove]')) {
                        openChannelModal(subcategory);
                      }
                    }}
                  >
                    {selectedChannels[subcategory] ? (
                      <>
                        <ButtonChannelIcon>#</ButtonChannelIcon>
                        <ChannelText>{selectedChannels[subcategory].name}</ChannelText>
                        <RemoveChannelButton data-remove onClick={(e) => removeChannel(subcategory, e)}>
                          ×
                        </RemoveChannelButton>
                      </>
                    ) : (
                      'Set channel'
                    )}
                  </SubChannelButton>
                </SubCategoryItem>
              ))}
            </SubCategoryContainer>
          )}
        </CategoryItem>
      ))}
      </LoggingContainer>

      <ChannelModal show={showChannelModal} onClick={closeChannelModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <div>
              <ModalTitle>{selectedCategory}</ModalTitle>
              <ModalSubtitle>Choose a Discord channel for this logging category</ModalSubtitle>
            </div>
            <CloseButton onClick={closeChannelModal}>×</CloseButton>
          </ModalHeader>
          <ChannelList>
            {loadingChannels ? (
              <ChannelItem>
                <ChannelName style={{color: '#b9bbbe', fontStyle: 'italic'}}>
                  Loading channels...
                </ChannelName>
              </ChannelItem>
            ) : (
              <>
                {serverChannels.length > 0 ? (
                  (() => {
                    const { categories, uncategorizedChannels } = organizeChannelsByCategory(serverChannels);
                    
                    return (
                      <>
                        {uncategorizedChannels.length > 0 && (
                          <ChannelCategoryItem>
                            <ChannelCategoryHeader onClick={() => toggleChannelCategory('uncategorized')}>
                              <ChannelCategoryName>Text Channels</ChannelCategoryName>
                              <ChannelCategoryArrow expanded={expandedChannelCategories['uncategorized'] !== false}>
                                ▾
                              </ChannelCategoryArrow>
                            </ChannelCategoryHeader>
                            <ChannelGroup expanded={expandedChannelCategories['uncategorized'] !== false}>
                              {uncategorizedChannels.map((channel) => (
                                <ChannelItem key={channel.id} onClick={() => selectChannel(channel, selectedCategory)}>
                                  <ChannelIcon>{getDiscordChannelIcon(channel)}</ChannelIcon>
                                  <ChannelName>{channel.name}</ChannelName>
                                </ChannelItem>
                              ))}
                            </ChannelGroup>
                          </ChannelCategoryItem>
                        )}
                        

                        {Object.entries(categories).map(([categoryId, category]) => (
                          <ChannelCategoryItem key={categoryId}>
                            <ChannelCategoryHeader onClick={() => toggleChannelCategory(categoryId)}>
                              <ChannelCategoryName>{category.name}</ChannelCategoryName>
                              <ChannelCategoryArrow expanded={expandedChannelCategories[categoryId] !== false}>
                                ▾
                              </ChannelCategoryArrow>
                            </ChannelCategoryHeader>
                            <ChannelGroup expanded={expandedChannelCategories[categoryId] !== false}>
                              {category.channels.map((channel) => (
                                <ChannelItem key={channel.id} onClick={() => selectChannel(channel, selectedCategory)}>
                                  <ChannelIcon>{getDiscordChannelIcon(channel)}</ChannelIcon>
                                  <ChannelName>{channel.name}</ChannelName>
                                </ChannelItem>
                              ))}
                            </ChannelGroup>
                          </ChannelCategoryItem>
                        ))}
                      </>
                    );
                  })()
                ) : (
                  <ChannelItem>
                    <ChannelName style={{color: '#ef4444', fontStyle: 'italic'}}>
                      {channelError || 'Failed to load server channels. Please try again.'}
                    </ChannelName>
                  </ChannelItem>
                )}
                
                <ChannelItem>
                  <ChannelName style={{color: '#b9bbbe', fontStyle: 'italic'}}>
                    Channel not found?
                  </ChannelName>
                </ChannelItem>
                <ChannelItem>
                  <ChannelName style={{color: '#7289da'}}>
                    Use other channel
                  </ChannelName>
                </ChannelItem>
              </>
            )}
          </ChannelList>
        </ModalContent>
      </ChannelModal>
    </DashboardLayout>
  );
};

export default Dashboard;