import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpotify, FaHome, FaUserCircle } from 'react-icons/fa';
import SearchBar from './SearchBar';
import styles from './Navbar.module.css';
import { usePlayer } from '../context/PlayerContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { resetPlayer } = usePlayer();
    const [showLogout, setShowLogout] = useState(false);

    // Mock login state - ideally comes from AuthContext
    // Assuming if we see this component, we are likely logged in based on current routing flow,
    // but the screenshot shows "Log in" button when likely logged out.
    // For now we'll implement the "Logged In" view as per user request to handle profile logout.
    
    const handleLogout = (e) => {
        e.stopPropagation();
        resetPlayer();
        navigate('/login');
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.leftSection}>
                <FaSpotify size={40} color="white" style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')}/>
                <button className={styles.homeBtn} onClick={() => navigate('/dashboard')}>
                    <FaHome size={24} />
                </button>
            </div>
            
            <div className={styles.centerSection}>
                <div className={styles.searchBarWrapper}>
                    <SearchBar />
                </div>
            </div>

            <div className={styles.rightSection}>
                <div 
                    className={styles.profile} 
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <FaUserCircle size={32} color="white" />
                    <span className={styles.profileName}>User</span>
                    {showLogout && (
                        <div className={styles.logoutDropdown}>
                            <button onClick={handleLogout} className={styles.logoutBtn}>Log out</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
