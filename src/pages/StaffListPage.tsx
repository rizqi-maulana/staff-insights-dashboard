import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNav from '../components/MobileNav';
import { useAppContext } from '../contexts/AppContext';
import { Eye, FileText, Users, Search, UserPlus, Edit, Filter } from 'lucide-react';
import StaffDetailModal from '../components/modals/StaffDetailModal';
import PermissionDetailsModal from '../components/modals/PermissionDetailsModal';
import FieldWorkDetailsModal from '../components/modals/FieldWorkDetailsModal';
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from 'react-router-dom';

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

interface FieldWorkDetails {
  tanggal: string;
  waktu: string;
  keterangan: string;
  kordinat: string;
  status: "Hadir" | "Pulang";
}

interface FilterState {
  status: string;
  position: string;
  gender: string;
}

const StaffListPage: React.FC = () => {
  const { staffList, attendanceData, exportToExcel } = useAppContext();
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPermission, setSelectedPermission] = useState<PermissionDetails | null>(null);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [selectedFieldWork, setSelectedFieldWork] = useState<FieldWorkDetails | null>(null);
  const [fieldWorkModalOpen, setFieldWorkModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    position: 'all',
    gender: 'all'
  });
  const navigate = useNavigate();
  
  const handleViewDetails = (staffId: string) => {
    setSelectedStaff(staffId);
  };
  
  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  const handleEditStaff = (staffId: string) => {
    navigate(`/staff/edit/${staffId}`);
  };

  const handleViewPermission = (staffId: string) => {
    // Find the latest permission for this staff member
    const staffPermissions = attendanceData
      .filter(record => record.staffId === staffId && record.status === 'Permission')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (staffPermissions.length > 0) {
      const latestPermission = staffPermissions[0];
      
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
        from: latestPermission.from || "N/A",
        until: latestPermission.until || "N/A",
        proof: latestPermission.proof || "",
        status: "Izin",
        Details: latestPermission.Details || "No details provided",
        Keterangan: latestPermission.Keterangan || "General"
      };
      
      setSelectedPermission(permissionDetails);
      setPermissionModalOpen(true);
    }
  };

  const handleViewFieldWork = (staffId: string) => {
    // Find the latest field work record for this staff member
    const staffFieldWorks = attendanceData
      .filter(record => record.staffId === staffId && record.Keterangan === "Lapangan")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (staffFieldWorks.length > 0) {
      const latestFieldWork = staffFieldWorks[0];
      
      // Create field work details object
      const fieldWorkDetails: FieldWorkDetails = {
        tanggal: new Date().toLocaleDateString("id-ID", { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        waktu: new Date().toLocaleTimeString("id-ID", { 
          hour: 'numeric', 
          minute: 'numeric' 
        }),
        keterangan: "Lapangan",
        kordinat: latestFieldWork.kordinat || "-8.592085 116.0952959",
        status: latestFieldWork.status === "Attendance" ? "Hadir" : "Pulang"
      };
      
      setSelectedFieldWork(fieldWorkDetails);
      setFieldWorkModalOpen(true);
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      position: 'all',
      gender: 'all'
    });
  };
  
  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || staff.status === filters.status;
    const matchesPosition = filters.position === 'all' || staff.position === filters.position;
    const matchesGender = filters.gender === 'all' || staff.gender === filters.gender;
    
    return matchesSearch && matchesStatus && matchesPosition && matchesGender;
  });

  // Get unique positions for filter dropdown
  const uniquePositions = [...new Set(staffList.map(staff => staff.position))];
  
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('status', 'all')}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('status', 'active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('status', 'inactive')}>
                  Inactive
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>Filter by Position</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('position', 'all')}>
                  All Positions
                </DropdownMenuItem>
                {uniquePositions.map(position => (
                  <DropdownMenuItem 
                    key={position} 
                    onClick={() => handleFilterChange('position', position)}
                  >
                    {position}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>Filter by Gender</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('gender', 'all')}>
                  All Genders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('gender', 'Male')}>
                  Male
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('gender', 'Female')}>
                  Female
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={clearFilters}>
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <TableHead className="w-[160px]">Action</TableHead>
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
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleViewDetails(staff.id)}
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Eye size={16} className="mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleEditStaff(staff.id)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                    </div>
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
      
      {/* Permission Details Modal */}
      <PermissionDetailsModal 
        isOpen={permissionModalOpen}
        onClose={() => setPermissionModalOpen(false)}
        permission={selectedPermission}
      />
      
      {/* Field Work Details Modal */}
      <FieldWorkDetailsModal
        isOpen={fieldWorkModalOpen}
        onClose={() => setFieldWorkModalOpen(false)}
        fieldWork={selectedFieldWork}
      />
      
      <MobileNav />
    </Layout>
  );
};

export default StaffListPage;
