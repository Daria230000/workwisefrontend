
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import components
import BurnoutRiskCard from '../components/dashboard/BurnoutRiskCard';
import AlertsCard from '../components/dashboard/AlertsCard';
import ProductivityCard from '../components/dashboard/ProductivityCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import SprintStressChart from '../components/dashboard/SprintStressChart';
import EmployeeRiskTable from '../components/dashboard/EmployeeRiskTable';

// Import mock data
import { 
  riskEmployeeData as originalRiskEmployeeData,
  performanceData as defaultPerformanceData,
  defaultSprintData,
  defaultBurnoutRiskData,
  defaultAlertsData,
  defaultProductivityData
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sprintTab, setSprintTab] = useState('current');
  
  // Chart data state
  const [performanceData, setPerformanceData] = useState(defaultPerformanceData);
  const [sprintData, setSprintData] = useState(defaultSprintData);
  const [burnoutRiskData, setburnoutRiskData] = useState(defaultBurnoutRiskData);
  const [alertsData, setAlertsData] = useState(defaultAlertsData);
  const [productivityData, setProductivityData] = useState(defaultProductivityData);
  
  // Active employees at risk (filtered)
  const [riskEmployeeData, setRiskEmployeeData] = useState(originalRiskEmployeeData);
  
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
      setPerformanceData(defaultPerformanceData);
      setburnoutRiskData(defaultBurnoutRiskData);
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
    
    // Filter employees based on department only
    let filteredEmployees = [...originalRiskEmployeeData];
    
    if (departmentFilter !== 'all') {
      filteredEmployees = filteredEmployees.filter(
        employee => employee.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }
    
    setRiskEmployeeData(filteredEmployees);
    
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

  const viewEmployeeProfile = (id: number) => {
    navigate(`/employee/${id}`);
  };

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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <BurnoutRiskCard burnoutRiskData={burnoutRiskData} />
        <AlertsCard alertsData={alertsData} />
        <ProductivityCard productivityData={productivityData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformanceChart performanceData={performanceData} />
        <SprintStressChart 
          sprintTab={sprintTab}
          setSprintTab={setSprintTab}
          sprintData={sprintData}
        />
      </div>
      
      <EmployeeRiskTable 
        riskEmployeeData={riskEmployeeData}
        onViewProfile={viewEmployeeProfile}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
