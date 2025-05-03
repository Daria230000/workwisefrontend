
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'vacation' | 'sick';
  riskLevel: 'low' | 'medium' | 'high';
}

interface ViewTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
}

const ViewTeamDialog: React.FC<ViewTeamDialogProps> = ({ open, onOpenChange, teamName }) => {
  const navigate = useNavigate();
  
  // Mock team data
  const teamMembers: TeamMember[] = [
    { id: 1, name: 'John Doe', role: 'Senior Developer', status: 'active', riskLevel: 'low' },
    { id: 2, name: 'Jane Smith', role: 'Product Designer', status: 'active', riskLevel: 'medium' },
    { id: 3, name: 'Michael Brown', role: 'QA Tester', status: 'vacation', riskLevel: 'low' },
    { id: 4, name: 'Emily Johnson', role: 'Frontend Developer', status: 'active', riskLevel: 'high' },
    { id: 5, name: 'David Wilson', role: 'Backend Developer', status: 'sick', riskLevel: 'medium' },
  ];
  
  const getStatusBadge = (status: 'active' | 'vacation' | 'sick') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'vacation':
        return <Badge className="bg-blue-100 text-blue-800">Vacation</Badge>;
      case 'sick':
        return <Badge className="bg-orange-100 text-orange-800">Sick</Badge>;
    }
  };
  
  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
    }
  };
  
  const viewProfile = (id: number) => {
    navigate(`/employee/${id}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{teamName} Team Members</DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-hidden rounded-md border">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Risk Level</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teamMembers.map((member) => (
                <tr key={member.id} className="bg-white">
                  <td className="px-4 py-3 text-sm">{member.name}</td>
                  <td className="px-4 py-3 text-sm">{member.role}</td>
                  <td className="px-4 py-3 text-sm">{getStatusBadge(member.status)}</td>
                  <td className="px-4 py-3 text-sm">{getRiskBadge(member.riskLevel)}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-purple-600 hover:text-purple-700"
                      onClick={() => viewProfile(member.id)}
                    >
                      View
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeamDialog;
