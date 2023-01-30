import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WithoutNavBar from './routes/WithoutNavBar';
import WithNavBar from './routes/WithNavBar';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/noheader/*" element={<WithoutNavBar />} />
          <Route path="*" element={<WithNavBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
