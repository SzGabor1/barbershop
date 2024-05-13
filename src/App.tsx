import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import {Navbar} from './components/navbar';
import {AllRoutes} from './routers/AllRoutes';
import {Footer} from './components/footer';

const App:React.FC = () => {

  return (
    <>
    <Router>
      <AllRoutes />
<Navbar/>
    </Router>
    <Footer/>
    </>
  )
}

export default App;