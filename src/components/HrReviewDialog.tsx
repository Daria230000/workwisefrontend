
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

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
  const [formData, setFormData] = useState({
    reason: '',
    urgency: 'medium',
    details: '',
    requestedAction: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`HR review requested for ${employeeName}!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request HR Review</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="reason">Reason for Review</Label>
            <Select 
              value={formData.reason} 
              onValueChange={(value) => handleSelectChange('reason', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="burnout">Burnout Risk</SelectItem>
                <SelectItem value="performance">Performance Concerns</SelectItem>
                <SelectItem value="conflict">Team Conflict</SelectItem>
                <SelectItem value="retention">Retention Risk</SelectItem>
                <SelectItem value="accommodation">Accommodation Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => handleSelectChange('urgency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Review within 2 weeks</SelectItem>
                <SelectItem value="medium">Medium - Review within 1 week</SelectItem>
                <SelectItem value="high">High - Review within 48 hours</SelectItem>
                <SelectItem value="urgent">Urgent - Immediate attention needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="details">Situation Details</Label>
            <Textarea 
              name="details"
              placeholder="Provide context and supporting information"
              value={formData.details}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="requestedAction">Requested Action</Label>
            <Textarea 
              name="requestedAction"
              placeholder="What action would you like HR to take?"
              value={formData.requestedAction}
              onChange={handleChange}
              className="min-h-[80px]"
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Check className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HrReviewDialog;
