
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ViewReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report?: {
    id: string;
    title: string;
    date: string;
    type: string;
    content?: string;
  };
}

const ViewReportDialog: React.FC<ViewReportDialogProps> = ({
  open,
  onOpenChange,
  report
}) => {
  if (!report) return null;

  const generateReportContent = (type: string) => {
    switch (type) {
      case 'burnout':
        return (
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-medium text-lg">Executive Summary</h3>
              <p className="text-gray-700 mt-2">
                This report provides an analysis of employee burnout risk factors across the organization. 
                The overall organizational burnout risk is currently at 42%, which represents a 5% 
                increase from the previous month.
              </p>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium text-lg">Key Findings</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>The Engineering department has the highest burnout risk at 58%</li>
                <li>Weekend work has increased by 22% across all departments</li>
                <li>Meeting load is up 15% from the previous quarter</li>
                <li>Task switching has increased by 18% in the last month</li>
                <li>After-hours communication has seen a 12% increase</li>
              </ul>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium text-lg">Recommendations</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Implement no-meeting Fridays to reduce meeting load</li>
                <li>Set clear boundaries for after-hours communication</li>
                <li>Review project timelines and resource allocation</li>
                <li>Consider additional resources for the Engineering team</li>
                <li>Encourage use of PTO, especially for high-risk employees</li>
              </ul>
            </div>
          </div>
        );
      case 'productivity':
        return (
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-medium text-lg">Overview</h3>
              <p className="text-gray-700 mt-2">
                This productivity analysis report examines team performance metrics and identifies 
                patterns that may impact overall efficiency and output quality.
              </p>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium text-lg">Performance Metrics</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Task completion rate: 87% (up 3% from last month)</li>
                <li>Average time per task: 3.5 hours (down 0.5 hours)</li>
                <li>Code quality score: 92/100 (up 2 points)</li>
                <li>Sprint completion rate: 95% (up 5%)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg">Areas for Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Documentation completion is at 72%, below target of 85%</li>
                <li>Cross-team collaboration needs improvement</li>
                <li>QA testing cycles taking longer than expected</li>
              </ul>
            </div>
          </div>
        );
      default:
        return <p className="text-gray-700">No details available for this report.</p>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{report.title}</DialogTitle>
          <DialogDescription>
            Generated on {report.date} • {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="my-4 max-h-[50vh]">
          <div className="pr-4">
            {generateReportContent(report.type)}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex justify-between sm:justify-between flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialog;
