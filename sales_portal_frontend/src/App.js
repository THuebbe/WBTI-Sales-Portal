import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

const login_port = 'http://127.0.0.1:8000/api/auth/login'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(login_port, {
        username,
        password
    });
      setMessage(response.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
      setIsLoggedIn(false);
  }
};

return (
  <Router>
    <Routes>
      <Route
        path='/'
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <div>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <label>Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                <label>Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
              </form>
              {message && <p>{message}</p>}
            </div>
          )
        }
      />
      <Route
        path='/dashboard'
        element={
          isLoggedIn ? (
            <div>
              <h2>Welcome to Your Dashboard, {username}!</h2>
              <p>More tools coming soon!</p>
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  </Router>
  
)
}

export default App;