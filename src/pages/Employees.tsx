import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserPlus, Filter, ChevronDown } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  riskScore: number;
  status: 'normal' | 'warning' | 'risk';
  avatar: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Jane Smith',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'jane.smith@workwise.com',
    riskScore: 78,
    status: 'risk',
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'Product Manager',
    department: 'Product',
    email: 'john.doe@workwise.com',
    riskScore: 45,
    status: 'warning',
    avatar: 'JD',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    position: 'UX Designer',
    department: 'Design',
    email: 'alice@workwise.com',
    riskScore: 15,
    status: 'normal',
    avatar: 'AJ',
  },
  {
    id: 4,
    name: 'Robert Chen',
    position: 'Frontend Developer',
    department: 'Engineering',
    email: 'robert@workwise.com',
    riskScore: 25,
    status: 'normal',
    avatar: 'RC',
  },
  {
    id: 5,
    name: 'Sarah Williams',
    position: 'QA Engineer',
    department: 'Engineering',
    email: 'sarah@workwise.com',
    riskScore: 62,
    status: 'warning',
    avatar: 'SW',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'risk':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRiskColor = (score: number) => {
  if (score < 30) return 'bg-green-500';
  if (score < 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('all');
  
  const filteredEmployees = mockEmployees.filter(employee => {
    if (view === 'risk' && employee.status !== 'risk') return false;
    if (view === 'warning' && employee.status !== 'warning') return false;
    if (view === 'normal' && employee.status !== 'normal') return false;
    
    return employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          
          <Button className="workwise-btn-primary bg-purple-600">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search employees..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-3 w-3" />
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              Department
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setView}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="risk">At Risk</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="normal">Normal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>All Employees ({filteredEmployees.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                    {employee.avatar}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                  <div className="text-sm text-gray-500">{employee.position}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {employee.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className={`${getRiskColor(employee.riskScore)} h-2.5 rounded-full`} style={{ width: `${employee.riskScore}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{employee.riskScore}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                                {employee.status === 'risk' ? 'At Risk' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>At Risk Employees ({filteredEmployees.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                    {employee.avatar}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                  <div className="text-sm text-gray-500">{employee.position}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {employee.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className={`${getRiskColor(employee.riskScore)} h-2.5 rounded-full`} style={{ width: `${employee.riskScore}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{employee.riskScore}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                                {employee.status === 'risk' ? 'At Risk' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="warning" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Warning Employees ({filteredEmployees.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                    {employee.avatar}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                  <div className="text-sm text-gray-500">{employee.position}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {employee.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className={`${getRiskColor(employee.riskScore)} h-2.5 rounded-full`} style={{ width: `${employee.riskScore}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{employee.riskScore}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                                {employee.status === 'risk' ? 'At Risk' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="normal" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Normal Employees ({filteredEmployees.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                    {employee.avatar}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                  <div className="text-sm text-gray-500">{employee.position}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {employee.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div className={`${getRiskColor(employee.riskScore)} h-2.5 rounded-full`} style={{ width: `${employee.riskScore}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{employee.riskScore}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                                {employee.status === 'risk' ? 'At Risk' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
