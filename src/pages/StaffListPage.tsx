
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { Eye, FileText } from 'lucide-react';
import StaffDetailModal from '../components/modals/StaffDetailModal';

const StaffListPage: React.FC = () => {
  const { staffList, exportToExcel } = useAppContext();
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  
  const handleViewDetails = (staffId: string) => {
    setSelectedStaff(staffId);
  };
  
  const handleCloseModal = () => {
    setSelectedStaff(null);
  };
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Staff List</h1>
        
        <button
          onClick={exportToExcel}
          className="mt-4 md:mt-0 flex items-center btn-secondary"
        >
          <FileText size={18} className="mr-2" />
          Export to Excel
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="table-container">
          <thead>
            <tr>
              <th className="table-header rounded-tl-lg">#</th>
              <th className="table-header">Name</th>
              <th className="table-header">Position</th>
              <th className="table-header">Gender</th>
              <th className="table-header">Email</th>
              <th className="table-header">Status</th>
              <th className="table-header rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, index) => (
              <tr key={staff.id} className="table-row">
                <td className="table-cell font-medium">{index + 1}</td>
                <td className="table-cell">{staff.name}</td>
                <td className="table-cell">{staff.position}</td>
                <td className="table-cell">{staff.gender}</td>
                <td className="table-cell">{staff.email}</td>
                <td className="table-cell">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    staff.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                  </span>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => handleViewDetails(staff.id)}
                    className="flex items-center text-primary hover:text-primary-dark"
                  >
                    <Eye size={18} className="mr-1" />
                    Details
                  </button>
                </td>
              </tr>
            ))}
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

export default StaffListPage;
