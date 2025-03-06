
import { useState, useEffect, useRef } from "react";
import { Building, StudySpace } from "@/types";
import { useApp } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Users, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function CampusMap() {
  const { buildings } = useApp();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (mapContainerRef.current) {
      const updateDimensions = () => {
        if (mapContainerRef.current) {
          setMapDimensions({
            width: mapContainerRef.current.offsetWidth,
            height: mapContainerRef.current.offsetHeight,
          });
        }
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, []);

  useEffect(() => {
    if (selectedBuilding && selectedBuilding.floors.length > 0 && !selectedFloor) {
      setSelectedFloor(selectedBuilding.floors[0].id);
    }
  }, [selectedBuilding, selectedFloor]);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    if (building.floors.length > 0) {
      setSelectedFloor(building.floors[0].id);
    }
  };

  const handleFloorChange = (floorId: string) => {
    setSelectedFloor(floorId);
  };

  // Calculate the occupancy percentage and status
  const getOccupancyStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    
    if (percentage < 40) return { status: "Low", color: "bg-green-500" };
    if (percentage < 75) return { status: "Moderate", color: "bg-yellow-500" };
    return { status: "High", color: "bg-red-500" };
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Map area */}
        <div className="flex-1 relative rounded-xl overflow-hidden border h-[500px] bg-accent/50" ref={mapContainerRef}>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-6xl font-bold">CAMPUS MAP</div>
          </div>
          
          {buildings.map((building) => {
            // Scale coordinates to the container size
            const x = (building.location.x / 400) * mapDimensions.width;
            const y = (building.location.y / 400) * mapDimensions.height;
            
            const occupancy = getOccupancyStatus(building.occupancy, building.maxOccupancy);
            
            return (
              <Popover key={building.id}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute h-10 w-10 rounded-full border-2 ${
                      selectedBuilding?.id === building.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : `border-border ${occupancy.color} text-primary-foreground`
                    } hover:scale-110 transition-all duration-200`}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    onClick={() => handleBuildingClick(building)}
                  >
                    <span className="sr-only">{building.name}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="glass-card w-64 p-0 animate-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                  align="center"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{building.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{building.description}</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Current Occupancy:</span>
                        <Badge variant={
                          occupancy.status === "Low" ? "outline" : 
                          occupancy.status === "Moderate" ? "secondary" : "destructive"
                        }>
                          {occupancy.status}
                        </Badge>
                      </div>
                      <Progress 
                        value={(building.occupancy / building.maxOccupancy) * 100} 
                        className="h-2" 
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        {building.occupancy} / {building.maxOccupancy}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t p-2 bg-muted/50">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between"
                      onClick={() => handleBuildingClick(building)}
                    >
                      <span>View Study Spaces</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>

        {/* Building details */}
        {selectedBuilding && (
          <Card className="md:w-[350px] animate-in slide-in-from-right-5">
            <CardHeader>
              <CardTitle>{selectedBuilding.name}</CardTitle>
              <CardDescription>{selectedBuilding.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Occupancy info */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Occupancy
                  </h4>
                  <span className="text-sm">{selectedBuilding.occupancy} / {selectedBuilding.maxOccupancy}</span>
                </div>
                <Progress 
                  value={(selectedBuilding.occupancy / selectedBuilding.maxOccupancy) * 100} 
                  className="h-2" 
                />
              </div>
              
              {/* Floor tabs */}
              {selectedBuilding.floors.length > 0 && (
                <Tabs value={selectedFloor || ""} onValueChange={handleFloorChange} className="mt-4">
                  <TabsList className="w-full">
                    {selectedBuilding.floors.map((floor) => (
                      <TabsTrigger key={floor.id} value={floor.id} className="flex-1">
                        {floor.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {selectedBuilding.floors.map((floor) => (
                    <TabsContent key={floor.id} value={floor.id} className="mt-4 space-y-4">
                      {floor.studySpaces.map((space) => (
                        <StudySpaceCard key={space.id} space={space} />
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedBuilding(null)}>
                Back to Map
              </Button>
              <Button size="sm">Get Directions</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

function StudySpaceCard({ space }: { space: StudySpace }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const occupancyPercentage = (space.currentOccupancy / space.capacity) * 100;
  const occupancyColor = 
    occupancyPercentage < 40 ? "bg-green-500" : 
    occupancyPercentage < 75 ? "bg-yellow-500" : 
    "bg-red-500";
  
  return (
    <div className="border rounded-lg overflow-hidden transition-all duration-300">
      <div 
        className="p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${occupancyColor} mr-3`}></div>
          <h4 className="font-medium">{space.name}</h4>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">
            {space.currentOccupancy}/{space.capacity}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 bg-muted/40">
          <div className="text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">Status: </span>
              <Badge variant={space.isAvailable ? "outline" : "secondary"}>
                {space.isAvailable ? "Available" : "Full"}
              </Badge>
            </div>
            {space.isReservable && (
              <div>
                <Badge variant="outline" className="bg-primary/10">Reservable</Badge>
              </div>
            )}
            {space.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {space.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-3">
              {space.isReservable && space.isAvailable && (
                <Button size="sm">Reserve</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Utility component for icons in this file
function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
