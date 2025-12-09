import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapController from "./MapController";

const israelRegions = {
  israel: { label: "Israel", center: [31.5, 34.8], zoom: 7 },
  telaviv: { label: "Tel Aviv", center: [32.0853, 34.7818], zoom: 12 },
  netanya: { label: "Netanya", center: [32.3215, 34.8532], zoom: 12 },
  golan: { label: "Golan Heights", center: [33.1153, 35.8025], zoom: 11 },
  jerusalem: { label: "Jerusalem", center: [31.7683, 35.2137], zoom: 12 },
  haifa: { label: "Haifa", center: [32.794, 34.9896], zoom: 12 },
  beersheba: { label: "Be'er Sheva", center: [31.251, 34.791], zoom: 12 },
};

export default function CitySearchMap() {
  const [region, setRegion] = useState("israel");

  return (
    <div style={{ padding: 8 }}>
      <select
        onChange={(e) => setRegion(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        {Object.keys(israelRegions).map((key) => (
          <option key={key} value={key}>
            {israelRegions[key].label}
          </option>
        ))}
      </select>

      <MapContainer
        center={israelRegions[region].center}
        zoom={israelRegions[region].zoom}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapController
          center={israelRegions[region].center}
          zoom={israelRegions[region].zoom}
        />
      </MapContainer>
    </div>
  );
}
