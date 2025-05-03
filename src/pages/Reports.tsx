
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileText, Download, Link, ArrowDown, ArrowUp, Calendar, RefreshCw, Eye } from 'lucide-react';
import { toast } from "sonner";

// Sample data for different time periods
const getProductivityData = (period: string) => {
  if (period === '7') {
    return [
      { month: 'Mon', productivity: 70, pto: 0 },
      { month: 'Tue', productivity: 75, pto: 0 },
      { month: 'Wed', productivity: 72, pto: 0 },
      { month: 'Thu', productivity: 68, pto: 1 },
      { month: 'Fri', productivity: 65, pto: 0 },
      { month: 'Sat', productivity: 40, pto: 0 },
      { month: 'Sun', productivity: 0, pto: 1 },
    ];
  } else if (period === '14') {
    return [
      { month: 'W1-Mon', productivity: 68, pto: 0 },
      { month: 'W1-Wed', productivity: 72, pto: 0 },
      { month: 'W1-Fri', productivity: 65, pto: 0 },
      { month: 'W2-Mon', productivity: 70, pto: 0 },
      { month: 'W2-Wed', productivity: 74, pto: 1 },
      { month: 'W2-Fri', productivity: 78, pto: 0 },
      { month: 'W2-Sun', productivity: 0, pto: 1 },
    ];
  } else if (period === '90') {
    return [
      { month: 'Jan', productivity: 65, pto: 2 },
      { month: 'Feb', productivity: 72, pto: 1 },
      { month: 'Mar', productivity: 78, pto: 3 },
      { month: 'Apr', productivity: 74, pto: 2 },
      { month: 'May', productivity: 80, pto: 5 },
      { month: 'Jun', productivity: 85, pto: 1 },
    ];
  } else {
    // 30 days default
    return [
      { month: 'Week 1', productivity: 70, pto: 1 },
      { month: 'Week 2', productivity: 75, pto: 0 },
      { month: 'Week 3', productivity: 68, pto: 2 },
      { month: 'Week 4', productivity: 80, pto: 0 },
    ];
  }
};

const getSprintComparisonData = (period: string) => {
  if (period === '7') {
    return [
      { sprint: 'Mon', assigned: 12, completed: 10 },
      { sprint: 'Tue', assigned: 15, completed: 14 },
      { sprint: 'Wed', assigned: 10, completed: 8 },
      { sprint: 'Thu', assigned: 8, completed: 7 },
      { sprint: 'Fri', assigned: 5, completed: 3 },
    ];
  } else if (period === '14') {
    return [
      { sprint: 'Week 1', assigned: 30, completed: 25 },
      { sprint: 'Week 2', assigned: 35, completed: 32 },
    ];
  } else if (period === '90') {
    return [
      { sprint: 'Sprint 1', assigned: 45, completed: 40 },
      { sprint: 'Sprint 2', assigned: 50, completed: 38 },
      { sprint: 'Sprint 3', assigned: 42, completed: 40 },
      { sprint: 'Sprint 4', assigned: 48, completed: 45 },
      { sprint: 'Sprint 5', assigned: 52, completed: 50 },
      { sprint: 'Sprint 6', assigned: 55, completed: 52 },
    ];
  } else {
    // 30 days default
    return [
      { sprint: 'Sprint 1', assigned: 45, completed: 40 },
      { sprint: 'Sprint 2', assigned: 50, completed: 38 },
      { sprint: 'Sprint 3', assigned: 42, completed: 40 },
      { sprint: 'Sprint 4', assigned: 48, completed: 45 },
    ];
  }
};

const teamData = [
  { name: 'Web Team', burnoutIndex: 56, sickDays: 12, tasksCompleted: 187 },
  { name: 'Mobile Team', burnoutIndex: 67, sickDays: 18, tasksCompleted: 145 },
  { name: 'DevOps Team', burnoutIndex: 48, sickDays: 7, tasksCompleted: 156 },
  { name: 'Design Team', burnoutIndex: 51, sickDays: 10, tasksCompleted: 124 },
  { name: 'QA Team', burnoutIndex: 62, sickDays: 15, tasksCompleted: 98 },
];

