import React from 'react';
import { FaBook, FaPlus, FaHeart } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menuItem} style={{marginBottom: 20}}>
          <FaBook size={24} />
          <span className={styles.menuText}>Your Library</span>
      </div>

      <div className={styles.playlistMenu}>
        <div className={styles.menuItem}>
            <div className={styles.iconBox} style={{background: 'white', color: 'black'}}>
                <FaPlus size={12} />
            </div>
            <span className={styles.menuText}>Create Playlist</span>
        </div>
        <div className={styles.menuItem}>
             <div className={styles.iconBox} style={{background: 'linear-gradient(135deg,#450af5,#c4efd9)'}}>
                <FaHeart size={12} color="white" />
            </div>
            <span className={styles.menuText}>Liked Songs</span>
        </div>
      </div>
      
      <div className={styles.divider}></div>
      
      <div className={styles.playlists}>
         <p className={styles.playlistItem}>Top Hits 2024</p>
         <p className={styles.playlistItem}>Chill Vibes</p>
         <p className={styles.playlistItem}>Coding Focus</p>
      </div>
    </div>
  );
};

// Removed Navigation logic as it's now in Navbar
export default Sidebar;

