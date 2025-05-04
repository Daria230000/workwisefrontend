
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AlertsCardProps {
  alertsData: {
    total: number;
    burnoutRisk: number;
    performanceDips: number;
    absenteeism: number;
  };
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alertsData }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-purple-600 mb-1">{alertsData.total}</div>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center text-sm">
            <span>Burnout Risk Alerts</span>
            <span className="font-medium text-red-500">{alertsData.burnoutRisk}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Performance Dips</span>
            <span className="font-medium text-orange-500">{alertsData.performanceDips}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Absenteeism Alerts</span>
            <span className="font-medium text-yellow-500">{alertsData.absenteeism}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
