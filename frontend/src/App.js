import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Flights from './components/Flights';
import image from './assets/your-image.png';
function App() {
  

  return (
    <div className="App">
      <Navbar/>
      <Flights/>
    </div>
    
  );
}

export default App;
