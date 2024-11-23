import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapComponent from "./components/map/map";
import RecognitionBox from "./pages/RecognitionBoxPage";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<MapComponent />} />
                    <Route path="/recognition-box" element={<RecognitionBox />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
