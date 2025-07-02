
import React, { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../contexts/AppContext';
import AttendanceBarChart from '../components/charts/AttendanceBarChart';
import RoleDonutChart from '../components/charts/RoleDonutChart';
import AttendanceLineChart from '../components/charts/AttendanceLineChart';
import { Button } from "@/components/ui/button";
import { Shield, Eye } from 'lucide-react';

const SharedDashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { attendanceData, staffList, isLoggedIn } = useAppContext();
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month'>('day');
  
  const analisa = searchParams.get('analisa');
  const token = searchParams.get('token');
  
  // Check if this is a valid shared dashboard request
  const isValidShare = analisa === 'view' && token;
  
  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  // Redirect if not a valid share request
  if (!isValidShare) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="text-blue-600" size={20} />
          <span className="text-sm text-gray-600">Shared Dashboard Analysis</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Eye className="text-gray-500" size={24} />
            <h1 className="text-2xl font-bold">Dashboard Analysis (Shared View)</h1>
          </div>
          
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
        
        <div className="card-container">
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
    </Layout>
  );
};

export default SharedDashboardPage;