const reportTypes = [
  {
    id: 1,
    title: 'Performance Summary',
    description: 'Complete task and productivity analysis',
    icon: <FileText className="h-5 w-5 text-purple-600" />,
    category: 'individual'
  },
  {
    id: 2,
    title: 'Burnout Analysis',
    description: 'Detailed burnout risk and contributing factors',
    icon: <FileText className="h-5 w-5 text-purple-600" />,
    category: 'individual'
  },
  {
    id: 3,
    title: 'Time Off Report',
    description: 'PTO usage and sick days analysis',
    icon: <Calendar className="h-5 w-5 text-purple-600" />,
    category: 'individual'
  },
  {
    id: 4,
    title: 'Team Productivity',
    description: 'Team performance and task completion metrics',
    icon: <FileText className="h-5 w-5 text-purple-600" />,
    category: 'team'
  },
  {
    id: 5,
    title: 'Sprint Retrospective',
    description: 'Analysis of completed sprints and team velocity',
    icon: <RefreshCw className="h-5 w-5 text-purple-600" />,
    category: 'team'
  },
  {
    id: 6,
    title: 'Company-wide Burnout Assessment',
    description: 'Risk distribution across departments',
    icon: <FileText className="h-5 w-5 text-purple-600" />,
    category: 'organization'
  },
  {
    id: 7,
    title: 'Productivity Insights',
    description: 'Task completion and sprint statistics',
    icon: <Eye className="h-5 w-5 text-purple-600" />,
    category: 'organization'
  },
  {
    id: 8,
    title: 'Executive Summary',
    description: 'High-level overview for leadership',
    icon: <FileText className="h-5 w-5 text-purple-600" />,
    category: 'organization'
  },
];

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('pdf');
  const [activeReports, setActiveReports] = useState<typeof reportTypes>([]);
  const [activeTab, setActiveTab] = useState('individual');
  const [productivityData, setProductivityData] = useState(getProductivityData('30'));
  const [sprintComparisonData, setSprintComparisonData] = useState(getSprintComparisonData('30'));
  
  useEffect(() => {
    // Update data when date range changes
    setProductivityData(getProductivityData(dateRange));
    setSprintComparisonData(getSprintComparisonData(dateRange));
  }, [dateRange]);
  
  useEffect(() => {
    // Filter reports based on active tab
    setActiveReports(reportTypes.filter(report => report.category === activeTab));
  }, [activeTab]);
  
  const handleExport = () => {
    toast.success(`Report exported as ${reportType.toUpperCase()}`);
  };
  
  const handleViewReport = (reportId: number) => {
    toast.success(`Opening report: ${reportTypes.find(r => r.id === reportId)?.title}`);
  };
  
  const handleDownloadReport = (reportId: number) => {
    toast.success(`Downloading report: ${reportTypes.find(r => r.id === reportId)?.title}`);
  };
  
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
          
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="individual" className="mb-6" onValueChange={setActiveTab}>
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
                  {dateRange === '7' ? 'Last 7 days' : 
                   dateRange === '14' ? 'Last 14 days' : 
                   dateRange === '90' ? 'Last 90 days' : 
                   'Last 30 days'} productivity trends with PTO correlation
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
                        { date: productivityData[0]?.month || 'Jan', score: 35 },
                        { date: productivityData[1]?.month || 'Feb', score: 42 },
                        { date: productivityData[2]?.month || 'Mar', score: 58 },
                        { date: productivityData[3]?.month || 'Apr', score: 52 },
                        { date: productivityData[4]?.month || 'May', score: 65 },
                        { date: productivityData[5]?.month || 'Jun', score: 72 },
                      ].slice(0, productivityData.length)}
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
                {activeReports.map(report => (
                  <Card key={report.id} className="bg-gray-50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {report.icon}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleViewReport(report.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownloadReport(report.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    </CardContent>
                  </Card>
                ))}
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
                        <th className="pb-3 text-left">Trend</th>
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
                            {i % 2 === 0 ? <ArrowUp className="text-red-500" size={16} /> : <ArrowDown className="text-green-500" size={16} />}
                          </td>
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
                <CardDescription>
                  {dateRange === '7' ? 'Last 7 days' : 
                   dateRange === '14' ? 'Last 14 days' : 
                   dateRange === '90' ? 'Last 90 days' : 
                   'Last 30 days'} sprint performance
                </CardDescription>
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
            
            <Card>
              <CardHeader>
                <CardTitle>Available Team Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeReports.map(report => (
                    <Card key={report.id} className="bg-gray-50">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            {report.icon}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewReport(report.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownloadReport(report.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                      </CardContent>
                    </Card>
                  ))}
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
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'High Productivity', value: 35 },
                          { name: 'Medium Productivity', value: 45 },
                          { name: 'Low Productivity', value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#8269FF" />
                        <Cell fill="#D5CCFF" />
                        <Cell fill="#F5F1FF" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
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
                {activeReports.map(report => (
                  <Card key={report.id} className="bg-gray-50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {report.icon}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleViewReport(report.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownloadReport(report.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Reports;
