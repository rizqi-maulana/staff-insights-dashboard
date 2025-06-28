
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Bell, Home, UserPlus, Settings, Power } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Sidebar: React.FC = () => {
  const { resetServerName } = useAppContext();

  const handleResetServer = () => {
    if (window.confirm('Are you sure you want to reset the server and logout? You will be redirected to the home page.')) {
      resetServerName();
    }
  };

  return (
    <nav className="bg-primary text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <div className="space-y-2">
        <NavItem to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
        <NavItem to="/staff" icon={<Users size={20} />} label="Staff List" />
        <NavItem to="/staff/add" icon={<UserPlus size={20} />} label="Add Staff" />
        <NavItem to="/staff-management" icon={<Settings size={20} />} label="Staff Management" />
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        <NavItem to="/notifications" icon={<Bell size={20} />} label="Notifications" />
      </div>

      {/* System Category */}
      <div className="mt-8 pt-4 border-t border-white/20">
        <h3 className="text-sm font-medium text-white/70 mb-2 px-3">System</h3>
        <button
          onClick={handleResetServer}
          className="flex items-center p-3 rounded-lg transition-all w-full text-left hover:bg-red-600/20 text-red-300 hover:text-red-200"
        >
          <span className="mr-3"><Power size={20} /></span>
          <span>Reset Server & Logout</span>
        </button>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-all ${
          isActive ? 'bg-white text-primary font-medium shadow-md' : 'hover:bg-primary-600 hover:bg-opacity-50'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
