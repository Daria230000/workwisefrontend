
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Slack, Github, Trello, Calendar, PlusCircle } from 'lucide-react';
import AddIntegrationDialog from '../components/AddIntegrationDialog';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  connected: boolean;
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Slack',
      description: 'Connect to receive alerts and monitor communication patterns.',
      icon: Slack,
      connected: true
    },
    {
      id: '2',
      name: 'GitHub',
      description: 'Monitor code activity and late-night commits.',
      icon: Github,
      connected: false
    },
    {
      id: '3',
      name: 'Trello',
      description: 'Track task assignments and completion rates.',
      icon: Trello,
      connected: true
    },
    {
      id: '4',
      name: 'Google Calendar',
      description: 'Analyze meeting loads and availability.',
      icon: Calendar,
      connected: false
    }
  ]);
  
  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false);
  
  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newStatus = !integration.connected;
        toast.success(`${integration.name} ${newStatus ? 'connected' : 'disconnected'} successfully`);
        return { ...integration, connected: newStatus };
      }
      return integration;
    }));
  };
  
  const handleAddIntegration = (integration: any) => {
    // Convert the new integration format to match our existing format
    // Make sure we handle the icon properly - it should be a React component, not an emoji string
    const iconComponent = typeof integration.icon === 'string' 
      ? () => <span className="text-2xl">{integration.icon}</span> // Convert emoji string to a component
      : integration.icon || Calendar;
      
    const newIntegration: Integration = {
      id: integration.id || String(integrations.length + 1),
      name: integration.name,
      description: integration.description,
      icon: iconComponent,
      connected: integration.connected || false
    };
    
    setIntegrations([...integrations, newIntegration]);
    toast.success(`${integration.name} integration added successfully`);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <Button 
          onClick={() => setAddIntegrationOpen(true)}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden">
            <CardContent className="flex flex-col h-full p-0">
              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                    <integration.icon size={24} />
                  </div>
                  {integration.connected && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Connected
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-lg mb-2">{integration.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
              </div>
              <div className="border-t p-4 bg-gray-50 mt-auto">
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  className={integration.connected ? "w-full border-purple-200 text-purple-600 hover:bg-purple-50" : "w-full bg-purple-500 hover:bg-purple-600"}
                  onClick={() => toggleConnection(integration.id)}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <AddIntegrationDialog 
        open={addIntegrationOpen}
        onOpenChange={setAddIntegrationOpen}
        onAddIntegration={handleAddIntegration}
      />
    </DashboardLayout>
  );
};

export default Integrations;
