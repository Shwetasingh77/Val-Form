import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SuccessComponent from './Components/Success';
import Forms from './Components/Forms';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/success" element={<SuccessComponent/>} />
      </Routes>
    </Router>
  );
};

export default App;
