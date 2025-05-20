
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { Eye, FileText } from 'lucide-react';
import StaffDetailModal from '../components/modals/StaffDetailModal';

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
        <h1 className="text-2xl font-bold">Notifications</h1>
        
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
      
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="table-container">
          <thead>
            <tr>
              <th className="table-header rounded-tl-lg">#</th>
              <th className="table-header">Staff</th>
              <th className="table-header">Type</th>
              <th className="table-header">Date</th>
              <th className="table-header">Message</th>
              <th className="table-header rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification, index) => (
              <tr key={notification.id} className="table-row">
                <td className="table-cell font-medium">{index + 1}</td>
                <td className="table-cell">{notification.staffName}</td>
                <td className="table-cell">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    notification.type === 'permission'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                </td>
                <td className="table-cell">
                  {new Date(notification.date).toLocaleDateString()}
                </td>
                <td className="table-cell">{notification.message}</td>
                <td className="table-cell">
                  <button
                    onClick={() => handleViewDetails(notification.staffId)}
                    className="flex items-center text-primary hover:text-primary-dark"
                  >
                    <Eye size={18} className="mr-1" />
                    See Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredNotifications.length === 0 && (
              <tr>
                <td colSpan={6} className="table-cell text-center py-8 text-gray-500">
                  No notifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
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
