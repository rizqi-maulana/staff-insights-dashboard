
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import AttendanceBarChart from '../components/charts/AttendanceBarChart';
import RoleDonutChart from '../components/charts/RoleDonutChart';
import AttendanceLineChart from '../components/charts/AttendanceLineChart';
import TodayAttendanceModal from '../components/modals/TodayAttendanceModal';

const DashboardPage: React.FC = () => {
  const { dateRange, setDateRange, attendanceData, staffList } = useAppContext();
  const [isTodayAttendanceModalOpen, setIsTodayAttendanceModalOpen] = useState(false);
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="mt-4 md:mt-0">
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
      
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceBarChart data={attendanceData} dateRange={dateRange} />
        <AttendanceLineChart data={attendanceData} dateRange={dateRange} />
      </div>
      
      <div className="mt-6">
        <RoleDonutChart data={staffList} />
      </div>
      
      <TodayAttendanceModal
        isOpen={isTodayAttendanceModalOpen}
        onClose={() => setIsTodayAttendanceModalOpen(false)}
      />
      
      <MobileNav />
    </Layout>
  );
};

export default DashboardPage;
