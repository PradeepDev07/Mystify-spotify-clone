import React from 'react';
import { FaPlayCircle, FaPauseCircle, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import styles from './Player.module.css';

const Player = () => {
  const { currentSong, isPlaying, togglePlay, currentTime, duration, handleSeek: onSeek } = usePlayer();

  if (!currentSong) return null;

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  
  const handleSeek = (e) => {
      if(duration && onSeek) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;
          const percentage = x / width;
          onSeek(percentage * duration);
      }
  };
  
  const formatTime = (time) => {
      if(!time) return '0:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.player}>
      <div className={styles.left}>
            <>
                <img 
                    src={currentSong.cover || "https://picsum.photos/200"} 
                    alt="cover" 
                    className={styles.cover} 
                    onError={(e) => {e.target.src = "https://picsum.photos/200"}}
                />
                <div className={styles.info}>
                    <div className={styles.title}>{currentSong.title}</div>
                    <div className={styles.artist}>{currentSong.artist}</div>
                </div>
            </>
      </div>
      
      <div className={styles.center}>
        <div className={styles.controls}>
             <FaStepBackward size={20} color="#b3b3b3" style={{cursor: 'pointer'}}/>
             <div onClick={togglePlay} className={styles.playBtn}>
                 {isPlaying ? (
                     <FaPauseCircle size={40} color="white" />
                 ) : (
                     <FaPlayCircle size={40} color="white" />
                 )}
             </div>
             <FaStepForward size={20} color="#b3b3b3" style={{cursor: 'pointer'}}/>
        </div>
        <div className={styles.playbackBar}>
            <span className={styles.timeText}>{formatTime(currentTime)}</span>
            <div className={styles.progressBar} onClick={handleSeek}>
                <div className={styles.progressFill} style={{width: `${progressPercentage}%`}}></div>
            </div>
            <span className={styles.timeText}>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.right}>
          {/* Volume control placeholder */}
      </div>
    </div>
  );
};

export default Player;
