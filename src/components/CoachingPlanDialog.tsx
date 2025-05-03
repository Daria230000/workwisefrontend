
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Calendar } from 'lucide-react';
import { toast } from 'sonner';

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
  const [formData, setFormData] = useState({
    area: '',
    duration: '3',
    goals: '',
    actions: '',
    metrics: ''
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
    toast.success(`Coaching plan created for ${employeeName}!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Coaching Plan</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="area">Development Area</Label>
            <Select 
              value={formData.area} 
              onValueChange={(value) => handleSelectChange('area', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select development area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leadership">Leadership Skills</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="stress">Stress Management</SelectItem>
                <SelectItem value="teamwork">Teamwork</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="duration">Duration (months)</Label>
            <Select 
              value={formData.duration} 
              onValueChange={(value) => handleSelectChange('duration', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 month</SelectItem>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="goals">Goals</Label>
            <Textarea 
              name="goals"
              placeholder="Define specific, measurable goals"
              value={formData.goals}
              onChange={handleChange}
              className="min-h-[80px]"
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="actions">Action Items</Label>
            <Textarea 
              name="actions"
              placeholder="List action items and resources needed"
              value={formData.actions}
              onChange={handleChange}
              className="min-h-[80px]"
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="metrics">Success Metrics</Label>
            <Textarea 
              name="metrics"
              placeholder="Define how success will be measured"
              value={formData.metrics}
              onChange={handleChange}
              className="min-h-[80px]"
              required
            />
          </div>
          
          <div className="pt-3">
            <Label htmlFor="startDate">Start Date</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input 
                type="date" 
                id="startDate" 
                className="flex-1" 
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
              <Button type="button" size="icon" variant="outline">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Check className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CoachingPlanDialog;
