import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);

  return null;
}
