import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import AllRoutes from './routers/AllRoutes';
import Navbar from './components/navbar';
import Footer from './components/footer';
function App() {


  return (
    <>
    <Router>
<Navbar/>
      <AllRoutes />
    </Router>
    <Footer/>
    </>
  )
}

export default App
