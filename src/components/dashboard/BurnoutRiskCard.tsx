
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BurnoutRiskCardProps {
  burnoutRiskData: {
    value: number;
    trend: string;
    trendDirection: 'up' | 'down';
  };
}

const BurnoutRiskCard: React.FC<BurnoutRiskCardProps> = ({ burnoutRiskData }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Burnout Risk Index</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-purple-600 mb-1">{burnoutRiskData.value}%</div>
        <p className="text-sm text-gray-500 mb-4">Organization average</p>
        <div className="h-2 bg-gray-100 rounded-full mb-4">
          <div 
            className={`h-2 rounded-full ${burnoutRiskData.value > 70 ? 'bg-red-500' : burnoutRiskData.value > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} 
            style={{ width: `${burnoutRiskData.value}%` }}
          ></div>
        </div>
        <div className="text-sm">
          <span className={`${burnoutRiskData.trendDirection === 'up' ? 'text-red-500' : 'text-green-500'} font-medium`}>
            {burnoutRiskData.trend}
          </span> since last month
        </div>
      </CardContent>
    </Card>
  );
};

export default BurnoutRiskCard;
