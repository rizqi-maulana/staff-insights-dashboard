
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { Eye, FileText, Users, Search, UserPlus } from 'lucide-react';
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
import { Link } from 'react-router-dom';

const StaffListPage: React.FC = () => {
  const { staffList, exportToExcel } = useAppContext();
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const handleViewDetails = (staffId: string) => {
    setSelectedStaff(staffId);
  };
  
  const handleCloseModal = () => {
    setSelectedStaff(null);
  };
  
  const filteredStaff = staffList.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Users className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold">Staff List</h1>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input-field w-full md:w-64"
            />
          </div>
          <div className="flex gap-2">
            <Button asChild variant="default">
              <Link to="/staff/add" className="flex items-center">
                <UserPlus size={18} className="mr-2" />
                Add Staff
              </Link>
            </Button>
            <button
              onClick={exportToExcel}
              className="flex items-center btn-secondary"
            >
              <FileText size={18} className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="border-b bg-muted/40">
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff, index) => (
                <TableRow key={staff.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.gender}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      staff.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleViewDetails(staff.id)}
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
              {filteredStaff.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No staff members found
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

export default StaffListPage;
