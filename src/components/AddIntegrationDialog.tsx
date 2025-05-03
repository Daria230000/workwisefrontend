
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface AddIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddIntegration: (integration: any) => void;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isNew?: boolean;
}

const availableIntegrations: Integration[] = [
  {
    id: 'jira',
    name: 'Jira',
    description: 'Connect to Jira to track work items, sprints, and developer activity.',
    icon: '📊',
    category: 'Project Management'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect to Slack to monitor communication patterns and workload.',
    icon: '💬',
    category: 'Communication'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect to GitHub to monitor code activity and contributions.',
    icon: '👨‍💻',
    category: 'Development'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Connect to Zoom to analyze meeting frequency and duration.',
    icon: '🎥',
    category: 'Communication',
    isNew: true
  },
  {
    id: 'toggl',
    name: 'Toggl',
    description: 'Connect to Toggl to track time spent on different projects and tasks.',
    icon: '⏱️',
    category: 'Time Tracking',
    isNew: true
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Connect to Asana to track tasks and project progress.',
    icon: '✅',
    category: 'Project Management'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Connect to Google Calendar to analyze meeting load and work hours.',
    icon: '📅',
    category: 'Time Management'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Connect to Microsoft Teams to monitor communication and meetings.',
    icon: '👥',
    category: 'Communication'
  }
];

const AddIntegrationDialog: React.FC<AddIntegrationDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddIntegration
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredIntegrations = selectedCategory === 'all' 
    ? availableIntegrations 
    : availableIntegrations.filter(integration => integration.category === selectedCategory);
  
  const categories = ['all', ...new Set(availableIntegrations.map(integration => integration.category))];
  
  const handleAddIntegration = (integration: Integration) => {
    toast.success(`${integration.name} integration added successfully!`);
    onAddIntegration({...integration, connected: true});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Integration</DialogTitle>
          <DialogDescription>
            Connect with your favorite tools to enhance employee wellness tracking
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[60vh]">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex p-4">
                  <div className="mr-4 text-3xl">{integration.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{integration.name}</h3>
                      {integration.isNew && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                    <div className="text-xs text-gray-400 mt-2">{integration.category}</div>
                  </div>
                </div>
                <div className="border-t p-3 bg-gray-50 flex justify-end">
                  <Button 
                    onClick={() => handleAddIntegration(integration)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddIntegrationDialog;
