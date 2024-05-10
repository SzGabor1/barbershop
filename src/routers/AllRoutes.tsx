import React from 'react';

import {Routes, Route} from 'react-router-dom';

import Home from '../components/home';
import Login from '../components/login';
import Appointment from '../components/appointment';
import Register from '../components/register';
import Main from '../components/mainpage';

export const AllRoutes: React.FC = () =>{

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="appointments" element={<Appointment />} />
      <Route path="register" element={<Register />} />
    </Routes>
  )
}

