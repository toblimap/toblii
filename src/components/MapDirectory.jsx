import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store/useStore';

// Custom Marker Icon
const createCustomIcon = (isSelected) => L.divIcon({
  className: 'custom-icon',
  html: `
    <div class="relative flex items-center justify-center">
      ${isSelected ? '<div class="absolute w-8 h-8 bg-white/20 rounded-full animate-ping-glow"></div>' : ''}
      <div class="w-2.5 h-2.5 bg-white rounded-full border-2 border-black shadow-[0_0_15px_rgba(255,255,255,0.5)] ${isSelected ? 'scale-125 transition-transform' : ''}"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapDirectory() {
  const { userLocation, setUserLocation, selectedBusiness, setSelectedBusiness } = useStore();
  const [mapConfig, setMapConfig] = useState({ center: [0.3476, 32.5825], zoom: 13 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(loc);
          setMapConfig({ center: [loc.lat, loc.lng], zoom: 15 });
        },
        () => {
          // Default Kampala
          setUserLocation({ lat: 0.3476, lng: 32.5825 });
        }
      );
    }
  }, [setUserLocation]);

  // Fetch all open businesses within reasonable range
  const { data: businesses } = useQuery({
    queryKey: ['businesses-nearby', userLocation],
    queryFn: async () => {
      const lat = userLocation?.lat || 0.3476;
      const lng = userLocation?.lng || 32.5825;
      const res = await fetch(`/api/businesses?lat=${lat}&lng=${lng}`);
      return res.json();
    },
    enabled: !!userLocation,
  });

  return (
    <div className="h-screen w-full bg-[#080A0F]">
      <MapContainer 
        center={mapConfig.center} 
        zoom={mapConfig.zoom} 
        className="h-full w-full"
        zoomControl={false}
      >
        <MapController center={mapConfig.center} zoom={mapConfig.zoom} />
        
        {/* CartoDB Dark Matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {/* CartoDB Labels Only */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          zIndex={10}
        />

        {/* User Pulse */}
        {userLocation && (
          <CircleMarker 
            center={[userLocation.lat, userLocation.lng]}
            radius={6}
            pathOptions={{ color: 'white', fillColor: 'white', fillOpacity: 0.8 }}
            className="animate-pulse-white"
          />
        )}

        {/* Business Pins */}
        {businesses?.results?.filter(b => b.is_open).map((b) => (
          <Marker
            key={b.id}
            position={[b.lat, b.lng]}
            icon={createCustomIcon(selectedBusiness?.business_id === b.id)}
            eventHandlers={{
              click: () => setSelectedBusiness(b),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
