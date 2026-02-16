import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlayCircle } from 'react-icons/fa';
import { useSearch } from '../context/SearchContext';
import { usePlayer } from '../context/PlayerContext';
import styles from './Dashboard.module.css';
import { API_BASE_URL } from '../config/api';

const SearchPage = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const { setSearchQuery } = useSearch(); // to sync if directly navigating via URL
    const { playSong } = usePlayer();
    const [results, setResults] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    
    // Sync URL param to Global State on mount (if user enters url directly)
    useEffect(() => {
        if (query) {
            setSearchQuery(query);
        } else {
            setSearchQuery('');
        }
    }, [query, setSearchQuery]);

    useEffect(() => {
        const fetchData = async () => {
             if (!query) {
                 setResults([]);
                 try {
                     const res = await axios.get(`${API_BASE_URL}/api/playlists`);
                     setPlaylists(res.data);
                 } catch (e) {
                     console.error("Error fetching playlists", e);
                 }
                 return;
             }
             
             try {
                 const res = await axios.get(`${API_BASE_URL}/api/songs?search=${query}`);
                 setResults(res.data);
             } catch (e) {
                 console.error(e);
             }
        };
        fetchData();
    }, [query]);

    return (
        <div style={{padding: '24px'}}>
            {query ? (
                <>
                    <h2 style={{color:'white', marginBottom: 20}}>Search results for "{query}"</h2>
                    {results.length === 0 ? (
                        <p style={{color: '#b3b3b3'}}>No songs found.</p>
                    ) : (
                        <div className={styles.grid}>
                            {results.map(song => (
                                <div key={song.id} className={styles.card} onClick={() => playSong(song)}>
                                    <div className={styles.imageWrapper}>
                                        <img 
                                            src={song.cover || "https://picsum.photos/200"} 
                                            alt={song.title} 
                                            className={styles.cardImage}
                                            onError={(e) => {e.target.src = "https://picsum.photos/200"}}
                                        />
                                        <div className={styles.playButtonOverlay}>
                                            <FaPlayCircle size={48} color="#1db954" className={styles.playIcon} />
                                        </div>
                                    </div>
                                    <div className={styles.cardText}>
                                        <div className={styles.cardTitle}>{song.title}</div>
                                        <div className={styles.cardArtist}>{song.artist}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h2 style={{color:'white', marginBottom: 20}}>Browse All</h2>
                    <div className={styles.grid}>
                        {playlists.map(playlist => (
                            <div key={playlist.id} className={styles.card} onClick={() => navigate(`/playlist/${playlist.id}`)}>
                                <div className={styles.imageWrapper}>
                                    <img 
                                        src={playlist.cover || "https://picsum.photos/200"} 
                                        alt={playlist.name} 
                                        className={styles.cardImage}
                                        onError={(e) => {e.target.src = "https://picsum.photos/200"}}
                                    />
                                </div>
                                <div className={styles.cardText}>
                                    <div className={styles.cardTitle}>{playlist.name}</div>
                                    <div className={styles.cardArtist}>{playlist.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchPage;
