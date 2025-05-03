
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  BarChart2, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Brain,
  Link as LinkIcon
} from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AllNotificationsDialog from './AllNotificationsDialog';
import EditProfileDialog from './EditProfileDialog';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive }) => {
  return (
    <Link to={href} className="w-full">
      <Button 
        variant="ghost" 
        className={`w-full justify-start ${
          isActive 
            ? 'bg-purple-100 text-purple-600 font-medium' 
            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
        }`}
      >
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showAllNotificationsDialog, setShowAllNotificationsDialog] = useState(false);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Employees', href: '/employees' },
    { icon: BarChart2, label: 'Reports', href: '/reports' },
    { icon: Bell, label: 'Alerts', href: '/alerts' },
    { icon: LinkIcon, label: 'Integrations', href: '/integrations' },
    { icon: Brain, label: 'AI Insights', href: '/ai-insights' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate('/sign-in');
  };

  const notifications = [
    { id: 1, title: "High burnout risk detected", description: "Alex Johnson's burnout risk increased to 85%", time: "10 mins ago", link: "/employee/1" },
    { id: 2, title: "Performance alert", description: "Sarah Miller's task completion rate dropped by 30%", time: "1 hour ago", link: "/employee/2" },
    { id: 3, title: "Team alert", description: "Engineering team working overtime for 3rd consecutive week", time: "3 hours ago", link: "/alerts" },
    { id: 4, title: "System notification", description: "Report generation complete", time: "Yesterday", link: "/reports" },
  ];

  const handleNotificationClick = (notification: any) => {
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
            <Logo className="text-purple-600" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute right-2"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={location.pathname === item.href}
                />
              ))}
            </nav>
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-600 hover:bg-purple-50 hover:text-purple-600"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 relative"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80" forceMount>
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id} 
                        className="p-4 cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div>
                          <div className="font-medium">{notification.title}</div>
                          <p className="text-sm text-gray-500">{notification.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-100 text-center">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm text-purple-600"
                      onClick={() => setShowAllNotificationsDialog(true)}
                    >
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="ml-4 flex items-center">
                <Button 
                  variant="ghost" 
                  className="flex items-center"
                  onClick={() => setShowProfileDialog(true)}
                >
                  <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2">
                    JS
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:block">Jane Smith</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manager Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="h-20 w-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl mb-4">
              JS
            </div>
            <h3 className="text-xl font-bold">Jane Smith</h3>
            <p className="text-gray-500">HR Manager</p>
            
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Email:</span>
                <span>jane.smith@workwise.com</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Department:</span>
                <span>Human Resources</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Team:</span>
                <span>Management</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Member since:</span>
                <span>March 15, 2023</span>
              </div>
            </div>
            
            <div className="w-full mt-6">
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600"
                onClick={() => {
                  setShowProfileDialog(false);
                  setShowEditProfileDialog(true);
                }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* All Notifications Dialog */}
      <AllNotificationsDialog 
        open={showAllNotificationsDialog} 
        onOpenChange={setShowAllNotificationsDialog} 
      />

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={showEditProfileDialog}
        onOpenChange={setShowEditProfileDialog}
      />
    </div>
  );
};

export default DashboardLayout;
