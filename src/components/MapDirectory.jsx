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

  // whenever the provided center/zoom change, animate the map there
  useEffect(() => {
    console.debug('MapController center changed:', center, 'zoom:', zoom);
    if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1.1 });
    }
  }, [center, zoom, map]);

  // if the user somehow moves the map (drag, zoom, etc.), immediately snap back
  useEffect(() => {
    const handleMoveEnd = () => {
      if (center) {
        map.setView(center, zoom);
      }
    };
    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [center, zoom, map]);

  // disable all interactive behaviours so the pin always stays centred
  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  }, [map]);

  return null;
}

export default function MapDirectory() {
  const { userLocation, setUserLocation, selectedBusiness, setSelectedBusiness } = useStore();
  // mapConfig will be initialized when we receive the user's coordinates
  const [mapConfig, setMapConfig] = useState(null);
  const [locReady, setLocReady] = useState(false);

  // try to acquire the device position immediately, then keep watching it
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      // if geolocation isn't available just mark ready so the map shows the default
      console.warn('Geolocation API not available');
      setLocReady(true);
      return;
    }

    const fillLocation = (loc) => {
      console.debug('fillLocation called', loc);
      setUserLocation(loc);
      // set the map centre and zoom once we have coords
      setMapConfig({ center: [loc.lat, loc.lng], zoom: 18 });
      setLocReady(true);
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fillLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (error) => {
        console.error('getCurrentPosition failed', error);
        // permission denied or other error – we won't render the map
        setLocReady(true);
      },
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        fillLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (err) => {
        console.error('watchPosition error', err);
        // ignore watch errors
      },
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [setUserLocation]);

  // ensure mapConfig always follows userLocation, including updates from watchPosition
  useEffect(() => {
    if (userLocation) {
      console.debug('syncing mapConfig from userLocation', userLocation);
      setMapConfig({ center: [userLocation.lat, userLocation.lng], zoom: 18 });
    }
  }, [userLocation]);

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

  if (!locReady) {
    // still waiting for location permission/response
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#080A0F] text-white">
        Requesting location permission…
      </div>
    );
  }

  if (!userLocation || !mapConfig) {
    // permission denied or location unavailable
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#080A0F] text-white">
        Unable to obtain location. Please enable device GPS.
      </div>
    );
  }

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
