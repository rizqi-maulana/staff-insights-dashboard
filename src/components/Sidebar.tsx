
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Bell, Home } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-primary text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <div className="space-y-2">
        <NavItem to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
        <NavItem to="/staff" icon={<Users size={20} />} label="Staff List" />
        <NavItem to="/notifications" icon={<Bell size={20} />} label="Notifications" />
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
