import React, { useEffect } from 'react';
import styled from 'styled-components';

const CallbackContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2d3748;
  color: #ffffff;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const AuthCallback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      let code; 
      try {
        const urlParams = new URLSearchParams(window.location.search);
        code = urlParams.get('code');
        const error = urlParams.get('error');
        const state = urlParams.get('state');

        console.log('Processing Discord callback...');
        console.log('Code received:', code?.substring(0, 10) + '...');

        if (error) {
          throw new Error(`Discord OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }


        const processedCodes = JSON.parse(localStorage.getItem('processedCodes') || '[]');
        if (processedCodes.includes(code)) {
          console.log(' Code already processed, skipping...');
          window.close();
          return;
        }
        

        processedCodes.push(code);
        localStorage.setItem('processedCodes', JSON.stringify(processedCodes.slice(-5))); 

        try {
          const testResponse = await fetch('http://localhost:3001/api/auth/discord/url');
        } catch (testError) {
          throw new Error('Cannot connect to server. Please ensure the server is running on port 3001.');
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); 
        
        const response = await fetch('http://localhost:3001/api/auth/discord/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        const data = await response.json();
        
        if (!response.ok) {
          if (data.code === 'INVALID_GRANT') {
            throw new Error('Discord authorization code has expired. Please try logging in again.');
          }
          throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        if (data.success) {
          if (window.opener) {
            window.opener.postMessage({
              type: 'DISCORD_AUTH_SUCCESS',
              user: data.user,
              token: data.token,
              guilds: data.guilds
            }, window.location.origin);
            
            setTimeout(() => {
              window.close();
            }, 1000);
          } else {
            console.error('No window.opener found');
            window.close();
          }
        } else {
          throw new Error(data.message || 'Authentication failed');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        
        let errorMessage = error.message;
        if (error.message.includes('Failed to fetch') || error.message.includes('Cannot connect to server')) {
          
          if (window.opener && code) {
            window.opener.postMessage({
              type: 'DISCORD_AUTH_CODE',
              code: code
            }, window.location.origin);
            
            setTimeout(() => {
              window.close();
            }, 1000);
            return; 
          }
        } else if (error.message.includes('already used') || error.message.includes('authorization code has expired')) {
          errorMessage = 'Authorization code expired or already used. Please try logging in again.';
        } else if (error.name === 'AbortError') {
          errorMessage = 'Request timeout. Server took too long to respond.';
        }
        
        if (window.opener && !error.message.includes('already used')) {
          window.opener.postMessage({
            type: 'DISCORD_AUTH_ERROR',
            error: errorMessage
          }, window.location.origin);
        }
        
        setTimeout(() => {
          window.close();
        }, 1000);
      }
    };

    handleCallback();
  }, []);

  return (
    <CallbackContainer>
      <LoadingMessage>
        Completing authentication...
      </LoadingMessage>
    </CallbackContainer>
  );
};

export default AuthCallback;
