
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import AddEmployeeDialog from '../components/AddEmployeeDialog';
import ViewTeamDialog from '../components/ViewTeamDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, UserPlus, Users, ArrowUpDown, Eye } from 'lucide-react';

interface Employee {
  id: string;  // Ensure this is string type
  name: string;
  department: string;
  role: string;
  status: 'active' | 'vacation' | 'sick';
  riskScore: number;
}

interface Team {
  id: number;
  name: string;
  department: string;
  memberCount: number;
  manager: string;
  riskScore: number;
}

const Employees: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'employees' | 'teams'>('employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  
  // Modal states
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [viewTeamOpen, setViewTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  
  // Employee and team data
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  
  // Mock data
  useEffect(() => {
    const mockEmployees: Employee[] = [
      { id: "1", name: 'John Smith', department: 'Engineering', role: 'Senior Developer', status: 'active', riskScore: 25 },
      { id: "2", name: 'Sarah Johnson', department: 'Design', role: 'UI/UX Designer', status: 'active', riskScore: 15 },
      { id: "3", name: 'Michael Brown', department: 'Marketing', role: 'Marketing Specialist', status: 'vacation', riskScore: 5 },
      { id: "4", name: 'Emily Davis', department: 'Engineering', role: 'Frontend Developer', status: 'active', riskScore: 78 },
      { id: "5", name: 'David Wilson', department: 'Product', role: 'Product Manager', status: 'active', riskScore: 45 },
      { id: "6", name: 'Jessica Taylor', department: 'Design', role: 'Graphic Designer', status: 'sick', riskScore: 30 },
      { id: "7", name: 'Robert Miller', department: 'Engineering', role: 'DevOps Engineer', status: 'active', riskScore: 62 },
      { id: "8", name: 'Amanda Thomas', department: 'HR', role: 'HR Manager', status: 'active', riskScore: 22 },
      { id: "9", name: 'Daniel Anderson', department: 'Marketing', role: 'Content Writer', status: 'vacation', riskScore: 18 },
      { id: "10", name: 'Lisa Martinez', department: 'Engineering', role: 'QA Engineer', status: 'active', riskScore: 55 },
    ];
    
    const mockTeams: Team[] = [
      { id: 1, name: 'Frontend', department: 'Engineering', memberCount: 8, manager: 'John Smith', riskScore: 65 },
      { id: 2, name: 'Backend', department: 'Engineering', memberCount: 12, manager: 'Robert Miller', riskScore: 48 },
      { id: 3, name: 'Design', department: 'Design', memberCount: 6, manager: 'Sarah Johnson', riskScore: 25 },
      { id: 4, name: 'Marketing', department: 'Marketing', memberCount: 5, manager: 'Michael Brown', riskScore: 18 },
      { id: 5, name: 'Product', department: 'Product', memberCount: 4, manager: 'David Wilson', riskScore: 42 },
      { id: 6, name: 'QA', department: 'Engineering', memberCount: 7, manager: 'Lisa Martinez', riskScore: 37 },
    ];
    
    setEmployees(mockEmployees);
    setTeams(mockTeams);
    setFilteredEmployees(mockEmployees);
    setFilteredTeams(mockTeams);
  }, []);
  
  // Add a handler for adding an employee
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees(prevEmployees => [newEmployee, ...prevEmployees]);
    setFilteredEmployees(prevFiltered => [newEmployee, ...prevFiltered]);
  };
  
  // Apply filters to employees
  useEffect(() => {
    let result = [...employees];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(employee => 
        employee.name.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    }
    
    // Department filter
    if (departmentFilter !== 'all') {
      result = result.filter(employee => 
        employee.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }
    
    // Risk filter
    if (riskFilter !== 'all') {
      switch (riskFilter) {
        case 'low':
          result = result.filter(employee => employee.riskScore < 30);
          break;
        case 'medium':
          result = result.filter(employee => employee.riskScore >= 30 && employee.riskScore < 70);
          break;
        case 'high':
          result = result.filter(employee => employee.riskScore >= 70);
          break;
      }
    }
    
    setFilteredEmployees(result);
  }, [searchQuery, departmentFilter, riskFilter, employees]);
  
  // Apply filters to teams
  useEffect(() => {
    let result = [...teams];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(team => 
        team.name.toLowerCase().includes(query) ||
        team.department.toLowerCase().includes(query) ||
        team.manager.toLowerCase().includes(query)
      );
    }
    
    // Department filter
    if (departmentFilter !== 'all') {
      result = result.filter(team => 
        team.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }
    
    // Risk filter
    if (riskFilter !== 'all') {
      switch (riskFilter) {
        case 'low':
          result = result.filter(team => team.riskScore < 30);
          break;
        case 'medium':
          result = result.filter(team => team.riskScore >= 30 && team.riskScore < 70);
          break;
        case 'high':
          result = result.filter(team => team.riskScore >= 70);
          break;
      }
    }
    
    setFilteredTeams(result);
  }, [searchQuery, departmentFilter, riskFilter, teams]);
  
  const viewTeam = (teamName: string) => {
    setSelectedTeam(teamName);
    setViewTeamOpen(true);
  };
  
  // Updated to explicitly handle string ID
  const viewEmployee = (id: string) => {
    console.log("Navigating to employee profile with ID:", id);
    navigate(`/employee/${id}`);
  };
  
  const getRiskBadge = (score: number) => {
    if (score >= 70) {
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">High Risk</Badge>;
    } else if (score >= 30) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'vacation':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Vacation</Badge>;
      case 'sick':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Sick</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-sm text-gray-500">Manage your employees and teams</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            className="bg-purple-500 hover:bg-purple-600"
            onClick={() => setAddEmployeeOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex gap-2">
              <Button 
                variant={view === 'employees' ? 'default' : 'outline'}
                className={view === 'employees' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                onClick={() => setView('employees')}
              >
                <Users className="mr-2 h-4 w-4" />
                Employees
              </Button>
              <Button 
                variant={view === 'teams' ? 'default' : 'outline'}
                className={view === 'teams' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                onClick={() => setView('teams')}
              >
                <Users className="mr-2 h-4 w-4" />
                Teams
              </Button>
            </div>
            
            <div className="flex gap-2 mt-2 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {view === 'employees' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left">
                      <div className="flex items-center">
                        Name
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="pb-3 text-left">Department</th>
                    <th className="pb-3 text-left">Role</th>
                    <th className="pb-3 text-left">Status</th>
                    <th className="pb-3 text-left">Risk Level</th>
                    <th className="pb-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-purple-50">
                      <td className="py-4">{employee.name}</td>
                      <td className="py-4">{employee.department}</td>
                      <td className="py-4">{employee.role}</td>
                      <td className="py-4">{getStatusBadge(employee.status)}</td>
                      <td className="py-4">{getRiskBadge(employee.riskScore)}</td>
                      <td className="py-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => viewEmployee(employee.id)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredEmployees.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No employees found matching your filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left">
                      <div className="flex items-center">
                        Team Name
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="pb-3 text-left">Department</th>
                    <th className="pb-3 text-left">Members</th>
                    <th className="pb-3 text-left">Manager</th>
                    <th className="pb-3 text-left">Risk Level</th>
                    <th className="pb-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredTeams.map((team) => (
                    <tr key={team.id} className="hover:bg-purple-50">
                      <td className="py-4">{team.name} Team</td>
                      <td className="py-4">{team.department}</td>
                      <td className="py-4">{team.memberCount} members</td>
                      <td className="py-4">{team.manager}</td>
                      <td className="py-4">{getRiskBadge(team.riskScore)}</td>
                      <td className="py-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => viewTeam(team.name)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <Users className="h-4 w-4 mr-1" />
                          View Team
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredTeams.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No teams found matching your filters</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <AddEmployeeDialog 
        open={addEmployeeOpen} 
        onOpenChange={setAddEmployeeOpen} 
        onAddEmployee={handleAddEmployee} 
      />
      <ViewTeamDialog 
        open={viewTeamOpen} 
        onOpenChange={setViewTeamOpen} 
        teamName={selectedTeam} 
      />
    </DashboardLayout>
  );
};

export default Employees;
