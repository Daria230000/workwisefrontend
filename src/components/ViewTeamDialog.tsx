
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ViewTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: {
    name: string;
    members: TeamMember[];
    metrics?: TeamMetrics;
  };
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  risk: number;
  performance: number;
  trend: 'up' | 'down' | 'flat';
}

interface TeamMetrics {
  burnoutRisk: number;
  performance: number;
  collaboration: number;
  workload: number;
}

const ViewTeamDialog: React.FC<ViewTeamDialogProps> = ({ 
  open, 
  onOpenChange,
  team
}) => {
  const getStatusColor = (value: number) => {
    if (value > 75) return 'text-green-600';
    if (value > 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600';
    if (risk < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number) => {
    if (value > 75) return 'bg-green-600';
    if (value > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const metrics = team.metrics || {
    burnoutRisk: 35,
    performance: 78,
    collaboration: 82,
    workload: 65
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Users className="mr-2 h-5 w-5" />
            {team.name} Team
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {/* Team Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="py-4">
                <div className="text-sm text-gray-500">Burnout Risk</div>
                <div className={`text-2xl font-bold ${getRiskColor(metrics.burnoutRisk)}`}>
                  {metrics.burnoutRisk}%
                </div>
                <Progress value={metrics.burnoutRisk} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-4">
                <div className="text-sm text-gray-500">Performance</div>
                <div className={`text-2xl font-bold ${getStatusColor(metrics.performance)}`}>
                  {metrics.performance}%
                </div>
                <Progress value={metrics.performance} className={`h-1.5 mt-2 ${getProgressColor(metrics.performance)}`} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-4">
                <div className="text-sm text-gray-500">Collaboration</div>
                <div className={`text-2xl font-bold ${getStatusColor(metrics.collaboration)}`}>
                  {metrics.collaboration}%
                </div>
                <Progress value={metrics.collaboration} className={`h-1.5 mt-2 ${getProgressColor(metrics.collaboration)}`} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-4">
                <div className="text-sm text-gray-500">Workload</div>
                <div className={`text-2xl font-bold ${getStatusColor(metrics.workload)}`}>
                  {metrics.workload}%
                </div>
                <Progress value={metrics.workload} className={`h-1.5 mt-2 ${getProgressColor(metrics.workload)}`} />
              </CardContent>
            </Card>
          </div>

          {/* Team Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left">Employee</th>
                  <th className="pb-3 text-left">Role</th>
                  <th className="pb-3 text-left">Risk Score</th>
                  <th className="pb-3 text-left">Performance</th>
                  <th className="pb-3 text-left">Trend</th>
                  <th className="pb-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {team.members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="py-3">{member.name}</td>
                    <td className="py-3">{member.role}</td>
                    <td className="py-3">
                      <div className={`font-medium ${getRiskColor(member.risk)}`}>{member.risk}%</div>
                    </td>
                    <td className="py-3">
                      <div className={`font-medium ${getStatusColor(member.performance)}`}>{member.performance}%</div>
                    </td>
                    <td className="py-3">
                      {member.trend === 'up' ? (
                        <ArrowUpRight className="text-green-500" size={16} />
                      ) : member.trend === 'down' ? (
                        <ArrowDownRight className="text-red-500" size={16} />
                      ) : (
                        <span className="text-gray-400">→</span>
                      )}
                    </td>
                    <td className="py-3">
                      <Link to={`/employee/${member.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeamDialog;
