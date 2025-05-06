import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Eye, Users, Calendar, BarChart2, FileText } from 'lucide-react';
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';
import ViewReportDialog from '../components/ViewReportDialog';

const COLORS = ['#8269FF', '#9b87f5', '#6E59A5', '#7E69AB', '#118AB2'];

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [reportType, setReportType] = useState('all');
  const [viewReportOpen, setViewReportOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<any>(null);
  
  const distributionData = [
    { name: 'Engineering', value: 42 },
    { name: 'Marketing', value: 28 },
    { name: 'Design', value: 18 },
    { name: 'Product', value: 12 }
  ];
  
  const factorsData = [
    { name: 'Overtime', value: 35 },
    { name: 'Weekend Work', value: 25 },
    { name: 'Task Overload', value: 20 },
    { name: 'Context Switching', value: 15 },
    { name: 'Sick Days', value: 5 }
  ];
  
  const trendData = [
    { month: 'Jan', engineering: 32, marketing: 28, design: 20, product: 15 },
    { month: 'Feb', engineering: 35, marketing: 25, design: 22, product: 18 },
    { month: 'Mar', engineering: 38, marketing: 30, design: 24, product: 16 },
    { month: 'Apr', engineering: 40, marketing: 32, design: 23, product: 19 },
    { month: 'May', engineering: 42, marketing: 28, design: 18, product: 12 }
  ];
  
  const availableReports = [
    { id: '1', title: 'Q1 Burnout Risk Analysis', date: 'Mar 31, 2025', type: 'burnout', icon: Users },
    { id: '2', title: 'Team Productivity Report', date: 'Apr 15, 2025', type: 'productivity', icon: BarChart2 },
    { id: '3', title: 'Monthly Wellness Survey Results', date: 'Apr 30, 2025', type: 'wellness', icon: FileText },
    { id: '4', title: 'Sprint Retrospective Analysis', date: 'May 1, 2025', type: 'sprint', icon: Calendar }
  ];
  
  const handleGenerateReport = () => {
    const newReport = {
      id: '5',
      title: 'Generated Burnout Risk Analysis',
      date: 'May 6, 2025',
      type: 'burnout'
    };
    setCurrentReport(newReport);
    setViewReportOpen(true);
  };

  const openReport = (report: any) => {
    setCurrentReport(report);
    setViewReportOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Reports Dashboard</h1>
            <p className="text-gray-600 mt-1">Analyze team health and performance metrics</p>
          </div>
          <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px] bg-white shadow-sm">
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
              <SelectTrigger className="w-[180px] bg-white shadow-sm">
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-purple-400">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="bg-purple-100 p-1.5 rounded-md text-purple-600">
                <BarChart2 className="h-5 w-5" />
              </span>
              Burnout Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={factorsData}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#555', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 40]} />
                  <Radar name="Risk Score" dataKey="value" stroke="#8269FF" fill="#8269FF" fillOpacity={0.5} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-indigo-400">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="bg-indigo-100 p-1.5 rounded-md text-indigo-600">
                <Users className="h-5 w-5" />
              </span>
              Team Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={distributionData}
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-blue-400">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="bg-blue-100 p-1.5 rounded-md text-blue-600">
                <FileText className="h-5 w-5" />
              </span>
              Report Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Report Type</h3>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="burnout">Burnout Risk</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="wellness">Wellness Survey</SelectItem>
                    <SelectItem value="sprint">Sprint Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleGenerateReport}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md"
                >
                  Generate Report
                </Button>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-purple-400">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="bg-purple-100 p-1.5 rounded-md text-purple-600">
                <BarChart2 className="h-5 w-5" />
              </span>
              Department Burnout Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="engineering" stroke="#8269FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="marketing" stroke="#7E69AB" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="design" stroke="#6E59A5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="product" stroke="#118AB2" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-indigo-400">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="bg-indigo-100 p-1.5 rounded-md text-indigo-600">
              <FileText className="h-5 w-5" />
            </span>
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-4 pt-2 text-left font-medium text-gray-500">Report Title</th>
                  <th className="pb-4 pt-2 text-left font-medium text-gray-500">Date</th>
                  <th className="pb-4 pt-2 text-left font-medium text-gray-500">Type</th>
                  <th className="pb-4 pt-2 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {availableReports
                  .filter(report => reportType === 'all' || report.type === reportType)
                  .map((report) => (
                    <tr key={report.id} className="hover:bg-purple-50 transition-colors">
                      <td className="py-5 flex items-center">
                        <div className="bg-purple-100 p-2 rounded-md text-purple-600 mr-3">
                          <report.icon size={16} />
                        </div>
                        <span className="font-medium">{report.title}</span>
                      </td>
                      <td className="py-5 text-gray-600">{report.date}</td>
                      <td className="py-5 capitalize">
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${report.type === 'burnout' ? 'bg-red-100 text-red-700' : ''}
                          ${report.type === 'productivity' ? 'bg-blue-100 text-blue-700' : ''}
                          ${report.type === 'wellness' ? 'bg-green-100 text-green-700' : ''}
                          ${report.type === 'sprint' ? 'bg-purple-100 text-purple-700' : ''}
                        `}>
                          {report.type}
                        </span>
                      </td>
                      <td className="py-5">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 text-purple-600 hover:bg-purple-50"
                            onClick={() => openReport(report)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 text-purple-600 hover:bg-purple-50"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ViewReportDialog 
        open={viewReportOpen}
        onOpenChange={setViewReportOpen}
        report={currentReport}
      />
    </DashboardLayout>
  );
};

export default Reports;
