
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Eye, AlertTriangle } from 'lucide-react';

interface TeamCardProps {
  name: string;
  memberCount: number;
  manager: string;
  riskScore: number;
  tasksCompleted: number;
  totalTasks: number;
  onViewTeam: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  memberCount,
  manager,
  riskScore,
  tasksCompleted,
  totalTasks,
  onViewTeam
}) => {
  const completionRate = Math.round((tasksCompleted / totalTasks) * 100);
  
  const getRiskBadge = (score: number) => {
    if (score >= 70) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">High Risk</Badge>;
    } else if (score >= 30) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg flex items-center">
            {name} Team
            {riskScore >= 70 && <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />}
          </CardTitle>
          {getRiskBadge(riskScore)}
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Team Lead:</span>
            <span>{manager}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Members:</span>
            <span>{memberCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Completion Rate:</span>
            <span>{completionRate}%</span>
          </div>
          <div className="pt-2">
            <Progress value={completionRate} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" variant="outline" onClick={onViewTeam}>
          <Users className="mr-2 h-4 w-4" />
          View Team
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
