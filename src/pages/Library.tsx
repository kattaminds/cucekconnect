
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Library as LibraryIcon } from 'lucide-react';

const Library = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Library System</h1>
        <p className="text-muted-foreground">
          Check book availability, reserve books, and receive reminders
        </p>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <LibraryIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Coming Soon</h3>
          <p className="text-muted-foreground mt-1">
            The automated library system with RFID is under development and will be available soon.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Library;
