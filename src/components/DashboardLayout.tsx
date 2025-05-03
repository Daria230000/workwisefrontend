
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
            ? 'bg-sidebar-accent text-white' 
            : 'text-white hover:bg-sidebar-accent hover:text-white'
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

  return (
    <div className="flex h-screen bg-purple-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-purple-700 transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <Logo variant="full" className="text-white" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-purple-800"
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
          
          <div className="border-t border-purple-600 p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-purple-800 hover:text-white"
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
        <header className="bg-white border-b border-purple-100">
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
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-600 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <div className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  JS
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:block">Jane Smith</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
