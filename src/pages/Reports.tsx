
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { FileText, Download, Link } from 'lucide-react';

const productivityData = [
  { month: 'Jan', productivity: 65, pto: 2 },
  { month: 'Feb', productivity: 72, pto: 1 },
  { month: 'Mar', productivity: 78, pto: 3 },
  { month: 'Apr', productivity: 74, pto: 2 },
  { month: 'May', productivity: 80, pto: 5 },
  { month: 'Jun', productivity: 85, pto: 1 },
];

const teamData = [
  { name: 'Web Team', burnoutIndex: 56, sickDays: 12, tasksCompleted: 187 },
  { name: 'Mobile Team', burnoutIndex: 67, sickDays: 18, tasksCompleted: 145 },
  { name: 'DevOps Team', burnoutIndex: 48, sickDays: 7, tasksCompleted: 156 },
  { name: 'Design Team', burnoutIndex: 51, sickDays: 10, tasksCompleted: 124 },
  { name: 'QA Team', burnoutIndex: 62, sickDays: 15, tasksCompleted: 98 },
];

const sprintComparisonData = [
  { sprint: 'Sprint 1', assigned: 45, completed: 40 },
  { sprint: 'Sprint 2', assigned: 50, completed: 38 },
  { sprint: 'Sprint 3', assigned: 42, completed: 40 },
  { sprint: 'Sprint 4', assigned: 48, completed: 45 },
];

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('pdf');
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="14">Last 14 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Export Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="csv">Export as CSV</SelectItem>
              <SelectItem value="link">Shareable Link</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="individual" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="individual">Individual Reports</TabsTrigger>
          <TabsTrigger value="team">Team Reports</TabsTrigger>
          <TabsTrigger value="organization">Organization Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Employee Productivity Trend</CardTitle>
                <CardDescription>
                  Last 6 months productivity trends with PTO correlation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="productivity" name="Productivity" stroke="#8269FF" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="pto" name="PTO Days" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Burnout Trend</CardTitle>
                <CardDescription>
                  Risk score over time with key contributing factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { date: 'Jan', score: 35 },
                        { date: 'Feb', score: 42 },
                        { date: 'Mar', score: 58 },
                        { date: 'Apr', score: 52 },
                        { date: 'May', score: 65 },
                        { date: 'Jun', score: 72 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="score" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Individual Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium">Performance Summary</h3>
                    <p className="text-sm text-gray-500 mt-1">Complete task and productivity analysis</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium">Burnout Analysis</h3>
                    <p className="text-sm text-gray-500 mt-1">Detailed burnout risk and contributing factors</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium">Time Off Report</h3>
                    <p className="text-sm text-gray-500 mt-1">PTO usage and sick days analysis</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-left">Team</th>
                        <th className="pb-3 text-left">Burnout Index</th>
                        <th className="pb-3 text-left">Sick Days</th>
                        <th className="pb-3 text-left">Tasks Completed</th>
                        <th className="pb-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {teamData.map((team, i) => (
                        <tr key={i} className="hover:bg-purple-50">
                          <td className="py-4">{team.name}</td>
                          <td className="py-4">
                            <div className={`font-medium ${
                              team.burnoutIndex > 60 ? 'text-red-500' : 
                              team.burnoutIndex > 50 ? 'text-orange-500' : 'text-green-500'
                            }`}>{team.burnoutIndex}%</div>
                          </td>
                          <td className="py-4">{team.sickDays}</td>
                          <td className="py-4">{team.tasksCompleted}</td>
                          <td className="py-4">
                            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                              View Report
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sprint Delivery vs. Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sprintComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sprint" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="assigned" name="Tasks Assigned" fill="#8269FF" />
                      <Bar dataKey="completed" name="Tasks Completed" fill="#D5CCFF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="organization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Organizational Burnout Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { riskLevel: 'Low (0-25%)', count: 23 },
                        { riskLevel: 'Moderate (26-50%)', count: 35 },
                        { riskLevel: 'High (51-75%)', count: 28 },
                        { riskLevel: 'Critical (76-100%)', count: 14 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="riskLevel" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="count" name="Employees" fill="#8269FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Productivity Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', productivity: 68 },
                        { month: 'Feb', productivity: 72 },
                        { month: 'Mar', productivity: 75 },
                        { month: 'Apr', productivity: 70 },
                        { month: 'May', productivity: 78 },
                        { month: 'Jun', productivity: 82 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="productivity" name="Productivity" stroke="#8269FF" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Organization Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium">Company-wide Burnout Assessment</h3>
                    <p className="text-sm text-gray-500 mt-1">Risk distribution across departments</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium">Productivity Insights</h3>
                    <p className="text-sm text-gray-500 mt-1">Task completion and sprint statistics</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium">Executive Summary</h3>
                    <p className="text-sm text-gray-500 mt-1">High-level overview for leadership</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Reports;
