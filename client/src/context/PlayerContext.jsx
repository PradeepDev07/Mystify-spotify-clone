import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
        togglePlay();
    } else {
        setCurrentSong(song);
        audioRef.current.src = song.url;
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
             playPromise
             .then(() => setIsPlaying(true))
             .catch(error => console.error("Auto-play prevented", error));
        }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        audioRef.current.play();
        setIsPlaying(true);
    }
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const resetPlayer = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setCurrentSong(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      currentTime,
      duration,
      playSong,
      togglePlay,
      handleSeek,
      resetPlayer
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
