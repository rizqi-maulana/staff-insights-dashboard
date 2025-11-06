
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAppContext } from '../contexts/AppContext';
import ServerFormModal from '../components/modals/ServerFormModal';
import LoginFormModal from '../components/modals/LoginFormModal';
import { Settings } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.png';

const LandingPage: React.FC = () => {
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { serverAddress, isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);
  
  const handleGetStarted = () => {
    if (!serverAddress) {
      setIsServerModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Logo/Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">ScanHadir</h1>
            <p className="text-muted-foreground">Staff Management Dashboard</p>
          </div>
          
          {/* Illustration */}
          <div className="relative mx-auto w-full max-w-md">
            <img 
              src={heroImage} 
              alt="Staff Management" 
              className="w-full h-auto rounded-xl"
            />
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground max-w-md mx-auto">
            Kelola absensi dengan mudah dan efisien. Mulai tingkatkan produktivitas tim Anda sekarang.
          </p>
          
          {/* Action Button */}
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="w-full max-w-xs mx-auto"
          >
            Mulai
          </Button>
          
          {/* Server Status */}
          {serverAddress ? (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Connected: {serverAddress}</span>
            </div>
          ) : (
            <button 
              onClick={() => setIsServerModalOpen(true)}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <Settings className="w-4 h-4" />
              Configure Server
            </button>
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
