
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAppContext } from '../contexts/AppContext';
import ServerFormModal from '../components/modals/ServerFormModal';
import LoginFormModal from '../components/modals/LoginFormModal';
import { Clock, Users, BarChart3, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.png';

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
  
  const features = [
    {
      icon: Clock,
      title: "Smart Attendance",
      description: "Track staff attendance with precision and ease"
    },
    {
      icon: Users,
      title: "Staff Management",
      description: "Manage your entire team from one dashboard"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get insights with powerful data visualization"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your data"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Staff Management
                <span className="block text-primary mt-2">Made Simple</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Kelola absensi dengan mudah dan efisien bersama ScanHadir Dashboard. 
                Mulai tingkatkan produktivitas tim Anda sekarang!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={handleLogin}
                className="text-lg px-8 py-6 hover-scale"
              >
                Mulai Pengaturan
              </Button>
              
              {!serverAddress && (
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleServerConnect}
                  className="text-lg px-8 py-6 hover-scale"
                >
                  Connect Server
                </Button>
              )}
            </div>
            
            {serverAddress && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Connected to: {serverAddress}
              </div>
            )}
          </div>
          
          {/* Right Image */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-3xl rounded-full" />
            <img 
              src={heroImage} 
              alt="Staff Management Dashboard Illustration" 
              className="relative w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mt-20 md:mt-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Fitur Unggulan
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover-scale transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
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
