import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const OfflinePage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="text-center max-w-md mx-auto space-y-6 animate-fade-in">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative bg-card border-2 border-destructive/50 rounded-full p-8 shadow-xl">
            <WifiOff className="w-16 h-16 text-destructive mx-auto" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            No Internet Connection
          </h1>
          <p className="text-muted-foreground text-lg">
            It looks like you're offline. Please check your internet connection and try again.
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <Button 
            onClick={handleRetry} 
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Having trouble connecting?</p>
            <ul className="mt-2 space-y-1 text-left pl-4">
              <li>• Check your WiFi or mobile data</li>
              <li>• Restart your router</li>
              <li>• Disable airplane mode</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
