import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import your CSS file

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleUsernameChange = (event) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const handleEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make a POST request to the backend endpoint
    axios
      .post('https://easytickets.onrender.com/signup', formData)
      .then((response) => {
        console.log(response.data);
        // Redirect to login page after successful registration
        setShouldRedirect(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (shouldRedirect) {
    alert("User created Successfully");
    return navigate('/');
  }

  return (
    <div className='sign-container'>
    <div className="signup-container">
      <h1 className="signup-title">Register</h1>
      <form onSubmit={handleSubmit}>
        <label className="signup-label">
         <h2>Email:</h2> 
          <input
            type="email"
            className="signup-input"
            value={formData.username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label className="signup-label">
          <h2>Password:</h2>
          <input
            type="password"
            className="signup-input"
            value={formData.password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label className="signup-label">
          <h2>Phone:</h2>
          <input
            type="number"
            className="signup-input"
            value={formData.email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <button type="submit" className="signup-button">Submit</button>
      </form>
      
    </div>
    </div>
  );
}

export default Signup;
