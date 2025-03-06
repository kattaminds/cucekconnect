
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
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
            <h1 className="text-4xl font-bold">Campus Map</h1>
            <p className="text-muted-foreground">
              View real-time information about building occupancy, study spaces, and event locations.
            </p>
          </div>
        </div>
        
        <div className="w-full h-[600px] overflow-hidden rounded-lg shadow-lg">
          <iframe 
            src="https://www.google.com/maps/d/u/0/embed?mid=1QsAERbGgnr-MHt-BAeS4v8rwnEdmbAc&ehbc=2E312F" 
            width="100%" 
            height="100%" 
            className="border-0"
            title="CUSAT Campus Map"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
