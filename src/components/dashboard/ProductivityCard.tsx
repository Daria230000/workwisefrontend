
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProductivityCardProps {
  productivityData: {
    sprintSuccess: number;
    avgHours: number;
    tasksCompleted: number;
    taskLoad: string;
  };
}

const ProductivityCard: React.FC<ProductivityCardProps> = ({ productivityData }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Productivity Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-purple-600 mb-1">{productivityData.sprintSuccess}%</div>
        <p className="text-sm text-gray-500 mb-4">Sprint success rate</p>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center text-sm">
            <span>Avg. Hours/Day</span>
            <span className="font-medium">{productivityData.avgHours}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Tasks Completed</span>
            <span className="font-medium">{productivityData.tasksCompleted}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Current Task Load</span>
            <span className="font-medium">{productivityData.taskLoad}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductivityCard;
