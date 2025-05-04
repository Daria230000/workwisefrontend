
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Employee } from '../../store/dashboardStore';

interface EmployeeRiskTableProps {
  riskEmployeeData: Employee[];
  onViewProfile: (id: number) => void;
}

const EmployeeRiskTable: React.FC<EmployeeRiskTableProps> = ({ 
  riskEmployeeData, 
  onViewProfile 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employees at Highest Risk</CardTitle>
        <Link to="/ai-insights">
          <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left">Employee</th>
                <th className="pb-3 text-left">Department</th>
                <th className="pb-3 text-left">Risk Score</th>
                <th className="pb-3 text-left">Trend</th>
                <th className="pb-3 text-left">Primary Reason</th>
                <th className="pb-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {riskEmployeeData.length > 0 ? (
                riskEmployeeData.map((employee) => (
                  <tr key={employee.id} className="hover:bg-purple-50">
                    <td className="py-4">{employee.name}</td>
                    <td className="py-4">{employee.department}</td>
                    <td className="py-4">
                      <div className="font-medium text-red-500">{employee.risk}%</div>
                    </td>
                    <td className="py-4">
                      {employee.trend === 'up' ? (
                        <ArrowUp size={16} className="text-red-500" />
                      ) : (
                        <ArrowDown size={16} className="text-green-500" />
                      )}
                    </td>
                    <td className="py-4">{employee.reason}</td>
                    <td className="py-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-purple-600 border-purple-200"
                        onClick={() => onViewProfile(employee.id)}
                      >
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No employees match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeRiskTable;
