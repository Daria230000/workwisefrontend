
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, UserCheck, User, Calendar, Check, X, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const alertsData = [
  {
    id: 1,
    type: 'burnout',
    employee: 'Alice Cooper',
    department: 'Engineering',
    severity: 'high',
    description: 'Burnout risk increased by 28% in the last 30 days due to weekend work pattern',
    dateDetected: '2023-05-28',
  },
  {
    id: 2,
    type: 'performance',
    employee: 'Bob Smith',
    department: 'Design',
    severity: 'medium',
    description: 'Task completion rate dropped by 18% over the past 2 weeks',
    dateDetected: '2023-05-27',
  },
  {
    id: 3,
    type: 'disengagement',
    employee: 'Carol Davis',
    department: 'Marketing',
    severity: 'medium',
    description: 'Activity across tools has decreased significantly in the last 7 days',
    dateDetected: '2023-05-26',
  },
  {
    id: 4,
    type: 'absenteeism',
    employee: 'David Johnson',
    department: 'Engineering',
    severity: 'high',
    description: 'Sudden increase in sick days (3 days in the last week) after perfect attendance',
    dateDetected: '2023-05-25',
  },
  {
    id: 5,
    type: 'burnout',
    employee: 'Eva Williams',
    department: 'Product',
    severity: 'critical',
    description: 'Working hours exceeded 55 hours for 3 consecutive weeks with weekend activity',
    dateDetected: '2023-05-24',
  },
];

const recommendationsData = [
  {
    id: 1,
    title: 'Reduce sprint workload',
    description: 'Consider reducing sprint workload for employees with high burnout risk',
    impact: 'Medium',
    category: 'Workload',
  },
  {
    id: 2,
    title: 'Encourage PTO usage',
    description: 'Send reminders to employees with unused PTO balance above 15 days',
    impact: 'High',
    category: 'Well-being',
  },
  {
    id: 3,
    title: 'Review meeting schedule',
    description: 'Consider implementing no-meeting Fridays to provide focused work time',
    impact: 'Medium',
    category: 'Productivity',
  },
];

const Alerts: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Alerts & Recommendations</h1>
        <div className="flex space-x-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="burnout">Burnout Risk</SelectItem>
              <SelectItem value="performance">Performance Dips</SelectItem>
              <SelectItem value="disengagement">Disengagement</SelectItem>
              <SelectItem value="absenteeism">Absenteeism</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (Newest First)</SelectItem>
              <SelectItem value="severity">Severity (Highest First)</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="employee">Employee Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="alerts" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <div className="grid grid-cols-1 gap-4 mb-6">
            {alertsData.map(alert => (
              <Card key={alert.id} className="overflow-hidden">
                <div className={`h-1.5 ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'high' ? 'bg-orange-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        alert.type === 'burnout' ? 'bg-red-100' :
                        alert.type === 'performance' ? 'bg-orange-100' :
                        alert.type === 'disengagement' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {alert.type === 'burnout' && <AlertTriangle className={`h-5 w-5 text-red-600`} />}
                        {alert.type === 'performance' && <Clock className={`h-5 w-5 text-orange-600`} />}
                        {alert.type === 'disengagement' && <UserCheck className={`h-5 w-5 text-yellow-600`} />}
                        {alert.type === 'absenteeism' && <Calendar className={`h-5 w-5 text-blue-600`} />}
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-1">{alert.employee}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Badge variant="outline" className="mr-2">{alert.department}</Badge>
                          <span>Detected on {alert.dateDetected}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{alert.description}</p>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Avg. Hours Worked</div>
                      <div className="font-medium">56.2 hrs/week</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Current Sprint Tasks</div>
                      <div className="font-medium">12 tasks (3 overdue)</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">PTO Balance</div>
                      <div className="font-medium">18 days available</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-between border-t">
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <User className="mr-2 h-4 w-4" />
                      Assign to HR
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-200">
                      <Clock className="mr-2 h-4 w-4" />
                      Snooze
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200">
                      <X className="mr-2 h-4 w-4" />
                      Dismiss
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {recommendationsData.map(recommendation => (
              <Card key={recommendation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{recommendation.title}</CardTitle>
                    <Badge className={
                      recommendation.impact === 'High' ? 'bg-purple-100 text-purple-800' :
                      recommendation.impact === 'Medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {recommendation.impact} Impact
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-500">
                    {recommendation.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{recommendation.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Implement Recommendation
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Intervention Checklist</CardTitle>
              <CardDescription>Track implementation of recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Implemented No-Meeting Fridays</p>
                    <p className="text-sm text-gray-500">Completed on May 19, 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Adjusted sprint velocity calculations</p>
                    <p className="text-sm text-gray-500">Completed on May 24, 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Send PTO reminders to at-risk employees</p>
                    <p className="text-sm text-gray-500">Pending implementation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Review workload distribution across teams</p>
                    <p className="text-sm text-gray-500">Scheduled for June 5, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Alerts;
