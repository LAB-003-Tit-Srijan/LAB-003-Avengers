import React, { useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface Location {
  longitude: number;
  latitude: number;
  title: string;
  description: string;
}

interface CampusMapProps {
  locations: Location[];
  center?: { longitude: number; latitude: number };
  zoom?: number;
  className?: string;
}

export function CampusMap({
  locations,
  center = { longitude: 77.1025, latitude: 28.7041 }, // Default to Delhi approx
  zoom = 13,
  className = "h-[400px] w-full rounded-2xl overflow-hidden shadow-soft border border-border",
}: CampusMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  if (!MAPBOX_TOKEN) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-muted text-muted-foreground`}
      >
        Mapbox token is missing
      </div>
    );
  }

  return (
    <div className={className}>
      <Map
        initialViewState={{
          longitude: center.longitude,
          latitude: center.latitude,
          zoom: zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="bottom-right" />

        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            longitude={loc.longitude}
            latitude={loc.latitude}
            anchor="bottom"
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(loc);
            }}
          >
            <div className="group cursor-pointer flex flex-col items-center">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg transition-transform group-hover:scale-110">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="w-2 h-2 bg-primary rounded-full mt-1 animate-pulse"></div>
            </div>
          </Marker>
        ))}

        {selectedLocation && (
          <Popup
            anchor="top"
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            onClose={() => setSelectedLocation(null)}
            closeButton={false}
            className="z-50"
          >
            <div className="p-2 min-w-[150px]">
              <h3 className="font-semibold text-sm">{selectedLocation.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{selectedLocation.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
