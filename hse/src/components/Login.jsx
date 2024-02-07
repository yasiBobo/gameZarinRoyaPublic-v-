// Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import loginLogo from '../assets/signUpLogo.svg';
import './login.css';

const Login = ({ setLoginUsername }) => {
  const [personalCode, setPersonalCode] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedPersonalCode = personalCode.trim();

    if (!trimmedPersonalCode) {
      setErrorMessage('لطفاً کد پرسنلی خود را وارد کنید');
      return;
    }

    try {
      // Assume your API endpoint for user data is '/api/users'
      const response = await axios.get('http://localhost:3002/api/users');
      const users = response.data;
      const user = users.find((u) => u.personal_code.trim() === trimmedPersonalCode);

      if (user) {
        setErrorMessage('');

        if (trimmedPersonalCode === '446699') {
          // This is the admin user, redirect to the admin page
          navigate('/admin');
        } else {
          setConfirmationMessage(`You are confirmed, ${user.username}! Redirecting to Home Page...`);
          // Update the loginUsername in the App component using the prop
          setLoginUsername(user.username);

          // Redirect to the Home Page
          navigate('/home');
        }
      } else {
        setErrorMessage('کد پرسنلی تطابق ندارد');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // FRAMER MOTION
  const transition = {
    type: 'spring',
    damping: 10,
    stiffness: 80,
    delay: 0.5,
    ease: 'easeInOut',
  };

  return (
    <div className="login">
      <div className="loginContent">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="logo"
        >
          <img src={loginLogo} alt="loginLogo" />
        </motion.div>
        <form className="loginForm" onSubmit={handleLogin}>
          <div>
            <motion.input
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ transition, delay: '1.0' }}
              type="text"
              placeholder="کد پرسنلی"
              value={personalCode}
              onChange={(e) => setPersonalCode(e.target.value)}
            />
            {errorMessage && !personalCode && (
              <p className="error">لطفاً کد پرسنلی خود را وارد کنید</p>
            )}
            {errorMessage && personalCode && <p className="error">{errorMessage}</p>}
            {confirmationMessage && <p className="confirmation">{confirmationMessage}</p>}
          </div>
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ transition, delay: '1.1' }}
            className="loginBtn"
          >
            ورود
          </motion.button>
        </form>
      </div>

      {confirmationMessage && (
        <div>
          <h3>{confirmationMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
