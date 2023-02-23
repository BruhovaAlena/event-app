import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import EventsList from './screens/EventsList';
import Home from './screens/Home';
import CreateEvent from './screens/CreateEvent';
import EditEvent from './screens/EditEvent';
import EventDetails from './screens/EventDetails';
import LandingPage from './screens/LandingPage';
import Login from './screens/Login';
import Register from './screens/Register';
import { UserContext } from './context/UserContext';

function App() {
  const { accessToken } = useContext(UserContext);

  return (
    <>
      <Router>
        {accessToken ? (
          <>
            <nav>
              <NavBar />
            </nav>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/eventsList" element={<EventsList />} />
              <Route path="/eventDetails/:eventId" element={<EventDetails />} />
              <Route path="/createEvent" element={<CreateEvent />} />
              <Route path="/editEvent/:eventId" element={<EditEvent />} />
              <Route path="/eventDetails/:eventId" element={<EventDetails />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
