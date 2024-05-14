import React from 'react';

import {Routes, Route} from 'react-router-dom';

import Home from '../components/home/home';
import Login from '../components/login/login';
import Appointment from '../components/booking/appointment';
import Register from '../components/register/register';
import Main from '../components/home/mainpage';

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

