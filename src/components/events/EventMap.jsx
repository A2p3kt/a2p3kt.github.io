import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createPinIcon = (color, size = 14) =>
  L.divIcon({
    html: `<div style="background:${color}; width:${size}px; height:${size}px; border-radius:50%; border:2.5px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.25); transition: all 0.2s;"></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

export function EventMap({ events, selectedIndex, onSelectEvent }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerGroupRef = useRef(null);
  const markersMapRef = useRef(new Map());

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, { zoomControl: false }).setView(
      [60.1699, 24.9384],
      13
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    const markerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    markerGroupRef.current = markerGroup;

    // Fix possible container resize issues
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when events list changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markerGroup = markerGroupRef.current;
    if (!map || !markerGroup) return;

    markerGroup.clearLayers();
    markersMapRef.current.clear();
    const bounds = [];

    events.forEach((event, idx) => {
      if (
        event.location &&
        Array.isArray(event.location) &&
        event.location.length === 2 &&
        !isNaN(event.location[0]) &&
        !isNaN(event.location[1])
      ) {
        const isSelected = selectedIndex === idx;
        const icon = isSelected
          ? createPinIcon('#f97316', 20)
          : createPinIcon('#6c3ce0', 14);

        const marker = L.marker(event.location, { icon }).on('click', () => {
          onSelectEvent(event, idx);
        });

        markerGroup.addLayer(marker);
        markersMapRef.current.set(idx, marker);
        bounds.push(event.location);
      }
    });

    if (bounds.length > 0 && selectedIndex === null) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [events, onSelectEvent]);

  // Handle selected event icon update and flyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersMapRef.current.forEach((marker, idx) => {
      if (idx === selectedIndex) {
        marker.setIcon(createPinIcon('#f97316', 20));
      } else {
        marker.setIcon(createPinIcon('#6c3ce0', 14));
      }
    });

    if (selectedIndex !== null) {
      const activeEvent = events[selectedIndex];
      if (
        activeEvent?.location &&
        Array.isArray(activeEvent.location) &&
        activeEvent.location.length === 2
      ) {
        map.flyTo(activeEvent.location, 16, { duration: 1 });
      }
    }
  }, [selectedIndex, events]);

  return (
    <div className="map-area">
      <div id="map" ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}
