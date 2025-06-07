
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Bell, Home, UserPlus, Settings } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAppContext } from '../contexts/AppContext';

const Sidebar: React.FC = () => {
  const { 
    activateAllStaff, 
    deactivateAllStaff, 
    resetAllDevices, 
    refreshAllQRCodes, 
    deleteAllStaff 
  } = useAppContext();

  return (
    <nav className="bg-primary text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      
      <div className="space-y-2">
        <NavItem to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
        <NavItem to="/staff" icon={<Users size={20} />} label="Staff List" />
        <NavItem to="/staff/add" icon={<UserPlus size={20} />} label="Add Staff" />
        <NavItem to="/notifications" icon={<Bell size={20} />} label="Notifications" />
        
        <div className="pt-4">
          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center p-3 rounded-lg transition-all hover:bg-primary-600 hover:bg-opacity-50 text-white cursor-pointer">
                <Settings size={20} className="mr-3" />
                <span>Staff Management</span>
              </MenubarTrigger>
              <MenubarContent className="bg-white text-black border border-gray-200 shadow-lg">
                <MenubarItem 
                  onClick={activateAllStaff}
                  className="cursor-pointer hover:bg-green-50 text-green-700"
                >
                  Activate All Accounts
                </MenubarItem>
                <MenubarItem 
                  onClick={deactivateAllStaff}
                  className="cursor-pointer hover:bg-orange-50 text-orange-700"
                >
                  Deactivate All Accounts
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem 
                  onClick={resetAllDevices}
                  className="cursor-pointer hover:bg-blue-50 text-blue-700"
                >
                  Reset All Device Accounts
                </MenubarItem>
                <MenubarItem 
                  onClick={refreshAllQRCodes}
                  className="cursor-pointer hover:bg-purple-50 text-purple-700"
                >
                  Refresh All QR Codes
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem 
                  onClick={deleteAllStaff}
                  className="cursor-pointer hover:bg-red-50 text-red-700"
                >
                  Delete All Accounts
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
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
