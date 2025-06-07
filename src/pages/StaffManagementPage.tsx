
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, RotateCcw, QrCode, Trash2 } from 'lucide-react';

const StaffManagementPage: React.FC = () => {
  const { 
    staffList,
    activateAllStaff, 
    deactivateAllStaff, 
    resetAllDevices, 
    refreshAllQRCodes, 
    deleteAllStaff 
  } = useAppContext();

  const activeStaffCount = staffList.filter(staff => staff.status === 'active').length;
  const inactiveStaffCount = staffList.filter(staff => staff.status === 'inactive').length;

  const handleActivateAll = () => {
    activateAllStaff();
  };

  const handleDeactivateAll = () => {
    deactivateAllStaff();
  };

  const handleResetDevices = () => {
    resetAllDevices();
  };

  const handleRefreshQRCodes = () => {
    refreshAllQRCodes();
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all staff accounts? This action cannot be undone.')) {
      deleteAllStaff();
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage all staff accounts and devices from here</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffList.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeStaffCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Staff</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inactiveStaffCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Account Management
              </CardTitle>
              <CardDescription>
                Manage the status of all staff accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleActivateAll} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={staffList.length === 0}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Activate All Accounts
                <Badge variant="secondary" className="ml-2">
                  {staffList.length}
                </Badge>
              </Button>
              
              <Button 
                onClick={handleDeactivateAll} 
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                disabled={staffList.length === 0}
              >
                <UserX className="mr-2 h-4 w-4" />
                Deactivate All Accounts
                <Badge variant="secondary" className="ml-2">
                  {staffList.length}
                </Badge>
              </Button>
            </CardContent>
          </Card>

          {/* Device & System Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Device & System Management
              </CardTitle>
              <CardDescription>
                Reset devices and refresh system components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleResetDevices} 
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                disabled={staffList.length === 0}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset All Device Accounts
              </Button>
              
              <Button 
                onClick={handleRefreshQRCodes} 
                variant="outline"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                disabled={staffList.length === 0}
              >
                <QrCode className="mr-2 h-4 w-4" />
                Refresh All QR Codes
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions that will permanently delete data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleDeleteAll} 
                variant="destructive"
                className="w-full"
                disabled={staffList.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete All Accounts
                <Badge variant="secondary" className="ml-2">
                  {staffList.length}
                </Badge>
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone. All staff data will be permanently deleted.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StaffManagementPage;
