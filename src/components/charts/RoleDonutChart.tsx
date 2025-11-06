
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Staff } from '../../contexts/AppContext';
import { useIsMobile } from '../../hooks/use-mobile';

interface RoleDonutChartProps {
  data: Staff[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

const RoleDonutChart: React.FC<RoleDonutChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  
  const chartData = useMemo(() => {
    // Count staff by position
    const positionCounts: { [key: string]: number } = {};
    
    data.forEach(staff => {
      positionCounts[staff.position] = (positionCounts[staff.position] || 0) + 1;
    });
    
    // Convert to chart format
    return Object.entries(positionCounts).map(([position, count]) => ({
      name: position,
      value: count
    }));
  }, [data]);

  const innerRadius = isMobile ? 40 : 60;
  const outerRadius = isMobile ? 60 : 80;

  return (
    <div className="card-container h-72 md:h-80 lg:h-96">
      <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Staff by Position</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} staff`, 'Count']} />
          <Legend 
            wrapperStyle={{ fontSize: isMobile ? '12px' : '14px' }}
            iconSize={isMobile ? 8 : 10}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoleDonutChart;
