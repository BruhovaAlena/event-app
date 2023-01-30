import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import EventDetails from '../screens/EventDetails';
import EventsList from '../screens/EventsList';
import Home from '../screens/Home';

const WithNavBar = () => {
  return (
    <>
      <nav>
        {/* <Link to="/home">Domov</Link>
        <Link to="/eventsList">List eventov</Link> */}
        <NavBar />
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/eventsList" element={<EventsList />} />
        <Route path="/eventDetails/:eventId" element={<EventDetails />} />
      </Routes>
    </>
  );
};

export default WithNavBar;
