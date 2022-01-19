import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modules from "./modules";
import './App.css';
import { BASENAME } from './config';

export const isMobile = () => { return ('ontouchstart' in document.documentElement); }

function App() {
  console.log(BASENAME)
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes >
        <Route path="/*" element={<Modules />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
