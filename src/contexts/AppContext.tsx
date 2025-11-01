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
  from?: string;
  until?: string;
  proof?: string;
  Details?: string;
  Keterangan?: string;
  kordinat?: string;
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

// Add new interface for access keys
export interface AccessKey {
  id: string;
  key: string;
  name: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  accessCount: number;
  lastAccessedAt?: string;
}

export interface AppUpdate {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
  type: 'feature' | 'improvement' | 'bugfix';
  platform: 'desktop' | 'android';
}

interface AppContextType {
  serverAddress: string;
  setServerAddress: (address: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  staffList: Staff[];
  setStaffList: (staff: Staff[]) => void;
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
  activateAllStaff: () => void;
  deactivateAllStaff: () => void;
  resetAllDevices: () => void;
  refreshAllQRCodes: () => void;
  deleteAllStaff: () => void;
  backupToCloud: () => Promise<void>;
  backupToLocal: () => void;
  restoreFromFile: (file: File) => Promise<void>;
  accessKeys: AccessKey[];
  generateAccessKey: (name: string, expiresInDays?: number) => AccessKey;
  deleteAccessKey: (id: string) => void;
  validateAccessKey: (key: string) => boolean;
  incrementKeyUsage: (key: string) => void;
  appUpdates: AppUpdate[];
  appVersion: string;
  hasUnreadUpdates: boolean;
  markUpdatesAsRead: () => void;
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
  { id: '4', staffId: '4', date: new Date().toISOString(), status: 'Permission', staffName: 'Sarah Williams', from: '09:00', until: '12:00', Details: 'Doctor appointment', Keterangan: 'Medical' },
  { id: '5', staffId: '5', date: new Date().toISOString(), status: 'Attendance', staffName: 'David Brown', Keterangan: 'Lapangan', kordinat: '-8.592085 116.0952959' },
  
  // Yesterday
  { 
    id: '6', 
    staffId: '1', 
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), 
    status: 'Attendance',
    staffName: 'John Doe',
    Keterangan: 'Lapangan',
    kordinat: '-8.591085 116.0942959'
  },
  { 
    id: '7', 
    staffId: '2', 
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), 
    status: 'Permission',
    staffName: 'Jane Smith',
    from: '13:00',
    until: '17:00',
    Details: 'Family emergency',
    Keterangan: 'Personal'
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
  const [accessKeys, setAccessKeys] = useState<AccessKey[]>([]);
  const [hasUnreadUpdates, setHasUnreadUpdates] = useState<boolean>(true);
  
  const appVersion = "1.2.0";
  const appUpdates: AppUpdate[] = [
    {
      id: '1',
      version: '1.2.0',
      date: 'November 1, 2025',
      title: 'Update Notification System',
      description: 'Stay informed with our new update notification system that keeps you in the loop about new features and improvements.',
      features: [
        'Beautiful update modal with version tracking',
        'Visual updates with optional images',
        'Categorized updates (Features, Improvements, Bug Fixes)',
        'Detailed descriptions and feature lists'
      ],
      type: 'feature',
      platform: 'desktop'
    },
    {
      id: '2',
      version: '1.1.0',
      date: 'October 15, 2025',
      title: 'Access Key Management',
      description: 'Enhanced security with comprehensive access key management for sharing dashboard analytics.',
      features: [
        'Generate shareable access keys',
        'Set expiration dates for keys',
        'Track key usage and analytics',
        'Secure dashboard sharing'
      ],
      type: 'feature',
      platform: 'desktop'
    },
    {
      id: '3',
      version: '1.2.0',
      date: 'November 1, 2025',
      title: 'Android App Launch',
      description: 'Download and install our brand new Android application for on-the-go access to your staff dashboard.',
      features: [
        'Native Android experience',
        'Offline data sync',
        'Push notifications for attendance updates',
        'Fingerprint authentication support'
      ],
      type: 'feature',
      platform: 'android'
    },
    {
      id: '4',
      version: '1.1.5',
      date: 'October 20, 2025',
      title: 'Performance Improvements',
      description: 'Faster app loading and improved battery efficiency for the Android version.',
      features: [
        'Reduced app size by 30%',
        'Optimized background sync',
        'Better battery performance',
        'Faster startup time'
      ],
      type: 'improvement',
      platform: 'android'
    }
  ];

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

