
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Save } from 'lucide-react';

type Staff = {
  id: string;
  name: string;
  position: string;
  gender: "Male" | "Female";
  email: string;
  password: string;
  address: string;
  status: "active" | "inactive";
  photo?: string;
};

const AddStaffPage: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const isEditMode = Boolean(staffId);
  const { staffList, setStaffList } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Staff>({
    id: '',
    name: '',
    position: 'Staff',
    gender: "Male",
    email: '',
    password: '',
    address: '',
    status: 'active'
  });
  
  useEffect(() => {
    if (isEditMode && staffId) {
      const staffToEdit = staffList.find(staff => staff.id === staffId);
      if (staffToEdit) {
        setFormData(staffToEdit);
      } else {
        navigate('/staff');
        toast({
          title: "Staff Not Found",
          description: "The staff member you're trying to edit doesn't exist.",
          variant: "destructive",
        });
      }
    }
  }, [isEditMode, staffId, staffList, navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditMode) {
      // Update existing staff
      const updatedStaffList = staffList.map(staff => 
        staff.id === staffId ? formData : staff
      );
      
      setStaffList(updatedStaffList as Staff[]);
      
      toast({
        title: "Staff Updated",
        description: `${formData.name}'s information has been updated.`,
      });
    } else {
      // Check if ID already exists
      if (staffList.some(staff => staff.id === formData.id)) {
        toast({
          title: "ID Already Exists",
          description: "Please use a different ID.",
          variant: "destructive",
        });
        return;
      }
      
      // Add new staff
      setStaffList([...staffList, formData]);
      
      toast({
        title: "Staff Added",
        description: `${formData.name} has been added to the system.`,
      });
    }
    
    navigate('/staff');
  };
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <UserPlus className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Staff' : 'Add Staff'}</h1>
        </div>
      </div>
      
      <Card>
        <CardHeader className="border-b bg-muted/40">
          <CardTitle>{isEditMode ? 'Update Staff Information' : 'Staff Information'}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                  Staff ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  disabled={isEditMode}
                  className={`input-field ${isEditMode ? 'bg-gray-100' : ''}`}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input-field min-h-[100px]"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/staff')}
              >
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save size={18} />
                {isEditMode ? 'Update Staff' : 'Save Staff'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <MobileNav />
    </Layout>
  );
};

export default AddStaffPage;
