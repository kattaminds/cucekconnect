
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MapPin, BookOpen, HelpCircle, Utensils, Flag, 
  Bell, Library, Home 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: MapPin, label: 'Campus Map', href: '/' },
    { icon: BookOpen, label: 'Study Groups', href: '/study-groups' },
    { icon: HelpCircle, label: 'Doubt Solving', href: '/doubt-solving' },
    { icon: Utensils, label: 'Food Delivery', href: '/food-delivery' },
    { icon: Flag, label: 'Incident Report', href: '/incident-report' },
    { icon: Bell, label: 'Emergency Alerts', href: '/emergency-alerts' },
    { icon: Library, label: 'Library', href: '/library' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-50 border-r bg-card">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold">College App</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink 
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent hover:text-accent-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
        <nav className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-xs",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-4">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
