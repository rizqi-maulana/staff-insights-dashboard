
import React from 'react';
import { X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PermissionDetails {
  date: string;
  time: string;
  from: string;
  until: string;
  proof: string;
  status: string;
  Details: string;
  Keterangan: string;
}

interface PermissionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  permission: PermissionDetails | null;
}

const PermissionDetailsModal: React.FC<PermissionDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  permission 
}) => {
  if (!permission) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Permission Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            {permission.proof && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Proof Document</h4>
                <div className="bg-gray-50 rounded-md overflow-hidden h-40 flex items-center justify-center">
                  <img 
                    src={permission.proof} 
                    alt="Proof document" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <DetailField label="Status" value={permission.status} />
                <DetailField label="Date" value={permission.date} />
                <DetailField label="Time" value={permission.time} />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <DetailField label="From" value={permission.from} />
                <DetailField label="Until" value={permission.until} />
              </div>
              
              <DetailField label="Type" value={permission.Keterangan} />
              <DetailField 
                label="Details" 
                value={permission.Details} 
                multiline 
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface DetailFieldProps {
  label: string;
  value: string;
  multiline?: boolean;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value, multiline }) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      {multiline ? (
        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md min-h-[80px] whitespace-pre-wrap">
          {value || "N/A"}
        </div>
      ) : (
        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
          {value || "N/A"}
        </div>
      )}
    </div>
  );
};

export default PermissionDetailsModal;
