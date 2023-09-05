import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import your CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    sessionStorage.setItem('username', event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleChange=()=>{
    navigate('/signup')
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Make a POST request to the backend endpoint
    axios
      .post('https://easytickets.onrender.com/login', { username, password })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 && response.data === 'Login successful') {
          // Get the user's email from the response and store it in session storage
          const userEmail = response.data.email;
          sessionStorage.setItem('email', userEmail);
          console.log(userEmail)
  
          // Redirect to another page (e.g., home page) upon successful login
          navigate('/home');
        } else {
          // Handle unsuccessful login
          console.log('Invalid');
          alert('Invalid Credentials');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle network errors or other exceptions here
      });
  };
  
  return (
    <div className='main-container'>
      <h1>Cinemate</h1>
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} method="post">
          <label>
            <h2>Email:</h2>
            <input
              type="email"
              value={username}
              onChange={handleUsernameChange}
              className="login-input"
              />
          </label>
          <br />
          <label>
          <h2>Password:</h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="login-input"
            />
          </label>
          <br />
          <button type="submit" className="login-button">
            Submit
          </button>
          <button className="new-user-link" onClick={handleChange}>New User</button>
        </form>

        
      </div>
    </div>
  
  );
};

export default Login;
