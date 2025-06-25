
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
import { Badge } from "@/components/ui/badge";
import { useAppContext } from '../../contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, User, Send } from 'lucide-react';

interface SendLoginInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendLoginInfoModal: React.FC<SendLoginInfoModalProps> = ({ isOpen, onClose }) => {
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { staffList } = useAppContext();
  const { toast } = useToast();
  
  const handleStaffToggle = (staffId: string) => {
    setSelectedStaff(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStaff.length === staffList.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(staffList.map(staff => staff.id));
    }
  };

  const handleSendLoginInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedStaff.length === 0) {
      toast({
        title: "No staff selected",
        description: "Please select at least one staff member to send login information to.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate sending emails (in a real app, this would call an API)
      const selectedStaffData = staffList.filter(staff => selectedStaff.includes(staff.id));
      
      console.log('Sending login information to:', selectedStaffData.map(staff => ({
        name: staff.name,
        email: staff.email,
        password: staff.password,
        customMessage
      })));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Login information sent",
        description: `Successfully sent login credentials to ${selectedStaff.length} staff member(s).`,
      });
      
      // Reset form
      setSelectedStaff([]);
      setCustomMessage('');
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send login information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Login Information
          </DialogTitle>
          <DialogDescription>
            Select staff members to send their login credentials via email
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSendLoginInfo} className="space-y-6">
          {/* Staff Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Select Staff Members
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedStaff.length === staffList.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="max-h-60 overflow-y-auto border rounded-lg p-3 space-y-2">
              {staffList.map(staff => (
                <div
                  key={staff.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedStaff.includes(staff.id)
                      ? 'bg-blue-50 border-blue-300'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleStaffToggle(staff.id)}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-gray-500">{staff.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={staff.status === 'active' ? 'default' : 'secondary'}>
                      {staff.status}
                    </Badge>
                    {selectedStaff.includes(staff.id) && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {selectedStaff.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {selectedStaff.length} staff member(s) selected
              </p>
            )}
          </div>

          {/* Custom Message */}
          <div>
            <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Message (Optional)
            </label>
            <Input
              id="customMessage"
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add a custom message to include in the email..."
              className="w-full"
            />
          </div>

          {/* Email Preview */}
          {selectedStaff.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Email Preview:</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Subject:</strong> Your Login Credentials - Staff Management System</p>
                <p><strong>Recipients:</strong> {selectedStaff.length} staff member(s)</p>
                {customMessage && <p><strong>Custom Message:</strong> {customMessage}</p>}
                <p className="text-xs text-gray-500 mt-2">
                  * Each staff member will receive their individual login credentials
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || selectedStaff.length === 0}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Login Information
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendLoginInfoModal;