  const activateAllStaff = () => {
    setStaffList(prevStaff => 
      prevStaff.map(staff => ({ ...staff, status: 'active' }))
    );
    console.log('All staff accounts activated');
  };

  const deactivateAllStaff = () => {
    setStaffList(prevStaff => 
      prevStaff.map(staff => ({ ...staff, status: 'inactive' }))
    );
    console.log('All staff accounts deactivated');
  };

  const resetAllDevices = () => {
    console.log('All device accounts reset');
    // In a real application, this would trigger a mass device reset API call
  };

  const refreshAllQRCodes = () => {
    console.log('All QR codes refreshed');
    // In a real application, this would regenerate QR codes for all staff
  };

  const deleteAllStaff = () => {
    setStaffList([]);
    console.log('All staff accounts deleted');
  };

  const backupToCloud = async () => {
    const backupData = {
      staffList,
      attendanceData,
      notifications,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    try {
      // Simulate cloud backup
      console.log('Backing up to cloud...', backupData);
      // In a real app, this would upload to cloud storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Cloud backup completed successfully');
    } catch (error) {
      console.error('Cloud backup failed:', error);
      throw error;
    }
  };

  const backupToLocal = () => {
    const backupData = {
      staffList,
      attendanceData,
      notifications,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `attendance-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Local backup downloaded successfully');
  };

  const restoreFromFile = async (file: File) => {
    try {
      const text = await file.text();
      const backupData = JSON.parse(text);
      
      // Validate backup data structure
      if (!backupData.staffList || !backupData.attendanceData || !backupData.notifications) {
        throw new Error('Invalid backup file format');
      }
      
      // Restore data
      setStaffList(backupData.staffList);
      setAttendanceData(backupData.attendanceData);
      setNotifications(backupData.notifications);
      
      console.log('Data restored successfully from backup');
    } catch (error) {
      console.error('Restore failed:', error);
      throw error;
    }
  };

  const generateAccessKey = (name: string, expiresInDays?: number): AccessKey => {
    const newKey: AccessKey = {
      id: Math.random().toString(36).substring(2, 15),
      key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      name,
      createdAt: new Date().toISOString(),
      expiresAt: expiresInDays ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString() : undefined,
      isActive: true,
      accessCount: 0,
      lastAccessedAt: undefined
    };
    
    setAccessKeys(prev => [...prev, newKey]);
    return newKey;
  };

  const deleteAccessKey = (id: string) => {
    setAccessKeys(prev => prev.filter(key => key.id !== id));
  };

  const validateAccessKey = (key: string): boolean => {
    const accessKey = accessKeys.find(k => k.key === key && k.isActive);
    if (!accessKey) return false;
    
    // Check if expired
    if (accessKey.expiresAt && new Date(accessKey.expiresAt) < new Date()) {
      return false;
    }
    
    return true;
  };

  const incrementKeyUsage = (key: string) => {
    setAccessKeys(prev => prev.map(k => 
      k.key === key 
        ? { ...k, accessCount: k.accessCount + 1, lastAccessedAt: new Date().toISOString() }
        : k
    ));
  };

  const markUpdatesAsRead = () => {
    setHasUnreadUpdates(false);
  };

  return (
    <AppContext.Provider
      value={{
        serverAddress,
        setServerAddress,
        isLoggedIn,
        setIsLoggedIn,
        staffList,
        setStaffList,
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
        exportToExcel,
        activateAllStaff,
        deactivateAllStaff,
        resetAllDevices,
        refreshAllQRCodes,
        deleteAllStaff,
        backupToCloud,
        backupToLocal,
        restoreFromFile,
        accessKeys,
        generateAccessKey,
        deleteAccessKey,
        validateAccessKey,
        incrementKeyUsage,
        appUpdates,
        appVersion,
        hasUnreadUpdates,
        markUpdatesAsRead
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
