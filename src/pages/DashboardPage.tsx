import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import AttendanceBarChart from '../components/charts/AttendanceBarChart';
import RoleDonutChart from '../components/charts/RoleDonutChart';
import AttendanceLineChart from '../components/charts/AttendanceLineChart';
import TodayAttendanceModal from '../components/modals/TodayAttendanceModal';
import ShareAnalysisModal from '../components/modals/ShareAnalysisModal';
import AccessKeyEntryModal from '../components/modals/AccessKeyEntryModal';
import AnnouncementModal from '../components/modals/AnnouncementModal';
import { Share, Users, Calendar, AlertCircle, Key, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DashboardPage: React.FC = () => {
  const { dateRange, setDateRange, attendanceData, staffList } = useAppContext();
  const [isTodayAttendanceModalOpen, setIsTodayAttendanceModalOpen] = useState(false);
  const [isShareAnalysisModalOpen, setIsShareAnalysisModalOpen] = useState(false);
  const [isAccessKeyEntryModalOpen, setIsAccessKeyEntryModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(true);
  
  const announcements = [
    {
      date: '2025-11-07',
      author: 'Admin',
      heading: 'Welcome to ScanHadir Dashboard',
      text: 'Thank you for using ScanHadir! This is your centralized platform for managing staff attendance efficiently. Explore the dashboard to view analytics, manage staff, and track attendance records.'
    },
    {
      date: '2025-11-05',
      author: 'System',
      heading: 'New Features Available',
      text: 'We have added new reporting features including share analysis and access key management. Check out the dashboard buttons to explore these new capabilities.'
    }
  ];
  
  const hasStaffData = staffList.length > 0;
  const hasAttendanceData = attendanceData.length > 0;
  
  const handleAccessKeySuccess = () => {
    setIsAccessKeyEntryModalOpen(false);
    // You can add any success logic here if needed
  };
  
  // If no staff data at all, show main empty state
  if (!hasStaffData) {
    return (
      <Layout>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-6">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Staff Data Available</h2>
            <p className="text-gray-500 max-w-md">
              Get started by adding staff members to see attendance analytics and insights on your dashboard.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/staff/add'}
              className="px-6 py-3"
            >
              Add Your First Staff Member
            </Button>
            <p className="text-sm text-gray-400">
              or go to <a href="/staff" className="text-primary hover:underline">Staff Management</a> to get started
            </p>
          </div>
        </div>
        
        <MobileNav />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Button
            onClick={() => setIsAnnouncementModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2 relative"
          >
            <Bell size={16} />
            Announcements
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button
            onClick={() => setIsAccessKeyEntryModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Key size={16} />
            Test Access Key
          </Button>
          
          <Button
            onClick={() => setIsShareAnalysisModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share size={16} />
            Share Analysis
          </Button>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setDateRange('day')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                dateRange === 'day'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setDateRange('week')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                dateRange === 'week'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                dateRange === 'month'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Show alert if no attendance data */}
      {!hasAttendanceData && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No attendance data available yet. Attendance records will appear here once staff members start checking in.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card-container">
          <h2 className="text-lg font-semibold">Total Staff</h2>
          <p className="text-3xl font-bold mt-2">{staffList.length}</p>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Active</p>
              <p className="font-semibold">{staffList.filter(s => s.status === 'active').length}</p>
            </div>
            <div>
              <p className="text-gray-500">Inactive</p>
              <p className="font-semibold">{staffList.filter(s => s.status === 'inactive').length}</p>
            </div>
          </div>
        </div>
        
        <div 
          className="card-container cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setIsTodayAttendanceModalOpen(true)}
        >
          <h2 className="text-lg font-semibold">Today's Attendance</h2>
          {hasAttendanceData ? (
            <>
              <p className="text-3xl font-bold mt-2">
                {attendanceData.filter(a => {
                  const today = new Date().toISOString().split('T')[0];
                  const recordDate = new Date(a.date).toISOString().split('T')[0];
                  return recordDate === today;
                }).length}
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Present</p>
                  <p className="font-semibold">
                    {attendanceData.filter(a => {
                      const today = new Date().toISOString().split('T')[0];
                      const recordDate = new Date(a.date).toISOString().split('T')[0];
                      return recordDate === today && a.status === 'Attendance';
                    }).length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Permission</p>
                  <p className="font-semibold">
                    {attendanceData.filter(a => {
                      const today = new Date().toISOString().split('T')[0];
                      const recordDate = new Date(a.date).toISOString().split('T')[0];
                      return recordDate === today && a.status === 'Permission';
                    }).length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">No Info</p>
                  <p className="font-semibold">
                    {attendanceData.filter(a => {
                      const today = new Date().toISOString().split('T')[0];
                      const recordDate = new Date(a.date).toISOString().split('T')[0];
                      return recordDate === today && a.status === 'No Information';
                    }).length}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Click to view details</p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center h-20">
                <Calendar size={32} className="text-gray-400 mb-2" />
              </div>
              <p className="text-sm text-gray-500 text-center">No attendance records yet</p>
            </>
          )}
        </div>
        
        <div className="card-container md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold">Gender Distribution</h2>
          <div className="mt-4 flex justify-center">
            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span>Male</span>
                </div>
                <span className="font-medium">
                  {staffList.filter(s => s.gender === 'Male').length}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                  <span>Female</span>
                </div>
                <span className="font-medium">
                  {staffList.filter(s => s.gender === 'Female').length}
                </span>
              </div>
              
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-primary rounded-full"
                  style={{
                    width: `${(staffList.filter(s => s.gender === 'Male').length / staffList.length) * 100}%`
                  }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500 flex justify-between">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts section - show empty state if no attendance data */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {hasAttendanceData ? (
          <>
            <AttendanceBarChart data={attendanceData} dateRange={dateRange} />
            <AttendanceLineChart data={attendanceData} dateRange={dateRange} />
          </>
        ) : (
          <>
            <div className="card-container h-72 flex flex-col items-center justify-center">
              <Calendar size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No Attendance Statistics</h3>
              <p className="text-sm text-gray-400 text-center">
                Charts will appear here once attendance data is available
              </p>
            </div>
            <div className="card-container h-72 flex flex-col items-center justify-center">
              <Calendar size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No Attendance Trends</h3>
              <p className="text-sm text-gray-400 text-center">
                Trend analysis will appear here once attendance data is available
              </p>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-6">
        <RoleDonutChart data={staffList} />
      </div>
      
      <TodayAttendanceModal
        isOpen={isTodayAttendanceModalOpen}
        onClose={() => setIsTodayAttendanceModalOpen(false)}
      />
      
      <ShareAnalysisModal
        isOpen={isShareAnalysisModalOpen}
        onClose={() => setIsShareAnalysisModalOpen(false)}
      />
      
      <AccessKeyEntryModal
        isOpen={isAccessKeyEntryModalOpen}
        onClose={() => setIsAccessKeyEntryModalOpen(false)}
        onSuccess={handleAccessKeySuccess}
      />
      
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        announcements={announcements}
      />
      
      <MobileNav />
    </Layout>
  );
};

export default DashboardPage;
