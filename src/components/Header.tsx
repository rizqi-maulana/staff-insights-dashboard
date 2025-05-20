
import React, { useState } from 'react';
import { Bell, LogOut, RefreshCw } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const { logout, notifications, resetServerName } = useAppContext();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Staff Management System</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={resetServerName}
          className="flex items-center text-white hover:text-accent transition-colors"
          title="Reset Server Name"
        >
          <RefreshCw size={20} />
          <span className="ml-1 hidden md:inline">Reset Server</span>
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
    </header>
  );
};

export default Header;
