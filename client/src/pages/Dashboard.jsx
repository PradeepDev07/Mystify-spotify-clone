import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistsRes = await axios.get('http://localhost:3001/api/playlists');
                setPlaylists(playlistsRes.data);
                
                const albumsRes = await axios.get('http://localhost:3001/api/albums');
                setAlbums(albumsRes.data);

                const artistsRes = await axios.get('http://localhost:3001/api/artists');
                setArtists(artistsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{padding: '24px'}}>
            {/* Playlists Section */}
            <SectionBlock title="Made For You" items={playlists} type="playlist" navigate={navigate} />

            <SectionBlock title="Popular Albums" items={albums} type="album" navigate={navigate} />
            <SectionBlock title="Suggested Artists" items={artists} type="artist" navigate={navigate} />
        </div>
    );
};

// Reusable Section Component for Dashboard
const SectionBlock = ({ title, items, type, navigate }) => {
    if (!items || items.length === 0) return null;
    return (
        <>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.grid}>
                {items.map(item => (
                    <div key={item.id} className={styles.card} onClick={() => navigate(`/${type}/${item.id}`)}>
                        <div className={styles.imageWrapper}>
                            <img 
                                src={item.cover || "https://picsum.photos/200"} 
                                alt={item.name} 
                                className={styles.cardImage}
                                onError={(e) => {e.target.src = "https://picsum.photos/200"}}
                                style={type === 'artist' ? {borderRadius: '50%'} : {}}
                            />
                            {/* Albums and Playlists could also be playable in future */}
                             <div className={styles.playButtonOverlay}>
                                <FaPlayCircle size={48} color="#1db954" className={styles.playIcon} />
                            </div>
                        </div>
                        <div className={styles.cardText}>
                            <div className={styles.cardTitle}>{item.name}</div>
                            <div className={styles.cardArtist}>{item.description || item.artist || (type === 'artist' ? 'Artist' : '')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
