
import React, { useState } from 'react';
import { Bell, LogOut, Sparkles } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import UpdateNotificationModal from './modals/UpdateNotificationModal';

const Header: React.FC = () => {
  const { logout, notifications, appUpdates, appVersion, hasUnreadUpdates, markUpdatesAsRead } = useAppContext();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const handleOpenUpdates = () => {
    setIsUpdateModalOpen(true);
    markUpdatesAsRead();
  };

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Staff Management System</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleOpenUpdates}
          className="relative"
          title="What's New"
        >
          <Sparkles size={20} className="text-white hover:text-accent transition-colors" />
          {hasUnreadUpdates && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5">
              New
            </Badge>
          )}
        </button>
        
        <Link to="/notifications" className="relative">
          <Bell size={20} className="text-white hover:text-accent transition-colors" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5">
              {unreadCount}
            </Badge>
          )}
        </Link>
        
        <button 
          onClick={logout}
          className="flex items-center text-white hover:text-accent transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
          <span className="ml-1 hidden md:inline">Logout</span>
        </button>
      </div>
      
      <UpdateNotificationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        updates={appUpdates}
        currentVersion={appVersion}
      />
    </header>
  );
};

export default Header;
