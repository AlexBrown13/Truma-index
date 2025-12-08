import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const israelBounds = [
    [33.3, 35.92], // north-east
    [29.48, 34.27], //south-west
  ];
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>מפת נפגעי טראומה לפי מחוזות</h2>
      <MapContainer
        bounds={israelBounds}
        style={{ height: "600px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[32.0853, 34.7818]}>
          <Popup>Tel Aviv Center</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
