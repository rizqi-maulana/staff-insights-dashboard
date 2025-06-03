
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from '../../contexts/AppContext';

interface TodayAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodayAttendanceModal: React.FC<TodayAttendanceModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { attendanceData, staffList } = useAppContext();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter attendance records for today
  const todayAttendance = attendanceData.filter(record => {
    const recordDate = new Date(record.date).toISOString().split('T')[0];
    return recordDate === today;
  });
  
  // Categorize attendance
  const presentStaff = todayAttendance.filter(record => record.status === 'Attendance');
  const permissionStaff = todayAttendance.filter(record => record.status === 'Permission');
  const noInfoStaff = todayAttendance.filter(record => record.status === 'No Information');
  
  // Get staff who have no attendance record for today
  const staffWithAttendance = todayAttendance.map(record => record.staffId);
  const staffWithoutRecord = staffList.filter(staff => 
    !staffWithAttendance.includes(staff.id) && staff.status === 'active'
  );

  const AttendanceSection = ({ title, records, variant, staffRecords = null }: {
    title: string;
    records: any[];
    variant: "default" | "secondary" | "destructive" | "outline";
    staffRecords?: any[] | null;
  }) => (
    <div className="mb-4">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        {title}
        <Badge variant={variant}>
          {staffRecords ? staffRecords.length : records.length}
        </Badge>
      </h4>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {(staffRecords || records).map((item) => (
          <div 
            key={staffRecords ? item.id : item.id} 
            className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-sm"
          >
            <span className="font-medium">
              {staffRecords ? item.name : item.staffName}
            </span>
            <span className="text-gray-600">
              {staffRecords ? item.position : 
                (item.Keterangan && item.Keterangan !== 'undefined' ? item.Keterangan : 'Office')}
            </span>
          </div>
        ))}
        {(staffRecords || records).length === 0 && (
          <p className="text-gray-500 text-sm italic">No records</p>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Today's Attendance</DialogTitle>
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <AttendanceSection 
            title="Present" 
            records={presentStaff} 
            variant="default"
          />
          
          <AttendanceSection 
            title="Permission" 
            records={permissionStaff} 
            variant="secondary"
          />
          
          <AttendanceSection 
            title="No Information" 
            records={noInfoStaff} 
            variant="destructive"
          />
          
          {staffWithoutRecord.length > 0 && (
            <AttendanceSection 
              title="No Record" 
              records={[]} 
              variant="outline"
              staffRecords={staffWithoutRecord}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodayAttendanceModal;
