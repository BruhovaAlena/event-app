import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Login from './components/Login';

function App() {
  // const [users, setUsers] = useState<string[]>([]);
  // console.log('users', users);
  // const getAllDiary = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       baseURL: 'http://localhost:5000/',
  //       url: '/api',
  //     });
  //     const userss = response.data.users;
  //     setUsers(userss);
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     await getAllDiary();
  //   };
  //   getUsers();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
