import {Routes, Route} from 'react-router-dom';

import Home from '../components/home';
import Login from '../components/login';
import Appointment from '../components/appointment';
import Register from '../components/register';
import Main from '../components/mainpage';

function AllRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="Home" element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Appointments" element={<Appointment />} />
      <Route path="Register" element={<Register />} />
    </Routes>
  )
}

export default AllRoutes
