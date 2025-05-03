
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ViewReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    id: number;
    title: string;
    type: string;
    date: string;
    department?: string;
  };
}

const performanceData = [
  { month: 'Jan', team: 76, individual: 68 },
  { month: 'Feb', team: 74, individual: 72 },
  { month: 'Mar', team: 78, individual: 75 },
  { month: 'Apr', team: 82, individual: 78 },
  { month: 'May', team: 79, individual: 82 },
  { month: 'Jun', team: 84, individual: 80 },
];

const burnoutData = [
  { month: 'Jan', high: 5, medium: 15, low: 25 },
  { month: 'Feb', high: 8, medium: 17, low: 20 },
  { month: 'Mar', high: 10, medium: 20, low: 15 },
  { month: 'Apr', high: 7, medium: 18, low: 18 },
  { month: 'May', high: 6, medium: 15, low: 22 },
  { month: 'Jun', high: 5, medium: 12, low: 24 },
];

const ViewReportDialog: React.FC<ViewReportDialogProps> = ({ 
  open, 
  onOpenChange,
  report
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{report.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Report Type:</span>
              <span className="font-medium">{report.type}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Generated on:</span>
              <span className="font-medium">{report.date}</span>
            </div>
            {report.department && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Department:</span>
                <span className="font-medium">{report.department}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Performance Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="team" stroke="#8269FF" />
                      <Line type="monotone" dataKey="individual" stroke="#47B881" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Burnout Risk Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={burnoutData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="high" stackId="a" fill="#FF4D4F" name="High Risk" />
                      <Bar dataKey="medium" stackId="a" fill="#FAAD14" name="Medium Risk" />
                      <Bar dataKey="low" stackId="a" fill="#52C41A" name="Low Risk" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Key Findings</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Engineering team shows 15% higher burnout risk compared to last quarter</li>
                <li>Marketing department has improved work-life balance by 20%</li>
                <li>Average working hours decreased by 0.5 hours per day</li>
                <li>Team collaboration score increased by 12%</li>
                <li>Sprint completion rate improved from 82% to 89%</li>
              </ul>
              
              <h3 className="font-medium mt-6 mb-2">Recommendations</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Implement flexible work hours for Engineering team</li>
                <li>Continue team building activities that proved successful</li>
                <li>Review task allocation process to better distribute workload</li>
                <li>Consider additional support resources for high-risk individuals</li>
                <li>Schedule regular check-ins with team leads to monitor progress</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button className="ml-2 bg-purple-600 hover:bg-purple-700">Download PDF</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialog;
