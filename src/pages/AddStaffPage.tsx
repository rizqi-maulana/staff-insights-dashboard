import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext, Staff } from '../contexts/AppContext';
import Layout from '../components/Layout';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const AddStaffPage: React.FC = () => {
  const { staffList, setStaffList } = useAppContext();
  const { staffId } = useParams<{ staffId: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<Staff>({
    id: '',
    name: '',
    position: '',
    gender: 'Male',
    email: '',
    status: 'active',
    address: '',
    password: ''
  });

  useEffect(() => {
    if (staffId && staffId !== 'add') {
      const staff = staffList.find(s => s.id === staffId);
      if (staff) {
        setFormData({
          ...staff,
          gender: staff.gender as 'Male' | 'Female'
        });
        setIsEditing(true);
      }
    }
  }, [staffId, staffList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing staff
      setStaffList(prev =>
        prev.map(staff =>
          staff.id === formData.id ? formData : staff
        )
      );
      toast({
        title: "Success!",
        description: "Staff updated successfully.",
      })
    } else {
      // Add new staff
      const newStaff = { ...formData, id: Date.now().toString() };
      setStaffList(prev => [...prev, newStaff]);
      toast({
        title: "Success!",
        description: "Staff added successfully.",
      })
    }
    navigate('/staff');
  };

  return (
    <Layout>
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Staff' : 'Add Staff'}</CardTitle>
            <CardDescription>
              {isEditing ? 'Edit an existing staff member.' : 'Add a new staff member to the system.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <Button type="submit">{isEditing ? 'Update Staff' : 'Add Staff'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddStaffPage;
