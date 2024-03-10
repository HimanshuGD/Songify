import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Pages/Home/Main/Main'
import './App.css';

function App() {
  return (
    <div className='App' >
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


