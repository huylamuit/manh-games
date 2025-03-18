// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./module/home/home";
import FlipCard from "./module/flip-card/flip-card";
import AvoidEggs from './module/avoid-eggs/avoid-eggs';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flip-card" element={<FlipCard />} />
        <Route path="/avoid-eggs" element={<AvoidEggs />} />
      </Routes>
    </Router>

  );
}

export default App;
