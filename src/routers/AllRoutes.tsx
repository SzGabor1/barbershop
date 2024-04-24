import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from '../components/home';
import Login from '../components/login';
import Appointment from '../components/appointment';

function AllRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Appointments" element={<Appointment />} />
      {/* <Route path="Register" element={<Register />} /> */}
    </Routes>
  )
}

export default AllRoutes
