
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Utensils } from 'lucide-react';

const FoodDelivery = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Food Delivery</h1>
        <p className="text-muted-foreground">
          Order food from campus vendors and nearby restaurants
        </p>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Utensils className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Coming Soon</h3>
          <p className="text-muted-foreground mt-1">
            The food delivery feature is under development and will be available soon.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default FoodDelivery;
