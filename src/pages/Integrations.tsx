
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, RefreshCw, Link as LinkIcon, AlertTriangle, ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

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
              <img src={logo} alt={name} className="w-6 h-6" />
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
  
  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard
          name="Jira"
          logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
          description="Sync tasks, sprints, and project data to analyze workload distribution."
          status="connected"
          lastSync="Today at 09:45 AM"
          onConnect={() => setIsConnectingJira(true)}
          onDisconnect={() => alert('Jira disconnected')}
          onReconnect={() => setIsConnectingJira(true)}
          onSync={handleSync}
        />
        
        <IntegrationCard
          name="Slack"
          logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
          description="Analyze communication patterns and work hour distribution."
          status="connected"
          lastSync="Yesterday at 04:20 PM"
          onConnect={() => alert('Connect Slack')}
          onDisconnect={() => alert('Slack disconnected')}
          onReconnect={() => alert('Reconnect Slack')}
          onSync={handleSync}
        />
        
        <IntegrationCard
          name="Google Calendar"
          logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
          description="Analyze meeting load, focus time, and availability patterns."
          status="error"
          onConnect={() => alert('Connect Google Calendar')}
          onDisconnect={() => alert('Google Calendar disconnected')}
          onReconnect={() => alert('Reconnect Google Calendar')}
          onSync={handleSync}
        />
        
        <IntegrationCard
          name="GitHub"
          logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
          description="Track code contributions, review load, and development activity."
          status="disconnected"
          onConnect={() => alert('Connect GitHub')}
          onDisconnect={() => alert('GitHub disconnected')}
          onReconnect={() => alert('Reconnect GitHub')}
          onSync={handleSync}
        />
        
        <IntegrationCard
          name="Toggl"
          logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
          description="Import time tracking data to analyze work patterns and overtime."
          status="disconnected"
          onConnect={() => alert('Connect Toggl')}
          onDisconnect={() => alert('Toggl disconnected')}
          onReconnect={() => alert('Reconnect Toggl')}
          onSync={handleSync}
        />
        
        <IntegrationCard
          name="BambooHR"
          logo="/lovable-uploads/c6874a94-3ca9-4ec1-a5ed-ba6852bc868a.png"
          description="Sync employee data, PTO requests, and organizational structure."
          status="connected"
          lastSync="May 20, 2025"
          onConnect={() => alert('Connect BambooHR')}
          onDisconnect={() => alert('BambooHR disconnected')}
          onReconnect={() => alert('Reconnect BambooHR')}
          onSync={handleSync}
        />
      </div>
      
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
              onClick={() => {
                setIsConnectingJira(false);
                handleSync();
              }}
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
