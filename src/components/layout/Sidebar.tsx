
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  HelpCircle,
  Home,
  Library,
  Map,
  Menu,
  MessageSquare,
  ShoppingBag,
  Users,
  X,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    path: "/",
  },
  {
    icon: Map,
    label: "Campus Map",
    path: "/map",
  },
  {
    icon: Users,
    label: "Study Groups",
    path: "/study-groups",
  },
  {
    icon: HelpCircle,
    label: "Doubts & Questions",
    path: "/doubts",
  },
  {
    icon: ShoppingBag,
    label: "Food Delivery",
    path: "/food",
  },
  {
    icon: AlertTriangle,
    label: "Incident Report",
    path: "/incidents",
  },
  {
    icon: MessageSquare,
    label: "Emergency Alerts",
    path: "/alerts",
    alert: true,
  },
  {
    icon: Library,
    label: "Library",
    path: "/library",
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { emergencyAlerts } = useApp();
  
  // Check for active alerts
  const hasActiveAlerts = emergencyAlerts.length > 0;

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-background/80 backdrop-blur-xl border-r border-border transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto py-5">
          {/* Logo */}
          <div className="px-5 mb-8">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-medium">Campus Connect</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const hasAlert = item.alert && hasActiveAlerts;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group relative flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className={cn("flex-shrink-0 h-5 w-5 mr-3")} />
                  <span>{item.label}</span>
                  
                  {/* Alert badge for emergency alerts */}
                  {hasAlert && (
                    <span className="absolute right-3 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                    </span>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <ChevronRight className="absolute right-2 h-4 w-4 text-primary-foreground" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="px-3 mt-6">
            <div className="flex items-center p-3 bg-muted rounded-md">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-primary">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  John Student
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Student ID: 12345678
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
