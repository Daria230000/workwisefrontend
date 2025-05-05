// Mock employee risk data - Ensuring trend is strictly 'up' or 'down'
export const riskEmployeeData = [
  { id: "1", name: 'Alice Cooper', department: 'Engineering', risk: 85, trend: 'up' as const, reason: 'Weekend hours increased by 40%', tool: 'jira' },
  { id: "2", name: 'Sarah Johnson', department: 'Design', risk: 78, trend: 'up' as const, reason: 'Consecutive late night work', tool: 'toggl' },
  { id: "3", name: 'Carol Davis', department: 'Marketing', risk: 67, trend: 'down' as const, reason: 'Multiple deadlines this week', tool: 'slack' },
  { id: "4", name: 'Dave Johnson', department: 'Product', risk: 64, trend: 'up' as const, reason: 'Task overload in sprint', tool: 'jira' },
  { id: "5", name: 'Eva Williams', department: 'Engineering', risk: 58, trend: 'down' as const, reason: 'Frequent context switching', tool: 'github' },
];

// Employee data for profiles - Using string IDs to match URL parameters
export const employeesData = [
  {
    id: "1", // Keep as string to match URL parameters
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
  },
  {
    id: "2",
    name: 'Sarah Johnson',
    title: 'UI/UX Designer',
    department: 'Design',
    avatar: '/placeholder.svg',
    email: 'sarah.johnson@workwise.com',
    phone: '(555) 234-5678',
    projects: ['Website Redesign', 'Mobile App', 'Brand Refresh'],
    metrics: {
      avgHoursWorked: 7.2,
      sickDaysLast30: 1,
      currentLoad: 'Medium',
      burnoutRisk: 78,
      completedTasks: 36,
      overdueAssignments: 2,
      sprintContribution: 28,
      ptoBalance: 12,
    },
    skills: [
      { name: 'UI Design', level: 95 },
      { name: 'Figma', level: 90 },
      { name: 'Illustration', level: 85 },
      { name: 'User Research', level: 75 },
      { name: 'Prototyping', level: 88 },
    ],
    burnoutFactors: [
      { factor: 'Late night work', impact: '+30%', trend: 'increasing' },
      { factor: 'Multiple project deadlines', impact: '+25%', trend: 'stable' },
      { factor: 'Meeting overload', impact: '+15%', trend: 'decreasing' },
      { factor: 'Context switching', impact: '+10%', trend: 'stable' },
    ],
  },
  {
    id: "3",
    name: 'Carol Davis',
    title: 'Marketing Specialist',
    department: 'Marketing',
    avatar: '/placeholder.svg',
    email: 'carol.davis@workwise.com',
    phone: '(555) 345-6789',
    projects: ['Product Launch', 'Social Media Campaign', 'Email Marketing'],
    metrics: {
      avgHoursWorked: 7.5,
      sickDaysLast30: 0,
      currentLoad: 'Medium',
      burnoutRisk: 67,
      completedTasks: 38,
      overdueAssignments: 1,
      sprintContribution: 30,
      ptoBalance: 18,
    },
    skills: [
      { name: 'Content Strategy', level: 90 },
      { name: 'Social Media', level: 85 },
      { name: 'Analytics', level: 75 },
      { name: 'Campaign Planning', level: 80 },
      { name: 'Copywriting', level: 92 },
    ],
    burnoutFactors: [
      { factor: 'Multiple deadlines', impact: '+24%', trend: 'increasing' },
      { factor: 'High workload', impact: '+20%', trend: 'stable' },
      { factor: 'Role ambiguity', impact: '+15%', trend: 'increasing' },
      { factor: 'Lack of support', impact: '+8%', trend: 'decreasing' },
    ],
  },
  {
    id: "4",
    name: 'Dave Johnson',
    title: 'Frontend Developer',
    department: 'Engineering',
    avatar: '/placeholder.svg',
    email: 'dave.johnson@workwise.com',
    phone: '(555) 456-7890',
    projects: ['Dashboard Development', 'Mobile App', 'Performance Optimization'],
    metrics: {
      avgHoursWorked: 8.1,
      sickDaysLast30: 1,
      currentLoad: 'High',
      burnoutRisk: 64,
      completedTasks: 40,
      overdueAssignments: 4,
      sprintContribution: 25,
      ptoBalance: 10,
    },
    skills: [
      { name: 'React', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'CSS/Tailwind', level: 85 },
      { name: 'Performance Optimization', level: 80 },
      { name: 'Testing', level: 75 },
    ],
    burnoutFactors: [
      { factor: 'Task overload', impact: '+22%', trend: 'increasing' },
      { factor: 'Technical debt pressure', impact: '+18%', trend: 'stable' },
      { factor: 'Short deadlines', impact: '+15%', trend: 'increasing' },
      { factor: 'Unclear requirements', impact: '+9%', trend: 'decreasing' },
    ],
  },
  {
    id: "5",
    name: 'Eva Williams',
    title: 'Backend Developer',
    department: 'Engineering',
    avatar: '/placeholder.svg',
    email: 'eva.williams@workwise.com',
    phone: '(555) 567-8901',
    projects: ['API Development', 'Authentication System', 'Database Migration'],
    metrics: {
      avgHoursWorked: 7.6,
      sickDaysLast30: 0,
      currentLoad: 'Medium',
      burnoutRisk: 58,
      completedTasks: 35,
      overdueAssignments: 1,
      sprintContribution: 27,
      ptoBalance: 15,
    },
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Database Design', level: 88 },
      { name: 'API Development', level: 90 },
      { name: 'Security', level: 85 },
      { name: 'DevOps', level: 78 },
    ],
    burnoutFactors: [
      { factor: 'Context switching', impact: '+20%', trend: 'increasing' },
      { factor: 'On-call rotations', impact: '+18%', trend: 'stable' },
      { factor: 'Technical complexity', impact: '+12%', trend: 'decreasing' },
      { factor: 'Documentation burden', impact: '+8%', trend: 'decreasing' },
    ],
  },
];

// Mock performance data
export const performanceData = [
  { name: 'Week 1', value: 75 },
  { name: 'Week 2', value: 69 },
  { name: 'Week 3', value: 78 },
  { name: 'Week 4', value: 82 },
];

export const absenceData = [
  { month: 'Jan', sick: 2, pto: 0 },
  { month: 'Feb', sick: 1, pto: 3 },
  { month: 'Mar', sick: 0, pto: 0 },
  { month: 'Apr', sick: 3, pto: 0 },
  { month: 'May', sick: 1, pto: 5 },
  { month: 'Jun', sick: 0, pto: 0 },
];

// More mock data for the dashboard
export const defaultSprintData = [
  { name: 'Sprint 1', assigned: 45, completed: 40 },
  { name: 'Sprint 2', assigned: 50, completed: 38 },
  { name: 'Sprint 3', assigned: 42, completed: 40 },
  { name: 'Sprint 4', assigned: 48, completed: 45 },
];

export const defaultBurnoutRiskData = {
  value: 45,
  trend: '+12.3%',
  trendDirection: 'up' as const,
};

export const defaultAlertsData = {
  total: 24,
  burnoutRisk: 12,
  performanceDips: 7,
  absenteeism: 5
};

export const defaultProductivityData = {
  sprintSuccess: 87.2,
  avgHours: 7.8,
  tasksCompleted: 342,
  taskLoad: 'Medium'
};
