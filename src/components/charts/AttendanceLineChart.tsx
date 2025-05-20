
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Attendance } from '../../contexts/AppContext';

interface AttendanceLineChartProps {
  data: Attendance[];
  dateRange: 'day' | 'week' | 'month';
}

const AttendanceLineChart: React.FC<AttendanceLineChartProps> = ({ data, dateRange }) => {
  const chartData = useMemo(() => {
    // Get start date based on the range
    const now = new Date();
    let startDate = new Date();
    let format: 'hourly' | 'daily' | 'weekly' = 'daily';
    
    if (dateRange === 'day') {
      // For daily view, show by hours of the day
      format = 'hourly';
      startDate.setHours(0, 0, 0, 0); // Start of today
    } else if (dateRange === 'week') {
      // For weekly view, show last 7 days
      format = 'daily';
      startDate.setDate(now.getDate() - 6); // Last 7 days
    } else {
      // For monthly view, show last 4 weeks
      format = 'weekly';
      startDate.setDate(now.getDate() - 30); // Last 30 days
    }
    
    if (format === 'hourly') {
      // Create 24-hour data
      const hourlyData = Array(24).fill(0).map((_, hour) => ({
        name: `${hour}:00`,
        Attendance: 0,
        Permission: 0,
        'No Information': 0,
        Total: 0
      }));
      
      // Only count today's data
      const today = new Date().toISOString().split('T')[0];
      
      data.forEach(record => {
        const recordDate = new Date(record.date);
        const recordDateStr = recordDate.toISOString().split('T')[0];
        
        if (recordDateStr === today) {
          const hour = recordDate.getHours();
          hourlyData[hour][record.status] += 1;
          hourlyData[hour].Total += 1;
        }
      });
      
      // Take 6-hour chunks for better visualization
      return [
        { name: 'Morning (6-12)', ...aggregateHours(hourlyData, 6, 12) },
        { name: 'Afternoon (12-18)', ...aggregateHours(hourlyData, 12, 18) },
        { name: 'Evening (18-24)', ...aggregateHours(hourlyData, 18, 24) },
        { name: 'Night (0-6)', ...aggregateHours(hourlyData, 0, 6) }
      ];
    } else if (format === 'daily') {
      // Create daily data for the past week
      const days = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(now.getDate() - 6 + i);
        return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          date: date.toISOString().split('T')[0],
          Attendance: 0,
          Permission: 0,
          'No Information': 0,
          Total: 0
        };
      });
      
      data.forEach(record => {
        const recordDate = new Date(record.date).toISOString().split('T')[0];
        const dayIndex = days.findIndex(d => d.date === recordDate);
        
        if (dayIndex !== -1) {
          days[dayIndex][record.status] += 1;
          days[dayIndex].Total += 1;
        }
      });
      
      return days;
    } else {
      // Create weekly data
      const weeksData = [
        { name: 'Week 1', Attendance: 0, Permission: 0, 'No Information': 0, Total: 0 },
        { name: 'Week 2', Attendance: 0, Permission: 0, 'No Information': 0, Total: 0 },
        { name: 'Week 3', Attendance: 0, Permission: 0, 'No Information': 0, Total: 0 },
        { name: 'Week 4', Attendance: 0, Permission: 0, 'No Information': 0, Total: 0 },
      ];
      
      data.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate >= startDate) {
          // Calculate which week this belongs to (0-3)
          const daysSinceStart = Math.floor((recordDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          const weekIndex = Math.min(3, Math.floor(daysSinceStart / 7));
          
          weeksData[weekIndex][record.status] += 1;
          weeksData[weekIndex].Total += 1;
        }
      });
      
      return weeksData;
    }
  }, [data, dateRange]);

  // Helper function to aggregate hourly data
  function aggregateHours(hourlyData: any[], startHour: number, endHour: number) {
    const result = {
      Attendance: 0,
      Permission: 0,
      'No Information': 0,
      Total: 0
    };
    
    for (let hour = startHour; hour < endHour; hour++) {
      result.Attendance += hourlyData[hour].Attendance;
      result.Permission += hourlyData[hour].Permission;
      result['No Information'] += hourlyData[hour]['No Information'];
      result.Total += hourlyData[hour].Total;
    }
    
    return result;
  }

  return (
    <div className="card-container h-72">
      <h2 className="text-lg font-semibold mb-4">Attendance Trends</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Total" stroke="#6366F1" strokeWidth={2} />
          <Line type="monotone" dataKey="Attendance" stroke="#3B82F6" />
          <Line type="monotone" dataKey="Permission" stroke="#F59E0B" />
          <Line type="monotone" dataKey="No Information" stroke="#EF4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceLineChart;
