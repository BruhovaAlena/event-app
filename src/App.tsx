import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState<string[]>([]);
  console.log('users', users);
  const getAllDiary = async () => {
    try {
      const response = await axios({
        method: 'get',
        baseURL: 'http://localhost:5000/',
        url: '/api',
      });
      const userss = response.data.users;
      setUsers(userss);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      await getAllDiary();
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {users.map((user) => (
            <p>{user}</p>
          ))}
        </a>
      </header>
    </div>
  );
}

export default App;
