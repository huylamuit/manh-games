// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./module/home/home";
import FlipCard from "./module/flip-card/flip-card";
import AvoidEggs from './module/avoid-eggs/avoid-eggs';
import MazeRunner from './module/maze-runner/maze-runner';
function App() {
  return (

    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/flip-card" element={<FlipCard />} />
        <Route path="/avoid-eggs" element={<AvoidEggs />} />
        <Route path="/maze-runner" element={<MazeRunner />} />
      </Routes>
    </Router>

  );
}

export default App;
