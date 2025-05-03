
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from "sonner";

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
  const [reviewType, setReviewType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reviewCycle, setReviewCycle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewType) {
      toast.error("Please select a review type.");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }
    toast.success("Review scheduled successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Review</DialogTitle>
          <DialogDescription>
            Schedule a performance review for {employeeName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="reviewType" className="text-sm font-medium">Review Type</label>
            <Select value={reviewType} onValueChange={setReviewType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select review type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Review</SelectItem>
                <SelectItem value="skills">Skills Assessment</SelectItem>
                <SelectItem value="promotion">Promotion Evaluation</SelectItem>
                <SelectItem value="probation">Probation Review</SelectItem>
                <SelectItem value="feedback">360° Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Review Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reviewCycle" className="text-sm font-medium">Review Cycle</label>
            <Select value={reviewCycle} onValueChange={setReviewCycle}>
              <SelectTrigger>
                <SelectValue placeholder="Select review cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="biannual">Bi-annual</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="adhoc">Ad-hoc</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Schedule Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleReviewDialog;
