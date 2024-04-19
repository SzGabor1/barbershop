import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, } from "react-router-dom";

import AllRoutes from './routers/AllRoutes';

function App() {

  return (
    <>
    <Router>
      <AllRoutes />
    </Router>
    </>
  )
}

export default App
