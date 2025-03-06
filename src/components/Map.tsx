
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Building } from '@/types';
import { MapPin } from 'lucide-react';

interface MapProps {
  buildings?: Building[];
}

const Map = ({ buildings = [] }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || isMapInitialized) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Default center coordinates
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add markers for buildings
      buildings.forEach((building) => {
        const el = document.createElement('div');
        el.className = 'building-marker';
        el.innerHTML = `<div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
        </div>`;
        
        // Add click event to marker
        el.addEventListener('click', () => {
          setSelectedBuilding(building);
        });

        if (building.location) {
          new mapboxgl.Marker(el)
            .setLngLat([building.location.x, building.location.y])
            .addTo(map.current!);
        }
      });
    });

    setIsMapInitialized(true);
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[600px] relative">
      {!isMapInitialized && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm p-4 z-10">
          <div className="max-w-md w-full space-y-4">
            <h2 className="text-xl font-semibold text-center">Enter Mapbox Token</h2>
            <p className="text-sm text-muted-foreground text-center">
              To use the map feature, please enter your Mapbox public token. 
              You can get one from <a href="https://www.mapbox.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
            </p>
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={() => initializeMap(mapboxToken)}
              className="w-full"
              disabled={!mapboxToken}
            >
              Initialize Map
            </Button>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg" />
      
      {selectedBuilding && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-card p-4 rounded-lg shadow-lg z-10">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{selectedBuilding.name}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setSelectedBuilding(null)}
            >
              ✕
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{selectedBuilding.description}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Occupancy:</span> 
              <span className="font-medium"> {selectedBuilding.occupancy}/{selectedBuilding.maxOccupancy}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Study Spaces:</span> 
              <span className="font-medium"> {selectedBuilding.floors.reduce((total, floor) => total + floor.studySpaces.length, 0)}</span>
            </div>
          </div>
          <Button className="w-full mt-3" size="sm">View Details</Button>
        </div>
      )}
    </div>
  );
};

export default Map;
