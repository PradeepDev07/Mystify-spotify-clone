import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpotify } from 'react-icons/fa';
import styles from './Login.module.css';
import { API_BASE_URL } from '../config/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username,
        password,
      });

      if (response.data.success) {
        // In a real app, store token/user info
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoHeader}>
             <FaSpotify size={40} color="white" />
             <span className={styles.logoText}>Mystify</span>
        </div>
      </header>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Log in to Mystify</h2>
        <form onSubmit={handleLogin} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.inputGroup}>
                <label className={styles.label}>Username</label>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className={styles.input}
                    required
                />
            </div>
            <button type="submit" className={styles.button}>Log In</button>
        </form>
        <div className={styles.hint}>
            <p>Hint: user / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
