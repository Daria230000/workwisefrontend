
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, RefreshCw, Link as LinkIcon, AlertTriangle, ExternalLink, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IntegrationCardProps {
  name: string;
  logo: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onReconnect: () => void;
  onSync: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  logo,
  description,
  status,
  lastSync,
  onConnect,
  onDisconnect,
  onReconnect,
  onSync
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-purple-100">
              {logo && <img src={logo} alt={name} className="w-6 h-6" />}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              {status === 'connected' && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Connected
                </Badge>
              )}
              {status === 'disconnected' && (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  Disconnected
                </Badge>
              )}
              {status === 'error' && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Connection Error
                </Badge>
              )}
            </div>
          </div>
          <div>
            {status === 'connected' && (
              <Switch checked={true} onCheckedChange={() => onDisconnect()} />
            )}
            {status === 'disconnected' && (
              <Switch checked={false} onCheckedChange={() => onConnect()} />
            )}
            {status === 'error' && (
              <Switch checked={false} onCheckedChange={() => onReconnect()} />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <CardDescription className="mb-4">
          {description}
        </CardDescription>
        
        {status === 'connected' && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Last synced: {lastSync}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-purple-600"
              onClick={onSync}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Sync now
            </Button>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex items-center text-sm text-red-500">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" /> 
            Authentication error. Please reconnect.
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 pt-3 pb-3 border-t">
        {status === 'connected' && (
          <Button variant="outline" size="sm" className="w-full" onClick={onConnect}>
            <LinkIcon className="h-4 w-4 mr-2" /> Configure
          </Button>
        )}
        {status === 'disconnected' && (
          <Button size="sm" className="w-full bg-purple-600" onClick={onConnect}>
            <LinkIcon className="h-4 w-4 mr-2" /> Connect
          </Button>
        )}
        {status === 'error' && (
          <Button size="sm" className="w-full bg-purple-600" onClick={onReconnect}>
            <RefreshCw className="h-4 w-4 mr-2" /> Reconnect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Integrations: React.FC = () => {
  const [isConnectingJira, setIsConnectingJira] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState("installed");
  const [jiraUrl, setJiraUrl] = useState('');
  const [apiToken, setApiToken] = useState('');
  
  // Integration statuses
  const [integrations, setIntegrations] = useState({
    jira: { status: 'connected' as const, lastSync: 'Today at 09:45 AM' },
    slack: { status: 'connected' as const, lastSync: 'Yesterday at 04:20 PM' },
    googleCalendar: { status: 'error' as const, lastSync: undefined },
    github: { status: 'disconnected' as const, lastSync: undefined },
    toggl: { status: 'disconnected' as const, lastSync: undefined },
    bambooHR: { status: 'connected' as const, lastSync: 'May 20, 2025' },
  });
  
  const handleConnect = (integration: keyof typeof integrations) => {
    if (integration === 'jira') {
      setIsConnectingJira(true);
    } else {
      toast.success(`${integration} connected successfully`);
      setIntegrations({
        ...integrations,
        [integration]: { status: 'connected', lastSync: 'Just now' }
      });
    }
  };
  
  const handleDisconnect = (integration: keyof typeof integrations) => {
    toast.success(`${integration} disconnected`);
    setIntegrations({
      ...integrations,
      [integration]: { status: 'disconnected', lastSync: undefined }
    });
  };
  
  const handleReconnect = (integration: keyof typeof integrations) => {
    if (integration === 'jira') {
      setIsConnectingJira(true);
    } else {
      toast.success(`${integration} reconnected successfully`);
      setIntegrations({
        ...integrations,
        [integration]: { status: 'connected', lastSync: 'Just now' }
      });
    }
  };
  
  const handleSync = (integration: keyof typeof integrations) => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          toast.success(`${integration} synced successfully`);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleJiraConnect = () => {
    if (!jiraUrl || !apiToken) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsConnectingJira(false);
    handleSync('jira');
    setIntegrations({
      ...integrations,
      jira: { status: 'connected', lastSync: 'Just now' }
    });
  };
  
  // Available integrations for the marketplace tab
  const availableIntegrations = [
    { 
      name: 'Asana', 
      logo: '/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png', 
      description: 'Connect your Asana projects to track team workload and task assignments.'
    },
    { 
      name: 'Microsoft Teams', 
      logo: '/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png', 
      description: 'Track communication patterns and meeting load from Microsoft Teams.'
    },
    { 
      name: 'Trello', 
      logo: '/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png', 
      description: 'Import cards and board data to analyze project progress and bottlenecks.'
    },
    { 
      name: 'Monday.com', 
      logo: '/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png', 
      description: 'Connect monday.com boards to analyze task distribution and completion rates.'
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-gray-600 mt-1">
          Connect your tools to WorkWise to analyze your team's workload and wellness
        </p>
      </div>
      
      {isSyncing && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Syncing data...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
              <p className="text-sm text-gray-500">Please don't close this window while syncing</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="installed" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        <TabsContent value="installed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntegrationCard
              name="Jira"
              logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
              description="Sync tasks, sprints, and project data to analyze workload distribution."
              status={integrations.jira.status}
              lastSync={integrations.jira.lastSync}
              onConnect={() => handleConnect('jira')}
              onDisconnect={() => handleDisconnect('jira')}
              onReconnect={() => handleReconnect('jira')}
              onSync={() => handleSync('jira')}
            />
            
            <IntegrationCard
              name="Slack"
              logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
              description="Analyze communication patterns and work hour distribution."
              status={integrations.slack.status}
              lastSync={integrations.slack.lastSync}
              onConnect={() => handleConnect('slack')}
              onDisconnect={() => handleDisconnect('slack')}
              onReconnect={() => handleReconnect('slack')}
              onSync={() => handleSync('slack')}
            />
            
            <IntegrationCard
              name="Google Calendar"
              logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
              description="Analyze meeting load, focus time, and availability patterns."
              status={integrations.googleCalendar.status}
              lastSync={integrations.googleCalendar.lastSync}
              onConnect={() => handleConnect('googleCalendar')}
              onDisconnect={() => handleDisconnect('googleCalendar')}
              onReconnect={() => handleReconnect('googleCalendar')}
              onSync={() => handleSync('googleCalendar')}
            />
            
            <IntegrationCard
              name="GitHub"
              logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
              description="Track code contributions, review load, and development activity."
              status={integrations.github.status}
              lastSync={integrations.github.lastSync}
              onConnect={() => handleConnect('github')}
              onDisconnect={() => handleDisconnect('github')}
              onReconnect={() => handleReconnect('github')}
              onSync={() => handleSync('github')}
            />
            
            <IntegrationCard
              name="Toggl"
              logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
              description="Import time tracking data to analyze work patterns and overtime."
              status={integrations.toggl.status}
              lastSync={integrations.toggl.lastSync}
              onConnect={() => handleConnect('toggl')}
              onDisconnect={() => handleDisconnect('toggl')}
              onReconnect={() => handleReconnect('toggl')}
              onSync={() => handleSync('toggl')}
            />
            
            <IntegrationCard
              name="BambooHR"
              logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
              description="Sync employee data, PTO requests, and organizational structure."
              status={integrations.bambooHR.status}
              lastSync={integrations.bambooHR.lastSync}
              onConnect={() => handleConnect('bambooHR')}
              onDisconnect={() => handleDisconnect('bambooHR')}
              onReconnect={() => handleReconnect('bambooHR')}
              onSync={() => handleSync('bambooHR')}
            />
          </div>
        </TabsContent>
        <TabsContent value="marketplace" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableIntegrations.map((integration) => (
              <Card key={integration.name} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded flex items-center justify-center bg-purple-100">
                        {integration.logo && <img src={integration.logo} alt={integration.name} className="w-6 h-6" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <CardDescription className="mb-4">
                    {integration.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-gray-50 pt-3 pb-3 border-t">
                  <Button size="sm" className="w-full bg-purple-600">
                    <Plus className="h-4 w-4 mr-2" /> Add Integration
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isConnectingJira} onOpenChange={setIsConnectingJira}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to Jira</DialogTitle>
            <DialogDescription>
              Enter your Jira instance URL and API token to connect
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jiraUrl" className="col-span-4">
                Jira URL
              </Label>
              <Input
                id="jiraUrl"
                placeholder="https://your-domain.atlassian.net"
                className="col-span-4"
                value={jiraUrl}
                onChange={(e) => setJiraUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiToken" className="col-span-4">
                API Token
              </Label>
              <Input
                id="apiToken"
                type="password"
                placeholder="Enter your API token"
                className="col-span-4"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <a href="https://id.atlassian.com/manage-profile/security/api-tokens" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-sm text-purple-600 flex items-center">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                How to generate an API token
              </a>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConnectingJira(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple-600" 
              onClick={handleJiraConnect}
            >
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Integrations;
