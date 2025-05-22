
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock } from 'lucide-react';

interface FieldWorkDetails {
  tanggal: string;
  waktu: string;
  keterangan: string;
  kordinat: string;
  status: "Hadir" | "Pulang";
}

interface FieldWorkDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldWork: FieldWorkDetails | null;
}

const FieldWorkDetailsModal: React.FC<FieldWorkDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  fieldWork 
}) => {
  if (!fieldWork) return null;

  // Extract latitude and longitude from coordinates string
  const [latitude, longitude] = fieldWork.kordinat.split(' ');
  
  // Generate Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Field Work Details</DialogTitle>
          <DialogDescription>
            Staff {fieldWork.status === "Hadir" ? "attendance" : "departure"} information in the field
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3 text-base font-medium">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{fieldWork.tanggal}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3 text-base">
                <Clock className="h-5 w-5 text-primary" />
                <span>{fieldWork.waktu}</span>
              </div>
              
              <div className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{fieldWork.kordinat}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Status</span>
                <div className={`mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
                  fieldWork.status === "Hadir" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {fieldWork.status}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Type</span>
                <div className="mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                  {fieldWork.keterangan}
                </div>
              </div>
            </div>
            
            <div>
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline flex items-center gap-1"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
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

export default FieldWorkDetailsModal;
