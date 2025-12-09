import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import CitySearchMap from "./components/CitySearchMap";

function App() {
  return (
    <>
      <div>
        {/* <CitySearchMap /> */}
        <Map />
      </div>
    </>
  );
}

export default App;
