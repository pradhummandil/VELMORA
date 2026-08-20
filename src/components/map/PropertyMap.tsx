"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { loadGoogleMapsScript, isGoogleMapsKeyConfigured } from "@/utils/googleMapsLoader";

export interface MapMarkerItem {
  id: number | string;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
  listingPurpose?: string;
  propertyType?: string;
  bedrooms?: string | number;
  addressScore?: number;
  reraStatus?: string;
  locality?: string;
  city?: string;
  thumb?: string | null;
}

interface PropertyMapProps {
  markers: MapMarkerItem[];
  selectedPropertyId?: number | string | null;
  onSelectProperty?: (id: number | string) => void;
  onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  className?: string;
}

const formatPinPrice = (price: number): string => {
  if (!price || price <= 0) return "₹ Price";
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(1).replace(/\.0$/, "")} Cr`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(0)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
};

export const PropertyMap: React.FC<PropertyMapProps> = ({
  markers,
  selectedPropertyId,
  onSelectProperty,
  onBoundsChange,
  initialCenter = { lat: 19.015, lng: 72.815 }, // Default Mumbai / Worli
  initialZoom = 13,
  className = "w-100 h-100",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string | number, any>>(new Map());
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const boundsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onBoundsChangeRef = useRef(onBoundsChange);
  useEffect(() => {
    onBoundsChangeRef.current = onBoundsChange;
  }, [onBoundsChange]);

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    if (!mapContainerRef.current) return;

    if (!isGoogleMapsKeyConfigured()) {
      setLoadError(true);
      return;
    }

    loadGoogleMapsScript(["places", "marker"])
      .then((googleMaps) => {
        if (!isMounted || !googleMaps || !mapContainerRef.current) {
          if (!googleMaps) setLoadError(true);
          return;
        }

        if (mapInstanceRef.current) return;

        const map = new googleMaps.Map(mapContainerRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        mapInstanceRef.current = map;
        setMapLoaded(true);

        // Viewport bounds listener with 400ms debounce
        map.addListener("idle", () => {
          if (!onBoundsChangeRef.current) return;

          if (boundsTimeoutRef.current) {
            clearTimeout(boundsTimeoutRef.current);
          }

          boundsTimeoutRef.current = setTimeout(() => {
            const bounds = map.getBounds();
            if (bounds && onBoundsChangeRef.current) {
              const ne = bounds.getNorthEast();
              const sw = bounds.getSouthWest();
              onBoundsChangeRef.current({
                north: Number(ne.lat().toFixed(6)),
                south: Number(sw.lat().toFixed(6)),
                east: Number(ne.lng().toFixed(6)),
                west: Number(sw.lng().toFixed(6)),
              });
            }
          }, 400);
        });
      })
      .catch(() => {
        if (isMounted) setLoadError(true);
      });

    return () => {
      isMounted = false;
      if (boundsTimeoutRef.current) clearTimeout(boundsTimeoutRef.current);
    };
  }, [initialCenter, initialZoom]);

  // Update Markers
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !window.google?.maps) return;

    const googleMaps = window.google.maps;
    const map = mapInstanceRef.current;
    const existingMarkers = markersRef.current;
    const newMarkerIds = new Set(markers.map((m) => String(m.id)));

    // Remove obsolete markers
    for (const [id, markerObj] of existingMarkers.entries()) {
      if (!newMarkerIds.has(String(id))) {
        markerObj.setMap(null);
        existingMarkers.delete(id);
      }
    }

    // Add or update markers
    markers.forEach((m) => {
      if (!m.latitude || !m.longitude || isNaN(m.latitude) || isNaN(m.longitude)) return;

      const markerId = String(m.id);
      const isSelected = selectedPropertyId !== undefined && selectedPropertyId !== null && String(selectedPropertyId) === markerId;
      const formattedPrice = formatPinPrice(m.price);

      // SVG Custom Pin
      const bgColor = isSelected ? "#0F172A" : "#D4AF37"; // Black-Gold contrast
      const textColor = isSelected ? "#FCD34D" : "#0F172A";
      const scale = isSelected ? 1.15 : 1.0;

      const svgIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="34" viewBox="0 0 90 34">
            <defs>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
              </filter>
            </defs>
            <rect x="2" y="2" width="86" height="26" rx="13" fill="${bgColor}" stroke="#FFFFFF" stroke-width="1.5" filter="url(#shadow)"/>
            <polygon points="40,28 50,28 45,34" fill="${bgColor}" />
            <text x="45" y="19" fill="${textColor}" font-size="12" font-weight="bold" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">${formattedPrice}</text>
          </svg>
        `)}`,
        scaledSize: new googleMaps.Size(90 * scale, 34 * scale),
        anchor: new googleMaps.Point(45 * scale, 34 * scale),
      };

      if (existingMarkers.has(markerId)) {
        const markerObj = existingMarkers.get(markerId);
        markerObj.setIcon(svgIcon);
        markerObj.setZIndex(isSelected ? 9999 : 100);
      } else {
        const markerObj = new googleMaps.Marker({
          position: { lat: m.latitude, lng: m.longitude },
          map,
          title: `${m.title} - ${formattedPrice}`,
          icon: svgIcon,
          zIndex: isSelected ? 9999 : 100,
        });

        markerObj.addListener("click", () => {
          if (onSelectProperty) {
            onSelectProperty(m.id);
          }
        });

        existingMarkers.set(markerId, markerObj);
      }
    });
  }, [markers, selectedPropertyId, mapLoaded, onSelectProperty]);

  // Center map on selected property if changed externally
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !selectedPropertyId) return;

    const selectedMarker = markers.find((m) => String(m.id) === String(selectedPropertyId));
    if (selectedMarker && selectedMarker.latitude && selectedMarker.longitude) {
      mapInstanceRef.current.panTo({
        lat: selectedMarker.latitude,
        lng: selectedMarker.longitude,
      });
    }
  }, [selectedPropertyId, markers, mapLoaded]);

  if (loadError) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center bg-light border rounded h-100 p-4 text-center">
        <div className="rounded-circle bg-white shadow-sm p-3 mb-3">
          <i className="bi bi-geo-alt-fill text-warning fs-1"></i>
        </div>
        <h6 className="fw-600 mb-1">Interactive Map Discovery</h6>
        <p className="text-muted fs-13 mb-3" style={{ maxWidth: "280px" }}>
          Viewing residences in curated list format. Google Maps live viewport active in production.
        </p>
        <span className="badge bg-secondary text-white fs-12 px-3 py-2">
          {markers.length} Residences with GPS Coordinates
        </span>
      </div>
    );
  }

  return (
    <div className="position-relative w-100 h-100" style={{ minHeight: "450px" }}>
      <div ref={mapContainerRef} className={className} style={{ width: "100%", height: "100%", minHeight: "450px" }} />
      {!mapLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
