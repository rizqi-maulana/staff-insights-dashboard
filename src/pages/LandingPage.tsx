
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAppContext } from '../contexts/AppContext';
import ServerFormModal from '../components/modals/ServerFormModal';
import LoginFormModal from '../components/modals/LoginFormModal';

const LandingPage: React.FC = () => {
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { serverAddress, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);
  
  const handleServerConnect = () => {
    setIsServerModalOpen(true);
  };
  
  const handleLogin = () => {
    if (!serverAddress) {
      setIsServerModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage your staff efficiently</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleServerConnect}
            className="w-full"
          >
            Connect to Server
          </Button>
          
          <Button 
            onClick={handleLogin}
            className="w-full"
            disabled={!serverAddress}
          >
            Login
          </Button>
          
          {serverAddress && (
            <p className="text-sm text-gray-500">
              Connected to: {serverAddress}
            </p>
          )}
        </div>
      </div>
      
      <ServerFormModal 
        isOpen={isServerModalOpen} 
        onClose={() => setIsServerModalOpen(false)} 
      />
      
      <LoginFormModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
