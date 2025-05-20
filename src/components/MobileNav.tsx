
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Bell } from 'lucide-react';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleNav}
        className="fixed bottom-4 right-4 z-30 p-3 bg-primary text-white rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleNav}>
          <div 
            className="fixed bottom-0 left-0 right-0 bg-primary p-4 rounded-t-xl z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2">
              <MobileNavItem 
                to="/dashboard" 
                icon={<Home size={20} />} 
                label="Dashboard" 
                onClick={toggleNav}
              />
              <MobileNavItem 
                to="/staff" 
                icon={<Users size={20} />} 
                label="Staff List" 
                onClick={toggleNav}
              />
              <MobileNavItem 
                to="/notifications" 
                icon={<Bell size={20} />} 
                label="Notifications" 
                onClick={toggleNav}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-4 rounded-lg transition-colors ${
          isActive ? 'bg-white text-primary font-medium' : 'text-white hover:bg-primary-600 hover:bg-opacity-50'
        }`
      }
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default MobileNav;
