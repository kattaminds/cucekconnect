
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useApp } from "@/context/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { emergencyAlerts } = useApp();
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  
  // Show the most recent alert that hasn't been dismissed
  useEffect(() => {
    if (emergencyAlerts.length > 0 && !activeAlert) {
      setActiveAlert(emergencyAlerts[0].id);
    }
  }, [emergencyAlerts, activeAlert]);
  
  const currentAlert = emergencyAlerts.find(alert => alert.id === activeAlert);
  
  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 relative">
        {/* Emergency Alert Banner */}
        {currentAlert && (
          <Alert 
            className={`mx-4 mt-4 border animate-slide-down ${
              currentAlert.severity === 'critical' ? 'border-destructive' : 
              currentAlert.severity === 'warning' ? 'border-orange-500' : 'border-blue-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <AlertTitle className={`${
                  currentAlert.severity === 'critical' ? 'text-destructive' : 
                  currentAlert.severity === 'warning' ? 'text-orange-500' : 'text-blue-500'
                }`}>
                  {currentAlert.title}
                </AlertTitle>
                <AlertDescription className="mt-1">
                  {currentAlert.description}
                </AlertDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="mt-1" 
                onClick={() => setActiveAlert(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        )}
        
        <div className="p-4 md:p-6 pb-24">
          {children}
        </div>
      </main>
    </div>
  );
}
