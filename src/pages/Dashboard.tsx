
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Calendar, Filter, ArrowDown, ArrowUp } from 'lucide-react';

const performanceData = [
  { name: 'Week 1', value: 75 },
  { name: 'Week 2', value: 69 },
  { name: 'Week 3', value: 78 },
  { name: 'Week 4', value: 82 },
];

const sprintData = [
  { name: 'Sprint 1', assigned: 45, completed: 40 },
  { name: 'Sprint 2', assigned: 50, completed: 38 },
  { name: 'Sprint 3', assigned: 42, completed: 40 },
  { name: 'Sprint 4', assigned: 48, completed: 45 },
];

const riskEmployeeData = [
  { id: 1, name: 'Alice Cooper', department: 'Engineering', risk: 85, trend: 'up', reason: 'Weekend hours increased by 40%' },
  { id: 2, name: 'Bob Smith', department: 'Design', risk: 78, trend: 'up', reason: 'Consecutive late night work' },
  { id: 3, name: 'Carol Davis', department: 'Marketing', risk: 67, trend: 'down', reason: 'Multiple deadlines this week' },
  { id: 4, name: 'Dave Johnson', department: 'Product', risk: 64, trend: 'up', reason: 'Task overload in sprint' },
  { id: 5, name: 'Eva Williams', department: 'Engineering', risk: 58, trend: 'down', reason: 'Frequent context switching' },
];

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [toolFilter, setToolFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="14">Last 14 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={toolFilter} onValueChange={setToolFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tool Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tools</SelectItem>
              <SelectItem value="jira">Jira Only</SelectItem>
              <SelectItem value="toggl">Toggl Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Burnout Risk Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-1">72.5%</div>
            <p className="text-sm text-gray-500 mb-4">Organization average</p>
            <div className="h-2 bg-gray-100 rounded-full mb-4">
              <div className="h-2 bg-red-500 rounded-full" style={{ width: '72.5%' }}></div>
            </div>
            <div className="text-sm">
              <span className="text-red-500 font-medium">+12.3%</span> since last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-1">24</div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span>Burnout Risk Alerts</span>
                <span className="font-medium text-red-500">12</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Performance Dips</span>
                <span className="font-medium text-orange-500">7</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Absenteeism Alerts</span>
                <span className="font-medium text-yellow-500">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Productivity Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-1">87.2%</div>
            <p className="text-sm text-gray-500 mb-4">Sprint success rate</p>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span>Avg. Hours/Day</span>
                <span className="font-medium">7.8</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Tasks Completed</span>
                <span className="font-medium">342</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Current Task Load</span>
                <span className="font-medium">Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Performance Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8269FF" 
                    strokeWidth={2} 
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sprint Stress Index</CardTitle>
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
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Employees at Highest Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left">Employee</th>
                  <th className="pb-3 text-left">Department</th>
                  <th className="pb-3 text-left">Risk Score</th>
                  <th className="pb-3 text-left">Trend</th>
                  <th className="pb-3 text-left">Primary Reason</th>
                  <th className="pb-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {riskEmployeeData.map((employee) => (
                  <tr key={employee.id} className="hover:bg-purple-50">
                    <td className="py-4">{employee.name}</td>
                    <td className="py-4">{employee.department}</td>
                    <td className="py-4">
                      <div className="font-medium text-red-500">{employee.risk}%</div>
                    </td>
                    <td className="py-4">
                      {employee.trend === 'up' ? (
                        <ArrowUp size={16} className="text-red-500" />
                      ) : (
                        <ArrowDown size={16} className="text-green-500" />
                      )}
                    </td>
                    <td className="py-4">{employee.reason}</td>
                    <td className="py-4">
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
