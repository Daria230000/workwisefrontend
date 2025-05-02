
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Users, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-workwise-text">Dashboard</h1>
          <p className="text-workwise-darkGray">Monitor your organization's health and productivity</p>
        </div>
        
        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-workwise-darkGray">Burnout Risk</CardTitle>
              <BarChart2 className="h-4 w-4 text-workwise-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-workwise-text">12%</div>
              <p className="text-xs text-workwise-darkGray">3% lower than last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-workwise-darkGray">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-workwise-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-workwise-text">7</div>
              <p className="text-xs text-workwise-darkGray">5 high priority</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-workwise-darkGray">Team Members</CardTitle>
              <Users className="h-4 w-4 text-workwise-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-workwise-text">24</div>
              <p className="text-xs text-workwise-darkGray">3 new this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-workwise-darkGray">Sprint Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-workwise-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-workwise-text">68%</div>
              <p className="text-xs text-workwise-darkGray">On track to completion</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area with charts and metrics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Burnout Risk Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-workwise-lightBlue/30">
              <p className="text-workwise-darkGray">Burnout risk chart will render here</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Sprint Success Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-workwise-lightBlue/30">
              <p className="text-workwise-darkGray">Sprint success chart will render here</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Employees at Risk</CardTitle>
            </CardHeader>
            <CardContent className="h-80 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-workwise-border text-left">
                    <th className="pb-3 text-sm font-medium text-workwise-darkGray">Employee</th>
                    <th className="pb-3 text-sm font-medium text-workwise-darkGray">Risk Level</th>
                    <th className="pb-3 text-sm font-medium text-workwise-darkGray">Avg Hours</th>
                    <th className="pb-3 text-sm font-medium text-workwise-darkGray">Sick Days</th>
                    <th className="pb-3 text-sm font-medium text-workwise-darkGray">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-workwise-border">
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-workwise-blue/10 text-workwise-blue flex items-center justify-center mr-2">
                            {String.fromCharCode(64 + i)}
                          </div>
                          <span>Employee {i}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          i % 3 === 0 
                            ? 'bg-red-100 text-red-700' 
                            : i % 3 === 1 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                        }`}>
                          {i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low'}
                        </span>
                      </td>
                      <td className="py-3">{40 + i} hrs</td>
                      <td className="py-3">{i} days</td>
                      <td className="py-3">
                        <button className="text-workwise-blue hover:underline text-sm">
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
