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
  icon: string; // This is an emoji string
  category: string;
  isNew?: boolean;
}

const availableIntegrations: Integration[] = [
  {
    id: 'jira',
    name: 'Jira',
    description: 'Connect to Jira to track work items, sprints, and developer activity.',
    icon: '/logos/jira_logo.png',
    category: 'Project Management'
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    description: 'Connect to ServiceNow to manage IT services, automate workflows, and track incidents, requests, and project tasks across departments.',
    icon: '/logos/servicenow_logo.png',
    category: 'Project Management'
  },
  {
    id: 'monday.com',
    name: 'Monday.com',
    description: 'Connect to Monday.com to manage projects, track tasks and timelines, and streamline team collaboration through customizable workflows.',
    icon: '/logos/moday.com_logo.png',
    category: 'Project Management'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Connect to Zoom to analyze meeting frequency and duration.',
    icon: '/logos/zoom_logo.png',
    category: 'Communication',
    isNew: true
  },
  {
    id: 'toggl',
    name: 'Toggl',
    description: 'Connect to Toggl to track time spent on different projects and tasks.',
    icon: '/logos/toggle_logo.png',
    category: 'Time Tracking',
    isNew: true
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Connect to Asana to track tasks and project progress.',
    icon: '/logos/asana_logo.jpg',
    category: 'Project Management'
  },
  {
    id: 'clockify',
    name: 'Clockify',
    description: 'Connect to Clockify to track time spent on tasks, monitor productivity, and manage billable hours across teams and projects.',
    icon: '/logos/clockify_logo.png',
    category: 'Time Management'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Connect to Microsoft Teams to monitor communication and meetings.',
    icon: '/logos/teams_logo.webp',
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
    // We pass the integration with its string emoji icon
    // The parent component will handle converting it to a React component
    onAddIntegration(integration);
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
                <div className="mr-4 flex items-center justify-center w-10 h-10">
                  <img src={integration.icon} alt={integration.name} className="w-10 h-10 object-contain" />
                </div>
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
