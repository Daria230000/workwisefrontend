
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const riskEmployeeData = [
  { id: 1, name: 'Alice Cooper', department: 'Engineering', risk: 85, trend: 'up', reason: 'Weekend hours increased by 40%' },
  { id: 2, name: 'Bob Smith', department: 'Design', risk: 78, trend: 'up', reason: 'Consecutive late night work' },
  { id: 3, name: 'Carol Davis', department: 'Marketing', risk: 67, trend: 'down', reason: 'Multiple deadlines this week' },
  { id: 4, name: 'Dave Johnson', department: 'Product', risk: 64, trend: 'up', reason: 'Task overload in sprint' },
  { id: 5, name: 'Eva Williams', department: 'Engineering', risk: 58, trend: 'down', reason: 'Frequent context switching' },
];

const workloadData = [
  { team: 'Engineering', low: 3, medium: 5, high: 2 },
  { team: 'Design', low: 2, medium: 3, high: 1 },
  { team: 'Marketing', low: 4, medium: 2, high: 1 },
  { team: 'Product', low: 1, medium: 4, high: 2 },
  { team: 'QA', low: 2, medium: 3, high: 0 },
];

const riskFactorsData = [
  { name: 'Overtime', value: 35 },
  { name: 'Weekend Work', value: 25 },
  { name: 'Task Overload', value: 20 },
  { name: 'Context Switching', value: 15 },
  { name: 'Sick Days', value: 5 }
];

const COLORS = ['#8269FF', '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'];

const AIInsights: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Insights</h1>
        <div className="flex space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="14">Last 14 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="product">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Top Employees at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4 pt-2 text-left font-medium">Employee</th>
                    <th className="pb-4 pt-2 text-left font-medium">Department</th>
                    <th className="pb-4 pt-2 text-left font-medium">Risk Score</th>
                    <th className="pb-4 pt-2 text-left font-medium">Trend</th>
                    <th className="pb-4 pt-2 text-left font-medium">Key Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {riskEmployeeData.map((employee) => (
                    <tr key={employee.id} className="hover:bg-purple-50">
                      <td className="py-5">{employee.name}</td>
                      <td className="py-5">{employee.department}</td>
                      <td className="py-5">
                        <div className="font-medium text-red-500">{employee.risk}%</div>
                      </td>
                      <td className="py-5">
                        {employee.trend === 'up' ? (
                          <ArrowUp size={16} className="text-red-500" />
                        ) : (
                          <ArrowDown size={16} className="text-green-500" />
                        )}
                      </td>
                      <td className="py-5">{employee.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Burnout Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskFactorsData}
                    cx="50%"
                    cy="40%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskFactorsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{paddingTop: "20px"}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Team Workload Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={workloadData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="team" type="category" />
                  <Tooltip />
                  <Bar dataKey="low" stackId="a" fill="#06D6A0" name="Low Workload" />
                  <Bar dataKey="medium" stackId="a" fill="#FFD166" name="Medium Workload" />
                  <Bar dataKey="high" stackId="a" fill="#FF6B6B" name="High Workload" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Performance vs. Burnout Risk</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: 'Jan', performance: 85, burnoutRisk: 25 },
                    { month: 'Feb', performance: 80, burnoutRisk: 32 },
                    { month: 'Mar', performance: 78, burnoutRisk: 45 },
                    { month: 'Apr', performance: 75, burnoutRisk: 58 },
                    { month: 'May', performance: 70, burnoutRisk: 65 },
                  ]}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="performance" name="Performance" stroke="#8269FF" strokeWidth={2} />
                  <Line type="monotone" dataKey="burnoutRisk" name="Burnout Risk" stroke="#FF6B6B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Risk Threshold Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Critical Risk (75-100%)</h4>
                  <Badge className="bg-red-100 text-red-800">3 Employees</Badge>
                </div>
                <p className="text-sm text-gray-600">Immediate intervention recommended. Schedule 1:1 meetings and consider workload adjustments.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">High Risk (50-74%)</h4>
                  <Badge className="bg-orange-100 text-orange-800">7 Employees</Badge>
                </div>
                <p className="text-sm text-gray-600">Monitor closely. Review workload and consider proactive support measures.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Moderate Risk (25-49%)</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">15 Employees</Badge>
                </div>
                <p className="text-sm text-gray-600">Regular check-ins advised. No immediate action required but maintain awareness.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Low Risk (0-24%)</h4>
                  <Badge className="bg-green-100 text-green-800">28 Employees</Badge>
                </div>
                <p className="text-sm text-gray-600">Healthy work patterns detected. Continue current management approach.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
