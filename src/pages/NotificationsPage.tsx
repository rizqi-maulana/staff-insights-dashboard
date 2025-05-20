
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { Eye, FileText, Bell, CalendarDays } from 'lucide-react';
import StaffDetailModal from '../components/modals/StaffDetailModal';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotificationsPage: React.FC = () => {
  const { notifications, staffList, exportToExcel } = useAppContext();
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'permission' | 'field'>('all');
  
  const handleViewDetails = (staffId: string) => {
    setSelectedStaff(staffId);
  };
  
  const handleCloseModal = () => {
    setSelectedStaff(null);
  };
  
  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filterType);
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'permission' | 'field')}
            className="input-field max-w-xs"
          >
            <option value="all">All Notifications</option>
            <option value="permission">Permission Requests</option>
            <option value="field">Field Absences</option>
          </select>
          
          <button
            onClick={exportToExcel}
            className="flex items-center btn-secondary"
          >
            <FileText size={18} className="mr-2" />
            Export to Excel
          </button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="border-b bg-muted/40">
          <CardTitle>Notification List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification, index) => (
                <TableRow key={notification.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{notification.staffName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      notification.type === 'permission'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarDays size={14} className="mr-1 text-gray-500" />
                      {new Date(notification.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleViewDetails(notification.staffId)}
                      variant="ghost"
                      size="sm"
                      className="flex items-center text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Eye size={16} className="mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredNotifications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                    No notifications found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedStaff && (
        <StaffDetailModal
          staff={staffList.find(staff => staff.id === selectedStaff)!}
          onClose={handleCloseModal}
        />
      )}
      
      <MobileNav />
    </Layout>
  );
};

export default NotificationsPage;
