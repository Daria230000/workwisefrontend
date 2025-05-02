
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

const employeeData = [
  {
    id: '1',
    name: 'Alice Cooper',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    team: 'Web Team',
    manager: 'Jane Smith',
    location: 'New York',
    burnoutRisk: 85,
    trend: 'up',
  },
  {
    id: '2',
    name: 'Bob Smith',
    title: 'UX Designer',
    department: 'Design',
    team: 'Mobile Team',
    manager: 'Jane Smith',
    location: 'San Francisco',
    burnoutRisk: 78,
    trend: 'up',
  },
  {
    id: '3',
    name: 'Carol Davis',
    title: 'Marketing Specialist',
    department: 'Marketing',
    team: 'Growth Team',
    manager: 'David Johnson',
    location: 'Chicago',
    burnoutRisk: 67,
    trend: 'down',
  },
  {
    id: '4',
    name: 'Dave Johnson',
    title: 'Product Manager',
    department: 'Product',
    team: 'Mobile Team',
    manager: 'Michael Brown',
    location: 'Austin',
    burnoutRisk: 64,
    trend: 'up',
  },
  {
    id: '5',
    name: 'Eva Williams',
    title: 'Backend Developer',
    department: 'Engineering',
    team: 'API Team',
    manager: 'Jane Smith',
    location: 'Boston',
    burnoutRisk: 58,
    trend: 'down',
  },
  {
    id: '6',
    name: 'Frank Miller',
    title: 'QA Engineer',
    department: 'Engineering',
    team: 'QA Team',
    manager: 'Alice Cooper',
    location: 'Denver',
    burnoutRisk: 45,
    trend: 'down',
  },
  {
    id: '7',
    name: 'Grace Lee',
    title: 'DevOps Engineer',
    department: 'Engineering',
    team: 'Infra Team',
    manager: 'Alice Cooper',
    location: 'Seattle',
    burnoutRisk: 42,
    trend: 'stable',
  },
  {
    id: '8',
    name: 'Hank Wilson',
    title: 'Sales Manager',
    department: 'Sales',
    team: 'Enterprise Team',
    manager: 'Irene Garcia',
    location: 'Miami',
    burnoutRisk: 37,
    trend: 'up',
  },
];

const teamData = [
  { name: 'Web Team', members: 8, avgBurnoutRisk: 63, department: 'Engineering' },
  { name: 'Mobile Team', members: 6, avgBurnoutRisk: 72, department: 'Engineering' },
  { name: 'API Team', members: 5, avgBurnoutRisk: 58, department: 'Engineering' },
  { name: 'QA Team', members: 4, avgBurnoutRisk: 45, department: 'Engineering' },
  { name: 'Growth Team', members: 7, avgBurnoutRisk: 52, department: 'Marketing' },
  { name: 'Enterprise Team', members: 5, avgBurnoutRisk: 48, department: 'Sales' },
  { name: 'Infra Team', members: 4, avgBurnoutRisk: 61, department: 'Engineering' },
];

const Employees: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  
  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesTeam = teamFilter === 'all' || employee.team === teamFilter;
    
    let matchesRisk = true;
    if (riskFilter === 'high') matchesRisk = employee.burnoutRisk >= 70;
    else if (riskFilter === 'medium') matchesRisk = employee.burnoutRisk >= 50 && employee.burnoutRisk < 70;
    else if (riskFilter === 'low') matchesRisk = employee.burnoutRisk < 50;
    
    return matchesSearch && matchesDepartment && matchesTeam && matchesRisk;
  });
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Add Employee</Button>
      </div>
      
      <Tabs defaultValue="employees" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search by name or position..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={teamFilter} onValueChange={setTeamFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="Web Team">Web Team</SelectItem>
                      <SelectItem value="Mobile Team">Mobile Team</SelectItem>
                      <SelectItem value="API Team">API Team</SelectItem>
                      <SelectItem value="QA Team">QA Team</SelectItem>
                      <SelectItem value="Growth Team">Growth Team</SelectItem>
                      <SelectItem value="Enterprise Team">Enterprise Team</SelectItem>
                      <SelectItem value="Infra Team">Infra Team</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="high">High Risk (70%+)</SelectItem>
                      <SelectItem value="medium">Medium Risk (50-69%)</SelectItem>
                      <SelectItem value="low">Low Risk (0-49%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Name</th>
                  <th className="py-3 text-left">Department</th>
                  <th className="py-3 text-left">Team</th>
                  <th className="py-3 text-left">Manager</th>
                  <th className="py-3 text-left">Location</th>
                  <th className="py-3 text-left">Burnout Risk</th>
                  <th className="py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-purple-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-sm font-semibold text-purple-700 mr-3">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{employee.department}</td>
                    <td className="py-4">{employee.team}</td>
                    <td className="py-4">{employee.manager}</td>
                    <td className="py-4">{employee.location}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className={`font-medium mr-2 ${
                          employee.burnoutRisk >= 70 ? 'text-red-500' :
                          employee.burnoutRisk >= 50 ? 'text-orange-500' :
                          'text-green-500'
                        }`}>
                          {employee.burnoutRisk}%
                        </div>
                        {employee.trend === 'up' && <ArrowUp size={16} className="text-red-500" />}
                        {employee.trend === 'down' && <ArrowDown size={16} className="text-green-500" />}
                      </div>
                    </td>
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
            
            {filteredEmployees.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">No employees found matching your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="teams">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Search teams..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamData.map((team, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>{team.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Members</span>
                      <span className="font-medium">{team.members}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Avg. Burnout Risk</span>
                      <span className={`font-medium ${
                        team.avgBurnoutRisk >= 70 ? 'text-red-500' :
                        team.avgBurnoutRisk >= 50 ? 'text-orange-500' :
                        'text-green-500'
                      }`}>{team.avgBurnoutRisk}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Tasks Completed</span>
                      <span className="font-medium">147</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Sick Days</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">View Team</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Employees;
