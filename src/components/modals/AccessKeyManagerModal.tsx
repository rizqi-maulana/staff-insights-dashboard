
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Plus, Trash2, Key, Calendar, Clock, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '../../contexts/AppContext';

interface AccessKeyManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessKeyManagerModal: React.FC<AccessKeyManagerModalProps> = ({ isOpen, onClose }) => {
  const { accessKeys, generateAccessKey, deleteAccessKey } = useAppContext();
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState('');
  const [expirationDays, setExpirationDays] = useState('30');
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);

  const handleGenerateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the access key.",
        variant: "destructive",
      });
      return;
    }

    const expireDays = expirationDays ? parseInt(expirationDays) : undefined;
    const newKey = generateAccessKey(newKeyName.trim(), expireDays);
    
    toast({
      title: "Access Key Generated",
      description: `New access key "${newKey.name}" has been created.`,
    });

    setNewKeyName('');
    setExpirationDays('30');
    setShowNewKeyForm(false);
  };

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({
        title: "Key copied!",
        description: "The access key has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the key to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteKey = (id: string, name: string) => {
    deleteAccessKey(id);
    toast({
      title: "Access Key Deleted",
      description: `Access key "${name}" has been deleted.`,
    });
  };

  const isExpired = (expiresAt?: string) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key size={20} />
            Access Key Management
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Manage access keys for sharing dashboard analysis
            </p>
            <Button
              onClick={() => setShowNewKeyForm(!showNewKeyForm)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Generate New Key
            </Button>
          </div>

          {showNewKeyForm && (
            <div className="border rounded-lg p-4 space-y-4">
              <div>
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Client Review, Monthly Report"
                />
              </div>
              <div>
                <Label htmlFor="expiration">Expiration (days)</Label>
                <Input
                  id="expiration"
                  type="number"
                  value={expirationDays}
                  onChange={(e) => setExpirationDays(e.target.value)}
                  placeholder="Leave empty for no expiration"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleGenerateKey}>Generate Key</Button>
                <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {accessKeys.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Key size={48} className="mx-auto mb-4 text-gray-400" />
                <p>No access keys generated yet</p>
                <p className="text-sm">Create your first key to start sharing dashboard analysis</p>
              </div>
            ) : (
              accessKeys.map((accessKey) => (
                <div
                  key={accessKey.id}
                  className={`border rounded-lg p-4 ${
                    isExpired(accessKey.expiresAt) ? 'bg-red-50 border-red-200' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{accessKey.name}</h3>
                        {isExpired(accessKey.expiresAt) && (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                            Expired
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>Created: {new Date(accessKey.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        {accessKey.expiresAt && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>Expires: {new Date(accessKey.expiresAt).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Eye size={14} />
                          <span>Used {accessKey.accessCount} times</span>
                          {accessKey.lastAccessedAt && (
                            <span>(Last: {new Date(accessKey.lastAccessedAt).toLocaleDateString()})</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Input
                          value={accessKey.key}
                          readOnly
                          className="text-sm font-mono"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyKey(accessKey.key)}
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteKey(accessKey.id, accessKey.name)}
                      className="ml-4 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessKeyManagerModal;
