import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import MapPage from "./pages/map";
import BoxItem from "./pages/boxitem";
import CameraPage from "./pages/camera";
import ProfilePage from "./pages/profile";
import InfoPage from "./pages/info";
import InfoItemPage from "./pages/infoItem";

function App() {
  return (
    <div className={"bg-black"}>
      <div className={"max-w-[500px] m-auto"}>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/:id" element={<BoxItem />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/info/:id" element={<InfoItemPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/item" element={<BoxItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
