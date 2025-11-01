import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Calendar } from 'lucide-react';

export interface Update {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
  type: 'feature' | 'improvement' | 'bugfix';
}

interface UpdateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  updates: Update[];
  currentVersion: string;
}

const UpdateNotificationModal: React.FC<UpdateNotificationModalProps> = ({
  isOpen,
  onClose,
  updates,
  currentVersion,
}) => {
  const getTypeBadgeVariant = (type: Update['type']) => {
    switch (type) {
      case 'feature':
        return 'default';
      case 'improvement':
        return 'secondary';
      case 'bugfix':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type: Update['type']) => {
    switch (type) {
      case 'feature':
        return 'New Feature';
      case 'improvement':
        return 'Improvement';
      case 'bugfix':
        return 'Bug Fix';
      default:
        return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl">What's New</DialogTitle>
          </div>
          <DialogDescription className="flex items-center gap-2 text-base">
            Current Version: <Badge variant="outline">{currentVersion}</Badge>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {updates.map((update) => (
              <Card key={update.id} className="overflow-hidden">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{update.title}</CardTitle>
                        <Badge variant={getTypeBadgeVariant(update.type)}>
                          {getTypeLabel(update.type)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{update.date}</span>
                        <span className="mx-1">•</span>
                        <Badge variant="secondary" className="text-xs">
                          v{update.version}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {update.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {update.imageUrl && (
                    <div className="rounded-lg overflow-hidden border">
                      <img
                        src={update.imageUrl}
                        alt={update.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {update.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-2">
                        {update.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNotificationModal;
