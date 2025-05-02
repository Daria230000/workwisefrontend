import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, Clock, Lock, CreditCard, User, Globe, Shield, Upload, Plus, Check, X } from 'lucide-react';

const Settings: React.FC = () => {
  const [orgName, setOrgName] = useState('WorkWise Demo Organization');
  const [timezone, setTimezone] = useState('America/New_York');
  const [workdayStart, setWorkdayStart] = useState('09:00');
  const [workdayEnd, setWorkdayEnd] = useState('17:00');
  const [workdays, setWorkdays] = useState(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
  
  const [gdprEnabled, setGdprEnabled] = useState(true);
  const [dataRetention, setDataRetention] = useState('365');
  
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySlack, setNotifySlack] = useState(false);
  const [notifyTeams, setNotifyTeams] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
      </div>
      
      <Tabs defaultValue="organization" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="organization">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input 
                      id="orgName" 
                      value={orgName} 
                      onChange={(e) => setOrgName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Organization Logo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded bg-purple-100 flex items-center justify-center">
                        <Building className="h-8 w-8 text-purple-600" />
                      </div>
                      <Button variant="outline" className="flex items-center">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Work Schedule
              </CardTitle>
              <CardDescription>
                Define working hours and work week structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">Standard Working Hours</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="time" 
                        value={workdayStart} 
                        onChange={(e) => setWorkdayStart(e.target.value)} 
                        className="w-32"
                      />
                      <span>to</span>
                      <Input 
                        type="time" 
                        value={workdayEnd} 
                        onChange={(e) => setWorkdayEnd(e.target.value)} 
                        className="w-32"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Work Week</Label>
                    <div className="flex flex-wrap gap-2">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                        <div 
                          key={day} 
                          className={`px-3 py-1.5 rounded-md cursor-pointer border transition-colors ${
                            workdays.includes(day) 
                              ? 'bg-purple-100 border-purple-300 text-purple-800' 
                              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            if (workdays.includes(day)) {
                              setWorkdays(workdays.filter(d => d !== day));
                            } else {
                              setWorkdays([...workdays, day]);
                            }
                          }}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="mb-2 block">Public Holidays</Label>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">New Year's Day</p>
                        <p className="text-sm text-gray-500">January 1, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">Memorial Day</p>
                        <p className="text-sm text-gray-500">May 29, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">Independence Day</p>
                        <p className="text-sm text-gray-500">July 4, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Holiday
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Flexible Work Hours</Label>
                      <p className="text-sm text-gray-500">Employees can work outside standard hours</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Remote Work</Label>
                      <p className="text-sm text-gray-500">Employees can work from locations outside the office</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Track After-Hours Work</Label>
                      <p className="text-sm text-gray-500">Include work outside standard hours in burnout assessments</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts and role permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Role Permissions</h3>
                    <p className="text-sm text-gray-500">Define what different roles can access</p>
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Role
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 text-left font-medium">Permission</th>
                        <th className="py-3 text-center font-medium">Admin</th>
                        <th className="py-3 text-center font-medium">HR Manager</th>
                        <th className="py-3 text-center font-medium">Team Manager</th>
                        <th className="py-3 text-center font-medium">Employee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3">View Dashboard</td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                      </tr>
                      <tr>
                        <td className="py-3">View Reports</td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                      </tr>
                      <tr>
                        <td className="py-3">Manage Team Members</td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                      </tr>
                      <tr>
                        <td className="py-3">Manage Users</td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                      </tr>
                      <tr>
                        <td className="py-3">Manage Integrations</td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                      </tr>
                      <tr>
                        <td className="py-3">Billing & Subscription</td>
                        <td className="py-3 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                        <td className="py-3 text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">User Accounts</h3>
                    <p className="text-sm text-gray-500">Manage who has access to the system</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Invite User
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 text-left font-medium">Name</th>
                        <th className="py-3 text-left font-medium">Email</th>
                        <th className="py-3 text-left font-medium">Role</th>
                        <th className="py-3 text-left font-medium">Department</th>
                        <th className="py-3 text-left font-medium">Status</th>
                        <th className="py-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3">John Doe</td>
                        <td className="py-3">john.doe@workwise.com</td>
                        <td className="py-3">Admin</td>
                        <td className="py-3">Executive</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Jane Smith</td>
                        <td className="py-3">jane.smith@workwise.com</td>
                        <td className="py-3">HR Manager</td>
                        <td className="py-3">Human Resources</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Alice Cooper</td>
                        <td className="py-3">alice.cooper@workwise.com</td>
                        <td className="py-3">Team Manager</td>
                        <td className="py-3">Engineering</td>
                        <td className="py-3">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Bob Smith</td>
                        <td className="py-3">bob.smith@workwise.com</td>
                        <td className="py-3">Employee</td>
                        <td className="py-3">Engineering</td>
                        <td className="py-3">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Integration Management
              </CardTitle>
              <CardDescription>
                Connect external tools and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057L11.571 15.2V11.513z"/>
                          <path d="M5.232 0a5.218 5.218 0 0 0-5.232 5.215v6.298h11.571V5.215A5.218 5.218 0 0 0 6.34 0H5.232z"/>
                          <path d="M24 5.215a5.218 5.218 0 0 0-5.232-5.215H17.66a5.218 5.218 0 0 0-5.232 5.215v6.298H24V5.215z"/>
                          <path d="M12.428 15.201l4.209 3.585v-2.057h2.13A5.218 5.218 0 0 0 24 11.513h-11.57v3.688z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Jira Integration</h3>
                        <p className="text-sm text-gray-500">Connected - Last synced 2 hours ago</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Sync Now</Button>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.919 13.606a4.639 4.639 0 0 1-1.504 2.693 4.68 4.68 0 0 1-2.706 1.242V19.5h-3.375v-1.959a4.696 4.696 0 0 1-2.706-1.242 4.64 4.64 0 0 1-1.504-2.693H4v-3.212h2.124a4.639 4.639 0 0 1 1.504-2.692A4.696 4.696 0 0 1 10.334 4.5v-1h3.375v1a4.68 4.68 0 0 1 2.706 1.242 4.64 4.64 0 0 1 1.504 2.692H20v3.212h-2.081zM12 15.75A3.75 3.75 0 1 0 12 8.25a3.75 3.75 0 0 0 0 7.5zm0-2.25a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Toggl Integration</h3>
                        <p className="text-sm text-gray-500">Connected - Last synced 4 hours ago</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Sync Now</Button>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-pink-100 flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.736 4L12 11.702 4.263 4 3 5.258 10.737 12.96 3 20.66l1.263 1.258L12 14.217l7.736 7.7L21 20.658l-7.737-7.7L21 5.258z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">BambooHR</h3>
                        <p className="text-sm text-gray-500">Not Connected</p>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700" size="sm">Connect</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.5 10.5h15M7.875 14.25c0 .621.504 1.125 1.125 1.125H15c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H9c-.621 0-1.125-.504-1.125-1.125v-1.5C7.875 9.504 8.379 9 9 9h6c.621 0 1.125.504 1.125 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 3v3m0 15v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">ServiceNow</h3>
                        <p className="text-sm text-gray-500">Not Connected</p>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700" size="sm">Connect</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Field Mapping</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm mb-4">Configure how external data maps to WorkWise fields</p>
                    <Button variant="outline">View Field Mappings</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Send notifications to user email addresses</p>
                      </div>
                      <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Slack Integration</Label>
                        <p className="text-sm text-gray-500">Send notifications to connected Slack channels</p>
                      </div>
                      <Switch checked={notifySlack} onCheckedChange={setNotifySlack} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Microsoft Teams Integration</Label>
                        <p className="text-sm text-gray-500">Send notifications to Teams channels</p>
                      </div>
                      <Switch checked={notifyTeams} onCheckedChange={setNotifyTeams} />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Notification Types</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Burnout Alerts</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Notify when employee burnout risk levels change significantly</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">Notify for risk levels:</span>
                        <div className="flex space-x-2">
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                          <Badge className="bg-orange-100 text-orange-800">High</Badge>
                          <Badge className="bg-red-100 text-red-800">Critical</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Performance Alerts</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Notify when employee performance metrics change significantly</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">Threshold:</span>
                        <div className="flex space-x-2">
                          <Badge className="bg-purple-100 text-purple-800">15% change</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">System Notifications</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Notify about system events like integration status</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Report Notifications</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Periodic reports and summaries</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">Frequency:</span>
                        <div className="flex space-x-2">
                          <Badge className="bg-purple-100 text-purple-800">Weekly</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription plan and payment details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <div className="flex items-baseline mt-1">
                      <span className="text-2xl font-bold">Business Plan</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Renews on July 1, 2023</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Price</p>
                      <p className="font-medium">$299 / month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Users</p>
                      <p className="font-medium">25 of 50 seats used</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Billing Cycle</p>
                      <p className="font-medium">Monthly</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Payment Method</h3>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" className="stroke-gray-700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M1 10h22" className="stroke-gray-700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2025</p>
                    </div>
                    <Button variant="ghost">Change</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 text-left font-medium">Date</th>
                          <th className="py-3 text-left font-medium">Description</th>
                          <th className="py-3 text-left font-medium">Amount</th>
                          <th className="py-3 text-left font-medium">Status</th>
                          <th className="py-3 text-left font-medium">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-3">Jun 1, 2023</td>
                          <td className="py-3">WorkWise Business Plan - June 2023</td>
                          <td className="py-3">$299.00</td>
                          <td className="py-3">
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3">May 1, 2023</td>
                          <td className="py-3">WorkWise Business Plan - May 2023</td>
                          <td className="py-3">$299.00</td>
                          <td className="py-3">
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3">Apr 1, 2023</td>
                          <td className="py-3">WorkWise Business Plan - April 2023</td>
                          <td className="py-3">$299.00</td>
                          <td className="py-3">
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Configure data policies and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Data Compliance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>GDPR Compliance Mode</Label>
                        <p className="text-sm text-gray-500">Enable additional data protection for EU users</p>
                      </div>
                      <Switch checked={gdprEnabled} onCheckedChange={setGdprEnabled} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Anonymization</Label>
                        <p className="text-sm text-gray-500">Anonymize personal data in reports</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>User Data Export</Label>
                        <p className="text-sm text-gray-500">Allow users to export their personal data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Data Retention</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataRetention">Employee Data Retention Period</Label>
                      <Select value={dataRetention} onValueChange={setDataRetention}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="180">180 Days</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                          <SelectItem value="730">2 Years</SelectItem>
                          <SelectItem value="forever">Indefinitely</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Deleted User Data</Label>
                      <p className="text-sm text-gray-500">
                        When a user is deleted from the system, their personal data will be removed
                        but their anonymized contributions to metrics will be preserved.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Password Policy</Label>
                        <p className="text-sm text-gray-500">Enforce strong password requirements</p>
                      </div>
                      <Select defaultValue="strong">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="strong">Strong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
