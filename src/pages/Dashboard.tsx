
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDashboardStore } from '../store/dashboardStore';

// Import components
import BurnoutRiskCard from '../components/dashboard/BurnoutRiskCard';
import AlertsCard from '../components/dashboard/AlertsCard';
import ProductivityCard from '../components/dashboard/ProductivityCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import SprintStressChart from '../components/dashboard/SprintStressChart';
import EmployeeRiskTable from '../components/dashboard/EmployeeRiskTable';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    timeRange, setTimeRange,
    departmentFilter, setDepartmentFilter,
    sprintTab, setSprintTab,
    performanceData,
    sprintData,
    burnoutRiskData,
    alertsData,
    productivityData,
    filteredEmployeeData
  } = useDashboardStore();

  // Initialize filtered employees on first render
  React.useEffect(() => {
    useDashboardStore.getState().updateFilteredEmployees();
  }, []);
  
  const viewEmployeeProfile = (id: string) => {  // Updated to accept string ID
    console.log("Navigating to employee profile with ID:", id);
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
        riskEmployeeData={filteredEmployeeData}
        onViewProfile={viewEmployeeProfile}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
