
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '../../contexts/AppContext';

interface AccessKeyEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AccessKeyEntryModal: React.FC<AccessKeyEntryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { validateAccessKey, incrementKeyUsage } = useAppContext();
  const { toast } = useToast();
  const [accessKey, setAccessKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleValidateKey = async () => {
    if (!accessKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an access key.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isValid = validateAccessKey(accessKey.trim());
    
    if (isValid) {
      incrementKeyUsage(accessKey.trim());
      toast({
        title: "Access Granted",
        description: "You now have access to the dashboard analysis.",
      });
      setAccessKey('');
      onSuccess();
    } else {
      toast({
        title: "Invalid Access Key",
        description: "The access key is invalid or has expired.",
        variant: "destructive",
      });
    }
    
    setIsValidating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidateKey();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock size={20} />
            Enter Access Key
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center py-4">
            <Key size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              Enter your access key to view the shared dashboard analysis
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accessKey">Access Key</Label>
            <Input
              id="accessKey"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your access key here"
              className="font-mono"
              disabled={isValidating}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isValidating}>
              Cancel
            </Button>
            <Button onClick={handleValidateKey} disabled={isValidating}>
              {isValidating ? 'Validating...' : 'Access Dashboard'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessKeyEntryModal;
