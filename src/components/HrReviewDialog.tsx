
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";

interface HrReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
}

const HrReviewDialog: React.FC<HrReviewDialogProps> = ({ 
  open, 
  onOpenChange,
  employeeName
}) => {
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [details, setDetails] = useState('');
  const [includeDocumentation, setIncludeDocumentation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast.error("Please select a reason for the HR review.");
      return;
    }
    toast.success("HR review request submitted successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request HR Review</DialogTitle>
          <DialogDescription>
            Request an HR review for {employeeName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">Reason for Review</label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Concerns</SelectItem>
                <SelectItem value="burnout">Burnout Risk</SelectItem>
                <SelectItem value="promotion">Promotion Consideration</SelectItem>
                <SelectItem value="conflict">Workplace Conflict</SelectItem>
                <SelectItem value="accommodation">Accommodation Need</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="urgency" className="text-sm font-medium">Urgency</label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Review within 2 weeks</SelectItem>
                <SelectItem value="medium">Medium - Review within 1 week</SelectItem>
                <SelectItem value="high">High - Review within 48 hours</SelectItem>
                <SelectItem value="urgent">Urgent - Immediate review needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="details" className="text-sm font-medium">Details</label>
            <Textarea 
              id="details" 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide detailed information about the situation"
              className="h-32"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeDocumentation" 
              checked={includeDocumentation}
              onCheckedChange={() => setIncludeDocumentation(!includeDocumentation)}
            />
            <label
              htmlFor="includeDocumentation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include previous documentation
            </label>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HrReviewDialog;
