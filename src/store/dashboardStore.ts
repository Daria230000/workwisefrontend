
import { create } from 'zustand';
import { 
  riskEmployeeData as originalRiskEmployeeData,
  performanceData as defaultPerformanceData,
  defaultSprintData,
  defaultBurnoutRiskData,
  defaultAlertsData,
  defaultProductivityData
} from '../data/mockData';

export interface Employee {
  id: string;  // Updated to string type
  name: string;
  department: string;
  risk: number;
  trend: 'up' | 'down'; // Ensuring this is strictly 'up' or 'down'
  reason: string;
  tool: string;
}

export interface BurnoutRiskData {
  value: number;
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface AlertsData {
  total: number;
  burnoutRisk: number;
  performanceDips: number;
  absenteeism: number;
}

export interface ProductivityData {
  sprintSuccess: number;
  avgHours: number;
  tasksCompleted: number;
  taskLoad: string;
}

export interface PerformanceDataPoint {
  name: string;
  value: number;
}

export interface SprintDataPoint {
  name: string;
  assigned: number;
  completed: number;
}

interface DashboardState {
  timeRange: string;
  departmentFilter: string;
  sprintTab: string;
  performanceData: PerformanceDataPoint[];
  sprintData: SprintDataPoint[];
  burnoutRiskData: BurnoutRiskData;
  alertsData: AlertsData;
  productivityData: ProductivityData;
  riskEmployeeData: Employee[];
  filteredEmployeeData: Employee[];
  setTimeRange: (timeRange: string) => void;
  setDepartmentFilter: (department: string) => void;
  setSprintTab: (tab: string) => void;
  updateFilteredEmployees: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  timeRange: '30',
  departmentFilter: 'all',
  sprintTab: 'current',
  performanceData: defaultPerformanceData,
  sprintData: defaultSprintData,
  burnoutRiskData: defaultBurnoutRiskData,
  alertsData: defaultAlertsData,
  productivityData: defaultProductivityData,
  riskEmployeeData: originalRiskEmployeeData as Employee[], // Cast to ensure type compatibility
  filteredEmployeeData: originalRiskEmployeeData as Employee[], // Cast to ensure type compatibility
  
  setTimeRange: (timeRange) => {
    set({ timeRange });
    
    // Update performance data based on time range
    let newPerformanceData = defaultPerformanceData;
    let newBurnoutRiskData = defaultBurnoutRiskData;
    
    if (timeRange === '7') {
      newPerformanceData = [
        { name: 'Day 1', value: 70 },
        { name: 'Day 2', value: 65 },
        { name: 'Day 3', value: 75 },
        { name: 'Day 4', value: 68 },
        { name: 'Day 5', value: 72 },
        { name: 'Day 6', value: 80 },
        { name: 'Day 7', value: 78 },
      ];
      newBurnoutRiskData = {
        value: 38,
        trend: '+5.2%',
        trendDirection: 'up',
      };
    } else if (timeRange === '14') {
      newPerformanceData = [
        { name: 'Week 1', value: 72 },
        { name: 'Week 2', value: 76 },
      ];
      newBurnoutRiskData = {
        value: 42,
        trend: '+8.7%',
        trendDirection: 'up',
      };
    } else if (timeRange === '30') {
      newPerformanceData = defaultPerformanceData;
      newBurnoutRiskData = defaultBurnoutRiskData;
    } else if (timeRange === '90') {
      newPerformanceData = [
        { name: 'Month 1', value: 73 },
        { name: 'Month 2', value: 68 },
        { name: 'Month 3', value: 80 },
      ];
      newBurnoutRiskData = {
        value: 65,
        trend: '+15.8%',
        trendDirection: 'up',
      };
    }
    
    set({ performanceData: newPerformanceData, burnoutRiskData: newBurnoutRiskData });
    get().updateFilteredEmployees();
  },
  
  setDepartmentFilter: (department) => {
    set({ departmentFilter: department });
    get().updateFilteredEmployees();
  },
  
  setSprintTab: (tab) => {
    set({ sprintTab: tab });
    
    // Update sprint data based on tab
    if (tab === 'current') {
      set({
        sprintData: [
          { name: 'Team A', assigned: 18, completed: 16 },
          { name: 'Team B', assigned: 14, completed: 13 },
          { name: 'Team C', assigned: 10, completed: 9 },
        ]
      });
    } else {
      set({
        sprintData: [
          { name: 'Team A', assigned: 20, completed: 18 },
          { name: 'Team B', assigned: 15, completed: 12 },
          { name: 'Team C', assigned: 12, completed: 10 },
        ]
      });
    }
  },
  
  updateFilteredEmployees: () => {
    const { departmentFilter, riskEmployeeData } = get();
    
    let filteredEmployees = [...riskEmployeeData];
    
    // Filter by department if not 'all'
    if (departmentFilter !== 'all') {
      filteredEmployees = filteredEmployees.filter(
        employee => employee.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }
    
    set({ filteredEmployeeData: filteredEmployees });
  }
}));
