
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Flag } from 'lucide-react';

const IncidentReport = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <img 
            src="/cusat-logo.png" 
            alt="CUSAT Logo" 
            className="h-16 w-auto object-contain"
          />
          <div>
            <h1 className="text-4xl font-bold">Incident Report</h1>
            <p className="text-muted-foreground">
              Report incidents and issues on campus
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Flag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Coming Soon</h3>
          <p className="text-muted-foreground mt-1">
            The incident reporting system is under development and will be available soon.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default IncidentReport;
