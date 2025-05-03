
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Calendar, Filter, ArrowDown, ArrowUp, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [toolFilter, setToolFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sprintTab, setSprintTab] = useState('current');
  
  // Chart data state
  const [performanceData, setPerformanceData] = useState([
    { name: 'Week 1', value: 75 },
    { name: 'Week 2', value: 69 },
    { name: 'Week 3', value: 78 },
    { name: 'Week 4', value: 82 },
  ]);
  
  const [sprintData, setSprintData] = useState([
    { name: 'Sprint 1', assigned: 45, completed: 40 },
    { name: 'Sprint 2', assigned: 50, completed: 38 },
    { name: 'Sprint 3', assigned: 42, completed: 40 },
    { name: 'Sprint 4', assigned: 48, completed: 45 },
  ]);
  
  const [burnoutRiskData, setburnoutRiskData] = useState({
    value: 45,
    trend: '+12.3%',
    trendDirection: 'up' as 'up' | 'down',
  });
  
  const [alertsData, setAlertsData] = useState({
    total: 24,
    burnoutRisk: 12,
    performanceDips: 7,
    absenteeism: 5
  });
  
  const [productivityData, setProductivityData] = useState({
    sprintSuccess: 87.2,
    avgHours: 7.8,
    tasksCompleted: 342,
    taskLoad: 'Medium'
  });

  // Active employees at risk
  const [riskEmployeeData, setRiskEmployeeData] = useState([
    { id: 1, name: 'Alice Cooper', department: 'Engineering', risk: 85, trend: 'up', reason: 'Weekend hours increased by 40%' },
    { id: 2, name: 'Bob Smith', department: 'Design', risk: 78, trend: 'up', reason: 'Consecutive late night work' },
    { id: 3, name: 'Carol Davis', department: 'Marketing', risk: 67, trend: 'down', reason: 'Multiple deadlines this week' },
    { id: 4, name: 'Dave Johnson', department: 'Product', risk: 64, trend: 'up', reason: 'Task overload in sprint' },
    { id: 5, name: 'Eva Williams', department: 'Engineering', risk: 58, trend: 'down', reason: 'Frequent context switching' },
  ]);
  
  // Update data based on filters
  useEffect(() => {
    // For demo purposes, let's simulate different data for different time ranges
    if (timeRange === '7') {
      setPerformanceData([
        { name: 'Day 1', value: 70 },
        { name: 'Day 2', value: 65 },
        { name: 'Day 3', value: 75 },
        { name: 'Day 4', value: 68 },
        { name: 'Day 5', value: 72 },
        { name: 'Day 6', value: 80 },
        { name: 'Day 7', value: 78 },
      ]);
      setburnoutRiskData({
        value: 38,
        trend: '+5.2%',
        trendDirection: 'up',
      });
    } else if (timeRange === '14') {
      setPerformanceData([
        { name: 'Week 1', value: 72 },
        { name: 'Week 2', value: 76 },
      ]);
      setburnoutRiskData({
        value: 42,
        trend: '+8.7%',
        trendDirection: 'up',
      });
    } else if (timeRange === '30') {
      setPerformanceData([
        { name: 'Week 1', value: 75 },
        { name: 'Week 2', value: 69 },
        { name: 'Week 3', value: 78 },
        { name: 'Week 4', value: 82 },
      ]);
      setburnoutRiskData({
        value: 45,
        trend: '+12.3%',
        trendDirection: 'up',
      });
    } else if (timeRange === '90') {
      setPerformanceData([
        { name: 'Month 1', value: 73 },
        { name: 'Month 2', value: 68 },
        { name: 'Month 3', value: 80 },
      ]);
      setburnoutRiskData({
        value: 65,
        trend: '+15.8%',
        trendDirection: 'up',
      });
    }
    
    // Update filters based on department
    if (departmentFilter !== 'all') {
      const filteredEmployees = riskEmployeeData.filter(
        employee => employee.department.toLowerCase() === departmentFilter
      );
      setRiskEmployeeData(filteredEmployees);
    }
    
  }, [timeRange, departmentFilter]);
  
  // Update sprint data based on tab
  useEffect(() => {
    if (sprintTab === 'current') {
      setSprintData([
        { name: 'Team A', assigned: 18, completed: 16 },
        { name: 'Team B', assigned: 14, completed: 13 },
        { name: 'Team C', assigned: 10, completed: 9 },
      ]);
    } else {
      setSprintData([
        { name: 'Team A', assigned: 20, completed: 18 },
        { name: 'Team B', assigned: 15, completed: 12 },
        { name: 'Team C', assigned: 12, completed: 10 },
      ]);
    }
  }, [sprintTab]);

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
              <SelectItem value="90">Last 90 Days</SelectItem>
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
              <SelectItem value="github">GitHub Only</SelectItem>
              <SelectItem value="slack">Slack Only</SelectItem>
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
            <div className="text-3xl font-bold text-purple-600 mb-1">{burnoutRiskData.value}%</div>
            <p className="text-sm text-gray-500 mb-4">Organization average</p>
            <div className="h-2 bg-gray-100 rounded-full mb-4">
              <div 
                className={`h-2 rounded-full ${burnoutRiskData.value > 70 ? 'bg-red-500' : burnoutRiskData.value > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                style={{ width: `${burnoutRiskData.value}%` }}
              ></div>
            </div>
            <div className="text-sm">
              <span className={`${burnoutRiskData.trendDirection === 'up' ? 'text-red-500' : 'text-green-500'} font-medium`}>
                {burnoutRiskData.trend}
              </span> since last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-1">{alertsData.total}</div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span>Burnout Risk Alerts</span>
                <span className="font-medium text-red-500">{alertsData.burnoutRisk}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Performance Dips</span>
                <span className="font-medium text-orange-500">{alertsData.performanceDips}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Absenteeism Alerts</span>
                <span className="font-medium text-yellow-500">{alertsData.absenteeism}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Performance Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8269FF" 
                    fill="#8269FF20" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Sprint Stress Index</CardTitle>
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
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employees at Highest Risk</CardTitle>
          <Link to="/ai-insights">
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
              View All
            </Button>
          </Link>
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
                      <Link to={`/employee/${employee.id}`}>
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                          View Profile
                        </Button>
                      </Link>
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
