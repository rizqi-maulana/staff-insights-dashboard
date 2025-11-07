import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface Announcement {
  date: string;
  author: string;
  heading: string;
  text: string;
}

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  isOpen,
  onClose,
  announcements,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Announcements</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {announcements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No announcements available
            </p>
          ) : (
            announcements.map((announcement, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg">{announcement.heading}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">New</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(announcement.date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">
                    {announcement.text}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
