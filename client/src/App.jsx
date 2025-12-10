import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import CitySearchMap from "./components/CitySearchMap";
import Video from "./components/Video";
import MyForm from "./components/MyForm";

function App() {
  return (
    <>
      <div>
        {/* <CitySearchMap /> */}
        <Map />
        <Video />
        <MyForm />
      </div>
    </>
  );
}

export default App;
