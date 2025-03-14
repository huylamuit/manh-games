// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./module/home/home";
import FlipCard from "./module/flip-card/flip-card";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flip-card" element={<FlipCard />} />
      </Routes>
    </Router>

  );
}

export default App;
