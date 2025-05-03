
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";

interface CoachingPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
}

const CoachingPlanDialog: React.FC<CoachingPlanDialogProps> = ({ 
  open, 
  onOpenChange,
  employeeName
}) => {
  const [focusArea, setFocusArea] = useState('');
  const [duration, setDuration] = useState('3');
  const [objectives, setObjectives] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Coaching plan created successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Coaching Plan</DialogTitle>
          <DialogDescription>
            Develop a coaching plan for {employeeName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="focusArea" className="text-sm font-medium">Focus Area</label>
            <Select value={focusArea} onValueChange={setFocusArea} required>
              <SelectTrigger>
                <SelectValue placeholder="Select focus area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leadership">Leadership Skills</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="timeManagement">Time Management</SelectItem>
                <SelectItem value="stressManagement">Stress Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">Duration (months)</label>
            <Select value={duration} onValueChange={setDuration} required>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 month</SelectItem>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="objectives" className="text-sm font-medium">Objectives</label>
            <Textarea 
              id="objectives" 
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="Enter key objectives for this coaching plan"
              required
              className="h-32"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Create Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CoachingPlanDialog;
