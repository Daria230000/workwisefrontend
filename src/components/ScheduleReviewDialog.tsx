
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface ScheduleReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
}

const ScheduleReviewDialog: React.FC<ScheduleReviewDialogProps> = ({ 
  open, 
  onOpenChange,
  employeeName 
}) => {
  const [formData, setFormData] = useState({
    reviewType: '',
    date: '',
    time: '',
    duration: '60',
    participantIds: '',
    notes: ''
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
    toast.success(`Review scheduled for ${employeeName}!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Performance Review</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="reviewType">Review Type</Label>
            <Select 
              value={formData.reviewType} 
              onValueChange={(value) => handleSelectChange('reviewType', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select review type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual Review</SelectItem>
                <SelectItem value="quarterly">Quarterly Review</SelectItem>
                <SelectItem value="monthly">Monthly Check-in</SelectItem>
                <SelectItem value="probation">Probation Review</SelectItem>
                <SelectItem value="project">Project Completion Review</SelectItem>
                <SelectItem value="promotion">Promotion Consideration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="date" 
                  id="date"
                  name="date"
                  className="flex-1" 
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input 
                type="time" 
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="duration">Duration</Label>
            <Select 
              value={formData.duration} 
              onValueChange={(value) => handleSelectChange('duration', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="participantIds">Additional Participants</Label>
            <Input 
              id="participantIds"
              name="participantIds"
              placeholder="Email addresses, comma separated"
              value={formData.participantIds}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              name="notes"
              placeholder="Additional information or agenda items"
              value={formData.notes}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleReviewDialog;
