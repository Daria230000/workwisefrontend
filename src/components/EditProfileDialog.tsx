
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@workwise.com',
    role: 'HR Manager',
    department: 'Human Resources',
    team: 'Management',
    bio: 'HR professional with 8+ years of experience in employee relations, performance management, and organizational development.',
    phone: '(555) 123-4567',
    location: 'New York, NY'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSave} className="space-y-4 py-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl">
                JS
              </div>
              <Button 
                type="button" 
                size="sm" 
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 flex items-center justify-center bg-purple-700 hover:bg-purple-800"
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="department">Department</Label>
              <Input 
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="team">Team</Label>
              <Input 
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
