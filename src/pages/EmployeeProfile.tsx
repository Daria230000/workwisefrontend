
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
import { Calendar, User, AlertTriangle, CheckCheck, Calendar as CalendarIcon, Check } from 'lucide-react';

// Mock data
const employeeData = {
  id: '1',
  name: 'Alice Cooper',
  title: 'Senior Frontend Developer',
  department: 'Engineering',
  avatar: '/placeholder.svg',
  email: 'alice.cooper@workwise.com',
  phone: '(555) 123-4567',
  projects: ['Website Redesign', 'Mobile App', 'Dashboard Development'],
  metrics: {
    avgHoursWorked: 7.8,
    sickDaysLast30: 2,
    currentLoad: 'High',
    burnoutRisk: 85,
    completedTasks: 42,
    overdueAssignments: 3,
    sprintContribution: 32,
    ptoBalance: 14,
  },
  skills: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 88 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'API Integration', level: 90 },
    { name: 'Testing', level: 80 },
  ],
  burnoutFactors: [
    { factor: 'Weekend work', impact: '+28%', trend: 'increasing' },
    { factor: 'Late night activity', impact: '+22%', trend: 'stable' },
    { factor: 'Task switching', impact: '+18%', trend: 'increasing' },
    { factor: 'Meeting load', impact: '+12%', trend: 'decreasing' },
  ],
};

const performanceData = [
  { date: '2023-01', tasks: 35, velocity: 0.8 },
  { date: '2023-02', tasks: 28, velocity: 0.7 },
  { date: '2023-03', tasks: 42, velocity: 0.85 },
  { date: '2023-04', tasks: 38, velocity: 0.75 },
  { date: '2023-05', tasks: 45, velocity: 0.9 },
  { date: '2023-06', tasks: 40, velocity: 0.8 },
];

