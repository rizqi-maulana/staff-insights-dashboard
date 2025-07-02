
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareAnalysisModal: React.FC<ShareAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Generate a mock token for demonstration
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  
  const shareLink = `http://absensi.kantor.com/dashboard?analisa=view&token=${generateToken()}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The analysis share link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share size={20} />
            Share Dashboard Analysis
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Share this dashboard analysis with others. Recipients must log in before accessing the shared content.
            </p>
            
            <div className="flex items-center space-x-2">
              <Input
                value={shareLink}
                readOnly
                className="flex-1 text-sm"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyLink}
                className="flex items-center gap-2"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This link requires authentication. Users must log in to access the shared dashboard analysis.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareAnalysisModal;
