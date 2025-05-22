
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from '../../contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Server } from 'lucide-react';

interface ServerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServerFormModal: React.FC<ServerFormModalProps> = ({ isOpen, onClose }) => {
  const [serverAddress, setServerAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setServerAddress: setAppServerAddress } = useAppContext();
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
      onClose();
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" /> 
            Connect to Server
          </DialogTitle>
          <DialogDescription>
            Enter your server address to connect to the Staff Management System
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="server" className="block text-sm font-medium text-gray-700 mb-1">
              Server Address
            </label>
            <Input
              id="server"
              value={serverAddress}
              onChange={(e) => setServerAddress(e.target.value)}
              placeholder="Enter server address"
              required
            />
          </div>
          
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : (
                'Connect'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServerFormModal;
