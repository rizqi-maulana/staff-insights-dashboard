
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAppContext } from '../contexts/AppContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, serverAddress } = useAppContext();

  if (!serverAddress) {
    return <Navigate to="/server" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
