import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import CitySearchMap from "./components/CitySearchMap";
import Video from "./components/Video";

function App() {
  return (
    <>
      <div>
        {/* <CitySearchMap /> */}
        <Map />
        <Video />
      </div>
    </>
  );
}

export default App;
