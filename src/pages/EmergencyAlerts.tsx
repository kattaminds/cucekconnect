
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Bell } from 'lucide-react';

const EmergencyAlerts = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Emergency Alerts</h1>
        <p className="text-muted-foreground">
          Stay informed about emergency situations on campus
        </p>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Coming Soon</h3>
          <p className="text-muted-foreground mt-1">
            The emergency alert system is under development and will be available soon.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmergencyAlerts;
