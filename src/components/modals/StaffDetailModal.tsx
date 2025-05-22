
import React from 'react';
import { X, CheckCircle, AlertCircle, RefreshCw, Trash2, User, Edit } from 'lucide-react';
import { Staff, useAppContext } from '../../contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface StaffDetailModalProps {
  staff: Staff;
  onClose: () => void;
}

const StaffDetailModal: React.FC<StaffDetailModalProps> = ({ staff, onClose }) => {
  const { toggleStaffStatus, resetDevice, deleteStaff } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleToggleStatus = () => {
    toggleStaffStatus(staff.id);
    toast({
      title: "Status Updated",
      description: `${staff.name}'s status is now ${staff.status === 'active' ? 'inactive' : 'active'}.`,
    });
  };
  
  const handleResetDevice = () => {
    resetDevice(staff.id);
    toast({
      title: "Device Reset",
      description: `${staff.name}'s device has been reset.`,
    });
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${staff.name}?`)) {
      deleteStaff(staff.id);
      toast({
        title: "Staff Deleted",
        description: `${staff.name} has been removed from the system.`,
        variant: "destructive",
      });
      onClose();
    }
  };

  const handleViewDetails = () => {
    navigate(`/staff/${staff.id}`);
    onClose();
  };

  const handleEditStaff = () => {
    navigate(`/staff/edit/${staff.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-6">Staff Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col items-center">
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
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                staff.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
              </span>
            </div>
            
            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailField label="Name" value={staff.name} />
                <DetailField label="ID" value={staff.id} />
                <DetailField label="Position" value={staff.position} />
                <DetailField label="Gender" value={staff.gender} />
                <DetailField label="Email" value={staff.email} />
                <DetailField label="Password" value="••••••••" />
                <div className="col-span-1 md:col-span-2">
                  <DetailField label="Address" value={staff.address} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6 flex flex-wrap gap-3 justify-end">
            <button
              onClick={handleViewDetails}
              className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
            >
              <User size={18} className="mr-2" />
              View Full Details
            </button>

            <button
              onClick={handleEditStaff}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Edit size={18} className="mr-2" />
              Edit Staff
            </button>
            
            <button
              onClick={handleToggleStatus}
              className={`flex items-center ${
                staff.status === 'active'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white px-4 py-2 rounded-md transition-colors`}
            >
              {staff.status === 'active' ? (
                <AlertCircle size={18} className="mr-2" />
              ) : (
                <CheckCircle size={18} className="mr-2" />
              )}
              Mark as {staff.status === 'active' ? 'Inactive' : 'Active'}
            </button>
            
            <button
              onClick={handleResetDevice}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <RefreshCw size={18} className="mr-2" />
              Reset Device
            </button>
            
            <button
              onClick={handleDelete}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </button>
            
            <button
              onClick={onClose}
              className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailFieldProps {
  label: string;
  value: string;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md">
        {value}
      </div>
    </div>
  );
};

export default StaffDetailModal;
