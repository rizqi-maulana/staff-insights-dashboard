
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { ArrowLeft, FileText, User, Calendar, Clock, AlertTriangle, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PermissionDetailsModal from '../components/modals/PermissionDetailsModal';

interface PermissionDetails {
  date: string;
  time: string;
  from: string;
  until: string;
  proof: string;
  status: string;
  Details: string;
  Keterangan: string;
}

const StaffDetailsPage: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const navigate = useNavigate();
  const { staffList, attendanceData, exportToExcel } = useAppContext();
  const [staff] = useState(() => staffList.find(s => s.id === staffId));
  const [selectedPermission, setSelectedPermission] = useState<PermissionDetails | null>(null);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  
  useEffect(() => {
    if (!staff) {
      navigate('/staff');
    }
  }, [staff, navigate]);
  
  if (!staff) return null;
  
  // Filter attendance records for this staff member
  const staffAttendance = attendanceData.filter(record => record.staffId === staffId);
  
  // Calculate attendance statistics
  const attendanceStats = {
    attendance: staffAttendance.filter(record => record.status === 'Attendance').length,
    permission: staffAttendance.filter(record => record.status === 'Permission').length,
    noInfo: staffAttendance.filter(record => record.status === 'No Information').length,
    total: staffAttendance.length,
  };
  
  // Calculate attendance percentage
  const attendancePercentage = staffAttendance.length > 0 
    ? Math.round((attendanceStats.attendance / staffAttendance.length) * 100) 
    : 0;

  const handleViewPermission = (record: any) => {
    // Create permission details object
    const permissionDetails: PermissionDetails = {
      date: new Date().toLocaleDateString("id-ID", { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: new Date().toLocaleTimeString("id-ID", { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
      }),
      from: record.from || "N/A",
      until: record.until || "N/A",
      proof: record.proof || "",
      status: "Izin",
      Details: record.Details || "No details provided",
      Keterangan: record.Keterangan || "General"
    };
    
    setSelectedPermission(permissionDetails);
    setPermissionModalOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Staff Details</h1>
        </div>
        
        <button
          onClick={exportToExcel}
          className="mt-4 md:mt-0 flex items-center btn-secondary"
        >
          <FileText size={18} className="mr-2" />
          Export to Excel
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                {staff.photo ? (
                  <img 
                    src={staff.photo} 
                    alt={staff.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
              <CardTitle>{staff.name}</CardTitle>
              <p className="text-muted-foreground">{staff.position}</p>
              <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                staff.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
              </span>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col p-3 border rounded-lg">
                  <span className="text-lg font-bold">{attendanceStats.attendance}</span>
                  <span className="text-xs text-muted-foreground">Present</span>
                </div>
                <div className="flex flex-col p-3 border rounded-lg">
                  <span className="text-lg font-bold">{attendanceStats.permission}</span>
                  <span className="text-xs text-muted-foreground">Permission</span>
                </div>
                <div className="flex flex-col p-3 border rounded-lg">
                  <span className="text-lg font-bold">{attendanceStats.noInfo}</span>
                  <span className="text-xs text-muted-foreground">No Info</span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-sm flex items-center"><span className="font-medium mr-2">Email:</span> {staff.email}</p>
                <p className="text-sm flex items-center mt-1"><span className="font-medium mr-2">Address:</span> {staff.address}</p>
                <p className="text-sm flex items-center mt-1"><span className="font-medium mr-2">Gender:</span> {staff.gender}</p>
                <p className="text-sm flex items-center mt-1"><span className="font-medium mr-2">ID:</span> {staff.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-100">Attendance Rate</p>
                    <h3 className="text-2xl font-bold mt-1">{attendancePercentage}%</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-400 bg-opacity-30 rounded-full flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-100">Permission Rate</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {staffAttendance.length > 0 
                        ? Math.round((attendanceStats.permission / staffAttendance.length) * 100) 
                        : 0}%
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-amber-400 bg-opacity-30 rounded-full flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-100">No Information</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {staffAttendance.length > 0 
                        ? Math.round((attendanceStats.noInfo / staffAttendance.length) * 100) 
                        : 0}%
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-red-400 bg-opacity-30 rounded-full flex items-center justify-center">
                    <AlertTriangle size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-medium">Date</th>
                      <th className="py-2 px-4 text-left font-medium">Status</th>
                      <th className="py-2 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffAttendance.length > 0 ? (
                      staffAttendance
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 10)
                        .map((record) => (
                          <tr key={record.id} className="border-b">
                            <td className="py-3 px-4">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                record.status === 'Attendance' 
                                  ? 'bg-green-100 text-green-800'
                                  : record.status === 'Permission'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                onClick={() => handleViewPermission(record)}
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:text-primary hover:bg-primary/10"
                                disabled={record.status !== 'Permission'}
                              >
                                <Eye size={16} className="mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-gray-500">
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {staffAttendance.length > 10 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      View All Records
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Permission Details Modal */}
      <PermissionDetailsModal 
        isOpen={permissionModalOpen}
        onClose={() => setPermissionModalOpen(false)}
        permission={selectedPermission}
      />
      
      <MobileNav />
    </Layout>
  );
};

export default StaffDetailsPage;
