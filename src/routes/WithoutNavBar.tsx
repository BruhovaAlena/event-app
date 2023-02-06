import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateEvent from '../screens/CreateEvent';
import EditEvent from '../screens/EditEvent';
import EventDetails from '../screens/EventDetails';
import LandingPage from '../screens/LandingPage';
import Login from '../screens/Login';
import Register from '../screens/Register';

const WithoutNavBar = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/editEvent/:eventId" element={<EditEvent />} />
        <Route path="/eventDetails/:eventId" element={<EventDetails />} />
      </Routes>
    </>
  );
};

export default WithoutNavBar;
