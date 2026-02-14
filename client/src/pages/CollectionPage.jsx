import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlayCircle, FaArrowLeft, FaMusic } from 'react-icons/fa';
import styles from './Dashboard.module.css';
import { usePlayer } from '../context/PlayerContext';

const CollectionPage = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playSong } = usePlayer();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Map type to API endpoint
                const endpoint = type === 'playlist' ? `/api/playlists/${id}` 
                               : type === 'album' ? `/api/albums/${id}`
                               : type === 'artist' ? `/api/artists/${id}`
                               : null;
                
                if (endpoint) {
                    const res = await axios.get(`http://localhost:3001${endpoint}`);
                    setData(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, type]);

    if (loading) return <div style={{color:'white', padding: 40}}>Loading...</div>;
    if (!data) return <div style={{color:'white', padding: 40}}>Not Found</div>;

    return (
        <div style={{padding: '24px'}}>
             <div style={{marginBottom: 20}}>
                 <button onClick={() => navigate(-1)} style={{background:'transparent', border:0, color:'white', cursor:'pointer', fontSize: 16, display: 'flex', alignItems:'center'}}>
                    <FaArrowLeft style={{marginRight: 8}}/> Back
                 </button>
             </div>
             
             <div style={{display: 'flex', alignItems: 'end', gap: 24, paddingBottom: 24}}>
                 <img src={data.cover} alt={data.name} style={{width: 232, height: 232, boxShadow: '0 4px 60px rgba(0,0,0,.5)'}} />
                 <div>
                     <h4 style={{color: 'white', textTransform: 'uppercase', fontSize: 12, fontWeight: 700}}>{type}</h4>
                     <h1 style={{color: 'white', fontSize: 72, fontWeight: 900, margin: '8px 0'}}>{data.name}</h1>
                     <p style={{color: '#b3b3b3'}}>{data.description || `By ${data.artist || 'Unknown'}`}</p>
                 </div>
             </div>

             <div className={styles.grid} style={{display: 'flex', flexDirection: 'column', gap: 0}}>
                 {data.songs && data.songs.map((song, index) => (
                     <div 
                         key={song.id} 
                         onClick={() => playSong(song)}
                         style={{
                             display: 'flex', 
                             alignItems: 'center', 
                             padding: '8px 16px', 
                             borderBottom: '1px solid rgba(255,255,255,0.1)',
                             color: '#b3b3b3',
                             cursor: 'pointer'
                         }} 
                         className="song-row"
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                     >
                         <span style={{marginRight: 16, width: 20}}>{index + 1}</span>
                         <div style={{flex: 1}}>
                             <div style={{color: 'white', fontSize: 16}}>{song.title}</div>
                             <div style={{fontSize: 12}}>{song.artist}</div>
                         </div>
                         <span>{song.duration}</span>
                     </div>
                 ))}
                 {(!data.songs || data.songs.length === 0) && (
                     <div style={{padding: 40, color: '#b3b3b3', display:'flex', flexDirection: 'column', alignItems:'center'}}>
                         <FaMusic size={40} style={{marginBottom: 20}}/>
                         <p>No songs available in this {type}.</p>
                     </div>
                 )}
             </div>
        </div>
    );
};

export default CollectionPage;
