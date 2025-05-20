
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Attendance } from '../../contexts/AppContext';

interface AttendanceBarChartProps {
  data: Attendance[];
  dateRange: 'day' | 'week' | 'month';
}

const AttendanceBarChart: React.FC<AttendanceBarChartProps> = ({ data, dateRange }) => {
  const chartData = useMemo(() => {
    // Get start date based on the range
    const now = new Date();
    let startDate = new Date();
    
    if (dateRange === 'day') {
      // For daily view, show the current day by hours
      return [
        { name: 'Morning', Attendance: 0, Permission: 0, 'No Information': 0 },
        { name: 'Afternoon', Attendance: 0, Permission: 0, 'No Information': 0 },
        { name: 'Evening', Attendance: 0, Permission: 0, 'No Information': 0 },
      ];
    } else if (dateRange === 'week') {
      startDate.setDate(now.getDate() - 6); // Last 7 days
      
      // Create an array of dates for the last 7 days
      const dates = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(now.getDate() - 6 + i);
        return date;
      });
      
      // Initialize chart data with days of the week
      const chartData = dates.map(date => ({
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toISOString().split('T')[0],
        Attendance: 0,
        Permission: 0,
        'No Information': 0
      }));
      
      // Count occurrences by date and status
      data.forEach(record => {
        const recordDate = new Date(record.date).toISOString().split('T')[0];
        const dayIndex = chartData.findIndex(d => d.date === recordDate);
        
        if (dayIndex !== -1) {
          chartData[dayIndex][record.status] += 1;
        }
      });
      
      return chartData;
    } else {
      // Month view - last 30 days grouped by week
      startDate.setDate(now.getDate() - 29); // Last 30 days
      
      // Group by week
      const weeks = [
        { name: 'Week 1', Attendance: 0, Permission: 0, 'No Information': 0 },
        { name: 'Week 2', Attendance: 0, Permission: 0, 'No Information': 0 },
        { name: 'Week 3', Attendance: 0, Permission: 0, 'No Information': 0 },
        { name: 'Week 4', Attendance: 0, Permission: 0, 'No Information': 0 },
      ];
      
      data.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate >= startDate) {
          // Calculate which week this belongs to (0-3)
          const daysSinceStart = Math.floor((recordDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          const weekIndex = Math.min(3, Math.floor(daysSinceStart / 7));
          
          weeks[weekIndex][record.status] += 1;
        }
      });
      
      return weeks;
    }
  }, [data, dateRange]);

  return (
    <div className="card-container h-72">
      <h2 className="text-lg font-semibold mb-4">Attendance Statistics</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Attendance" fill="#3B82F6" />
          <Bar dataKey="Permission" fill="#F59E0B" />
          <Bar dataKey="No Information" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceBarChart;
