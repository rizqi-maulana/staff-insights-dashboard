
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for staff members
export interface Staff {
  id: string;
  name: string;
  position: string;
  gender: string;
  email: string;
  status: 'active' | 'inactive';
  address: string;
  photo?: string;
  password: string;
}

// Types for attendance records
export interface Attendance {
  id: string;
  staffId: string;
  date: string;
  status: 'Attendance' | 'Permission' | 'No Information';
  staffName?: string;
}

// Types for notifications
export interface Notification {
  id: string;
  staffId: string;
  type: 'permission' | 'field';
  date: string;
  message: string;
  image?: string;
  read: boolean;
  staffName?: string;
}

interface AppContextType {
  serverAddress: string;
  setServerAddress: (address: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  staffList: Staff[];
  attendanceData: Attendance[];
  notifications: Notification[];
  dateRange: 'day' | 'week' | 'month';
  setDateRange: (range: 'day' | 'week' | 'month') => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleStaffStatus: (id: string) => void;
  resetDevice: (id: string) => void;
  deleteStaff: (id: string) => void;
  resetServerName: () => void;
  exportToExcel: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample data for demonstration
const sampleStaff: Staff[] = [
  { id: '1', name: 'John Doe', position: 'Manager', gender: 'Male', email: 'john@example.com', status: 'active', address: '123 Main St', password: 'password123' },
  { id: '2', name: 'Jane Smith', position: 'Developer', gender: 'Female', email: 'jane@example.com', status: 'active', address: '456 Oak St', password: 'password456' },
  { id: '3', name: 'Mike Johnson', position: 'Designer', gender: 'Male', email: 'mike@example.com', status: 'inactive', address: '789 Pine St', password: 'password789' },
  { id: '4', name: 'Sarah Williams', position: 'HR', gender: 'Female', email: 'sarah@example.com', status: 'active', address: '101 Elm St', password: 'password101' },
  { id: '5', name: 'David Brown', position: 'Sales', gender: 'Male', email: 'david@example.com', status: 'active', address: '202 Maple St', password: 'password202' },
];

const sampleAttendance: Attendance[] = [
  // Today
  { id: '1', staffId: '1', date: new Date().toISOString(), status: 'Attendance', staffName: 'John Doe' },
  { id: '2', staffId: '2', date: new Date().toISOString(), status: 'Attendance', staffName: 'Jane Smith' },
  { id: '3', staffId: '3', date: new Date().toISOString(), status: 'No Information', staffName: 'Mike Johnson' },
  { id: '4', staffId: '4', date: new Date().toISOString(), status: 'Permission', staffName: 'Sarah Williams' },
  { id: '5', staffId: '5', date: new Date().toISOString(), status: 'Attendance', staffName: 'David Brown' },
  
  // Yesterday
  { 
    id: '6', 
    staffId: '1', 
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), 
    status: 'Attendance',
    staffName: 'John Doe'
  },
  { 
    id: '7', 
    staffId: '2', 
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), 
    status: 'Permission',
    staffName: 'Jane Smith' 
  },
  
  // Two days ago
  { 
    id: '8', 
    staffId: '3', 
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), 
    status: 'Attendance',
    staffName: 'Mike Johnson'
  },
  
  // Add some more historical data for charts
  ...Array(28).fill(null).map((_, i) => ({
    id: `${i + 9}`,
    staffId: `${(i % 5) + 1}`,
    date: new Date(new Date().setDate(new Date().getDate() - (i + 3))).toISOString(),
    status: ['Attendance', 'Permission', 'No Information'][Math.floor(Math.random() * 3)] as 'Attendance' | 'Permission' | 'No Information',
    staffName: sampleStaff[(i % 5)].name
  }))
];

const sampleNotifications: Notification[] = [
  { 
    id: '1', 
    staffId: '2', 
    type: 'permission', 
    date: new Date().toISOString(), 
    message: 'Jane Smith requested permission for leave',
    read: false,
    staffName: 'Jane Smith'
  },
  { 
    id: '2', 
    staffId: '4', 
    type: 'field', 
    date: new Date().toISOString(), 
    message: 'Sarah Williams is absent in the field',
    read: false,
    staffName: 'Sarah Williams'
  },
  { 
    id: '3', 
    staffId: '3', 
    type: 'permission', 
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), 
    message: 'Mike Johnson requested permission for leave',
    read: true,
    staffName: 'Mike Johnson'
  },
  { 
    id: '4', 
    staffId: '1', 
    type: 'field', 
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), 
    message: 'John Doe is absent in the field',
    read: true,
    staffName: 'John Doe'
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [serverAddress, setServerAddress] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [staffList, setStaffList] = useState<Staff[]>(sampleStaff);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>(sampleAttendance);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month'>('day');

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate authentication
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setServerAddress('');
  };

  const toggleStaffStatus = (id: string) => {
    setStaffList(prevStaff => 
      prevStaff.map(staff => 
        staff.id === id 
          ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active' } 
          : staff
      )
    );
  };

  const resetDevice = (id: string) => {
    console.log(`Device reset for staff ID: ${id}`);
    // In a real application, this would trigger a device reset API call
  };

  const deleteStaff = (id: string) => {
    setStaffList(prevStaff => prevStaff.filter(staff => staff.id !== id));
  };

  const resetServerName = () => {
    setServerAddress('');
    setIsLoggedIn(false);
  };

  const exportToExcel = () => {
    console.log('Exporting data to Excel');
    // In a real application, this would generate and download an Excel file
  };

  return (
    <AppContext.Provider
      value={{
        serverAddress,
        setServerAddress,
        isLoggedIn,
        setIsLoggedIn,
        staffList,
        attendanceData,
        notifications,
        dateRange,
        setDateRange,
        login,
        logout,
        toggleStaffStatus,
        resetDevice,
        deleteStaff,
        resetServerName,
        exportToExcel
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
