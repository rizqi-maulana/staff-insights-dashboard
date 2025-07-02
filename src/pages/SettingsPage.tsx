import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanQrCode, Settings, Monitor, Bell, Palette, Database, Lock, CloudUpload, Download, Upload } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useToast } from "@/hooks/use-toast";

const SettingsPage: React.FC = () => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [showAdvancedCharts, setShowAdvancedCharts] = useState(true);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { backupToCloud, backupToLocal, restoreFromFile } = useAppContext();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Save settings logic would go here
    console.log('Settings saved:', {
      isScannerActive,
      autoRefresh,
      darkMode,
      notifications,
      compactView,
      showAdvancedCharts
    });
  };

  const handleResetSettings = () => {
    setIsScannerActive(false);
    setAutoRefresh(true);
    setDarkMode(false);
    setNotifications(true);
    setCompactView(false);
    setShowAdvancedCharts(true);
  };

  const handleCloudBackup = async () => {
    setIsBackingUp(true);
    try {
      await backupToCloud();
      toast({
        title: "Cloud Backup Successful",
        description: "Your data has been backed up to the cloud successfully.",
      });
    } catch (error) {
      toast({
        title: "Cloud Backup Failed",
        description: "Failed to backup data to cloud. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleLocalBackup = () => {
    try {
      backupToLocal();
      toast({
        title: "Local Backup Successful",
        description: "Your data has been downloaded as a backup file.",
      });
    } catch (error) {
      toast({
        title: "Local Backup Failed",
        description: "Failed to create local backup. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid JSON backup file.",
        variant: "destructive",
      });
      return;
    }

    setIsRestoring(true);
    restoreFromFile(file)
      .then(() => {
        toast({
          title: "Restore Successful",
          description: "Your data has been restored from the backup file.",
        });
      })
      .catch(() => {
        toast({
          title: "Restore Failed",
          description: "Failed to restore data from backup file. Please check the file format.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsRestoring(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-2">Configure your dashboard and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scanner Settings */}
          <Card className={!isScannerActive ? 'opacity-75 border-gray-300' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanQrCode className="h-5 w-5" />
                QR Scanner Settings
                {!isScannerActive && <Lock className="h-4 w-4 text-gray-400" />}
              </CardTitle>
              <CardDescription>
                Configure QR code scanner for attendance tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable QR Scanner</Label>
                  <div className="text-sm text-gray-500">
                    Activate QR code scanning for attendance
                  </div>
                </div>
                <Switch
                  checked={isScannerActive}
                  onCheckedChange={setIsScannerActive}
                />
              </div>
              
              {isScannerActive ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ScanQrCode className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-800 font-medium">Scanner is currently active</span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Scanner features are disabled</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enable the scanner above to access QR code scanning features
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dashboard Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Dashboard Settings
              </CardTitle>
              <CardDescription>
                Customize your dashboard appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Refresh</Label>
                  <div className="text-sm text-gray-500">
                    Automatically refresh dashboard data
                  </div>
                </div>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Compact View</Label>
                  <div className="text-sm text-gray-500">
                    Use compact layout for cards and charts
                  </div>
                </div>
                <Switch
                  checked={compactView}
                  onCheckedChange={setCompactView}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Advanced Charts</Label>
                  <div className="text-sm text-gray-500">
                    Show detailed analytics and charts
                  </div>
                </div>
                <Switch
                  checked={showAdvancedCharts}
                  onCheckedChange={setShowAdvancedCharts}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Backup and restore your attendance data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Backup Data</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Create a backup of all your attendance data and settings
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCloudBackup}
                      disabled={isBackingUp}
                      className="flex items-center gap-2"
                    >
                      <CloudUpload className="h-4 w-4" />
                      {isBackingUp ? 'Backing up...' : 'Backup to Cloud'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLocalBackup}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Backup
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Label className="text-base font-medium">Restore Data</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Restore your data from a previously created backup file
                  </p>
                  <div className="flex gap-2">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileUpload}
                      disabled={isRestoring}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isRestoring}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {isRestoring ? 'Restoring...' : 'Choose File'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JSON backup files
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className={!darkMode ? 'opacity-75 border-gray-300' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
                {!darkMode && <Lock className="h-4 w-4 text-gray-400" />}
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <div className="text-sm text-gray-500">
                    Switch to dark theme
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              {!darkMode && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Dark mode features are disabled</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enable dark mode to access theme customization options
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className={!notifications ? 'opacity-75 border-gray-300' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
                {!notifications && <Lock className="h-4 w-4 text-gray-400" />}
              </CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Notifications</Label>
                  <div className="text-sm text-gray-500">
                    Receive system and attendance notifications
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              {!notifications && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Notification features are disabled</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enable notifications to receive system alerts and updates
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
