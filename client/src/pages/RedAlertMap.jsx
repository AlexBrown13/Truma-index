import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./RedAlertMap.css";

export default function RedAlertMap() {
  const [open, setOpen] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const israelBounds = [
    [33.3, 35.92], // north-east
    [29.48, 34.27], //south-west
  ];

  return (
    <div className="app">
      {/* Side Panel */}
      <div className={`side-panel ${open ? "open" : ""}`}>
        <h2>Select Dates</h2>

        <label>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>

        <label>
          To:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>

        <button onClick={() => alert(`From: ${fromDate}\nTo: ${toDate}`)}>
          Apply
        </button>
      </div>

      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Map */}
      <MapContainer
        center={[32.0753, 34.6818]} // Tel Aviv
        zoomControl={false}
        zoom={8}
        className="map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
