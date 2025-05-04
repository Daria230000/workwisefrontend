
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface SprintStressChartProps {
  sprintTab: string;
  setSprintTab: React.Dispatch<React.SetStateAction<string>>;
  sprintData: Array<{
    name: string;
    assigned: number;
    completed: number;
  }>;
}

const SprintStressChart: React.FC<SprintStressChartProps> = ({ 
  sprintTab, 
  setSprintTab,
  sprintData 
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle className="mb-3">Sprint Stress Index</CardTitle>
          <Tabs value={sprintTab} onValueChange={setSprintTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="current">Current Sprint</TabsTrigger>
              <TabsTrigger value="previous">Previous Sprint</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sprintData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assigned" fill="#8269FF" name="Assigned Tasks" />
              <Bar dataKey="completed" fill="#D5CCFF" name="Completed Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintStressChart;
