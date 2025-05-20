
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const ServerPage: React.FC = () => {
  const [serverAddress, setServerAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setServerAddress: setAppServerAddress } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serverAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter a server address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate connecting to server
    setTimeout(() => {
      setAppServerAddress(serverAddress);
      toast({
        title: "Connected",
        description: "Server connection established successfully",
      });
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Staff Management</h1>
          <p className="text-gray-600 mt-2">Connect to your server to continue</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-1">
              Server Address
            </label>
            <input
              id="server"
              type="text"
              value={serverAddress}
              onChange={(e) => setServerAddress(e.target.value)}
              className="input-field"
              placeholder="Enter server address"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              'Connect'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServerPage;