const absenceData = [
  { month: 'Jan', sick: 2, pto: 0 },
  { month: 'Feb', sick: 1, pto: 3 },
  { month: 'Mar', sick: 0, pto: 0 },
  { month: 'Apr', sick: 3, pto: 0 },
  { month: 'May', sick: 1, pto: 5 },
  { month: 'Jun', sick: 0, pto: 0 },
];

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{id: string}>();
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-xl font-semibold text-purple-700">
            {employeeData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{employeeData.name}</h1>
            <p className="text-gray-600">{employeeData.title} • {employeeData.department}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">Message</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Schedule Meeting</Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mb-10">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="burnout">Burnout Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="wellbeing">Well-being</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="manager">Manager Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500 mb-1">Email</h3>
                    <p>{employeeData.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 mb-1">Phone</h3>
                    <p>{employeeData.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 mb-1">Department</h3>
                    <p>{employeeData.department}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 mb-1">Position</h3>
                    <p>{employeeData.title}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-500 mb-2">Current Projects</h3>
                  <div className="flex flex-wrap gap-2">
                    {employeeData.projects.map((project, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Avg. Hours Worked</span>
                      <span className="font-medium">{employeeData.metrics.avgHoursWorked} hrs/day</span>
                    </div>
                    <Progress value={employeeData.metrics.avgHoursWorked * 10} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Sick Days (30 days)</span>
                      <span className="font-medium">{employeeData.metrics.sickDaysLast30} days</span>
                    </div>
                    <Progress value={employeeData.metrics.sickDaysLast30 * 10} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Current Load</span>
                      <span className="font-medium text-red-500">{employeeData.metrics.currentLoad}</span>
                    </div>
                    <Progress value={90} className="h-2 bg-red-100">
                      <div className="h-full bg-red-500 rounded-full" />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Burnout Risk</span>
                      <span className="font-medium text-red-500">{employeeData.metrics.burnoutRisk}%</span>
                    </div>
                    <Progress value={employeeData.metrics.burnoutRisk} className="h-2 bg-red-100">
                      <div className="h-full bg-red-500 rounded-full" />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="burnout">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Burnout Risk Analysis</CardTitle>
                <CardDescription>Based on activity patterns and historical data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="w-32 h-32 relative">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E9ECEF"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FF6B6B"
                        strokeWidth="3"
                        strokeDasharray={`${employeeData.metrics.burnoutRisk}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-red-500">{employeeData.metrics.burnoutRisk}</span>
                      <span className="text-xs">Risk Score</span>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <div className="text-lg font-medium mb-2 flex items-center">
                      <AlertTriangle className="text-red-500 mr-2 h-5 w-5" />
                      High Risk of Burnout
                    </div>
                    <p className="text-gray-600">
                      Employee has shown multiple high-risk patterns over the past 30 days, 
                      including increased weekend work and consistently late working hours.
                    </p>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">Contributing Factors</h3>
                <div className="space-y-3">
                  {employeeData.burnoutFactors.map((factor, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>{factor.factor}</span>
                      <div className="flex items-center">
                        <span className={`font-medium ${
                          factor.trend === 'increasing' 
                            ? 'text-red-500' 
                            : factor.trend === 'decreasing' 
                              ? 'text-green-500' 
                              : 'text-gray-700'
                        }`}>{factor.impact}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          factor.trend === 'increasing' 
                            ? 'bg-red-100 text-red-800' 
                            : factor.trend === 'decreasing' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {factor.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-red-500 text-sm font-medium mb-4">IMMEDIATE ATTENTION NEEDED</div>
                <p className="mb-4">Based on the current burnout risk, consider the following actions:</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="ml-3 text-sm">Schedule a one-on-one conversation to discuss workload and concerns</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="ml-3 text-sm">Consider reassigning some tasks or extending deadlines</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="ml-3 text-sm">Encourage taking a day off or using PTO</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Create Intervention Plan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="tasks" name="Tasks Completed" stroke="#8269FF" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="velocity" name="Velocity" stroke="#F5A623" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{employeeData.metrics.completedTasks}</div>
                  <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
                  <div className="text-sm mt-4 text-green-500 flex items-center">
                    <ArrowUp size={16} className="mr-1" />
                    8% higher than previous period
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Overdue Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">{employeeData.metrics.overdueAssignments}</div>
                  <div className="text-sm text-gray-500 mt-1">Current open tasks</div>
                  <div className="text-sm mt-4 text-red-500 flex items-center">
                    <ArrowUp size={16} className="mr-1" />
                    2 more than previous period
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sprint Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{employeeData.metrics.sprintContribution}%</div>
                  <div className="text-sm text-gray-500 mt-1">Of team velocity</div>
                  <div className="text-sm mt-4 text-green-500 flex items-center">
                    <ArrowUp size={16} className="mr-1" />
                    5% higher than team average
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wellbeing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Absence Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={absenceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sick" name="Sick Days" fill="#FF6B6B" />
                      <Bar dataKey="pto" name="PTO" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PTO Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 relative">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E9ECEF"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#82ca9d"
                        strokeWidth="3"
                        strokeDasharray={`${(employeeData.metrics.ptoBalance / 25) * 100}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-xl font-bold text-green-600">{employeeData.metrics.ptoBalance}</span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <p className="font-medium">Days Available</p>
                    <p className="text-sm text-gray-500">Out of 25 annual days</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Days Used</span>
                    <span>{25 - employeeData.metrics.ptoBalance}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Days Accrued</span>
                    <span>19</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expires On</span>
                    <span>Dec 31, 2023</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">Request Time Off</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Competencies</CardTitle>
              <CardDescription>Based on project contributions and task involvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employeeData.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Recently Used Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">React</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">TypeScript</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Tailwind CSS</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Redux</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Jest</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">GraphQL</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manager">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Manager Actions</CardTitle>
                <CardDescription>Tools to support employee well-being and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="h-auto py-4 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700">
                    <User className="h-6 w-6 mb-2" />
                    <span>Create Coaching Plan</span>
                  </Button>
                  
                  <Button className="h-auto py-4 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Assign Peer Support</span>
                  </Button>
                  
                  <Button className="h-auto py-4 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700">
                    <CalendarIcon className="h-6 w-6 mb-2" />
                    <span>Schedule 1:1 Meeting</span>
                  </Button>
                  
                  <Button className="h-auto py-4 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700">
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    <span>Request HR Review</span>
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Schedule an Intervention</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Checkbox id="workload" className="mt-1" />
                      <div className="ml-3">
                        <label htmlFor="workload" className="font-medium">Reduce Workload</label>
                        <p className="text-sm text-gray-500">Reassign tasks or extend deadlines</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Checkbox id="pto" className="mt-1" />
                      <div className="ml-3">
                        <label htmlFor="pto" className="font-medium">Suggest PTO</label>
                        <p className="text-sm text-gray-500">Recommend taking time off</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Checkbox id="training" className="mt-1" />
                      <div className="ml-3">
                        <label htmlFor="training" className="font-medium">Suggest Training</label>
                        <p className="text-sm text-gray-500">Offer skill development opportunities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">Create Intervention Plan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-700">Quarterly Performance</div>
                    <div className="font-medium">June 15, 2023</div>
                    <div className="text-sm text-gray-500">In 14 days</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-700">Skills Assessment</div>
                    <div className="font-medium">July 10, 2023</div>
                    <div className="text-sm text-gray-500">In 39 days</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">Schedule New Review</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
