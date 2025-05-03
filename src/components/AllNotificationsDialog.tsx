
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Bell, Filter, CheckCircle, AlertCircle, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AllNotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  isRead: boolean;
}

const AllNotificationsDialog: React.FC<AllNotificationsDialogProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const notifications: Notification[] = [
    { id: 1, title: "High burnout risk detected", description: "Alex Johnson's burnout risk increased to 85%", time: "10 mins ago", type: 'alert', isRead: false },
    { id: 2, title: "Performance alert", description: "Sarah Miller's task completion rate dropped by 30%", time: "1 hour ago", type: 'alert', isRead: false },
    { id: 3, title: "Team alert", description: "Engineering team working overtime for 3rd consecutive week", time: "3 hours ago", type: 'alert', isRead: false },
    { id: 4, title: "Report generation complete", description: "Monthly performance report is ready for review", time: "Yesterday", type: 'info', isRead: true },
    { id: 5, title: "New employee onboarded", description: "David Wilson has completed onboarding", time: "2 days ago", type: 'success', isRead: true },
    { id: 6, title: "System maintenance", description: "System maintenance scheduled for this weekend", time: "3 days ago", type: 'info', isRead: true },
    { id: 7, title: "Project milestone completed", description: "Team has completed the Dashboard phase", time: "4 days ago", type: 'success', isRead: true },
    { id: 8, title: "New policy update", description: "Remote work policy has been updated", time: "1 week ago", type: 'info', isRead: true },
  ];

  const filterNotifications = () => {
    let filtered = [...notifications];
    
    // Filter by tab
    if (activeTab === 'unread') {
      filtered = filtered.filter(notif => !notif.isRead);
    } else if (activeTab === 'alerts') {
      filtered = filtered.filter(notif => notif.type === 'alert');
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        notif => notif.title.toLowerCase().includes(query) || 
                 notif.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredNotifications = filterNotifications();
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="outline" className="ml-2 bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search notifications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="ml-2">
            Mark all as read
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="all" className="mt-0 h-full">
              {renderNotificationList(filteredNotifications)}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-0 h-full">
              {renderNotificationList(filteredNotifications)}
            </TabsContent>
            
            <TabsContent value="alerts" className="mt-0 h-full">
              {renderNotificationList(filteredNotifications)}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  function renderNotificationList(notifications: Notification[]) {
    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Bell className="h-12 w-12 mb-4 opacity-20" />
          <p>No notifications to display</p>
        </div>
      );
    }
    
    return (
      <div className="divide-y">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-gray-50 cursor-pointer ${notification.isRead ? '' : 'bg-purple-50'}`}
          >
            <div className="flex">
              <div className="mr-3 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h3 className={`font-medium ${notification.isRead ? '' : 'font-semibold'}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {notification.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default AllNotificationsDialog;
