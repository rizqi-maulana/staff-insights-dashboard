
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Button } from "@/components/ui/button";
import { ScanQrCode, Settings, Monitor, Bell, Palette, Database, Lock } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [showAdvancedCharts, setShowAdvancedCharts] = useState(true);

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
