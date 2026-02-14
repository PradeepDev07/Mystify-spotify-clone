const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const USERS = [
    { username: 'admin', password: 'password123', name: 'Admin User' },
    { username: 'user', password: 'user123', name: 'Spotify Fan' }
];


const SONGS = [
    {
        id: 1,
        title: "SoundHelix Song 1",
        artist: "SoundHelix",
        album: "Electronic Vibes",
        duration: "6:12",
        cover: "https://picsum.photos/200?random=1",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        playList: "Top Hits 2024",
            album: "Electronic Vibes",
            artist: "SoundHelix"
    },
    {
        id: 2,
        title: "SoundHelix Song 2",
        artist: "SoundHelix",
        album: "Deep Beats",
        duration: "7:05",
        cover: "https://picsum.photos/200?random=2",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        ,playList: "Chill Vibes",
        album: "Deep Beats",
        artist: "SoundHelix"
    },
    {
        id: 3,
        title: "SoundHelix Song 3",
        artist: "SoundHelix",
        album: "Classical Mix",
        duration: "5:44",
        cover: "https://picsum.photos/200?random=3",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
            ,playList: "Coding Focus"
            ,album: "Classical Mix",
            artist: "SoundHelix"
    },
    {
        id: 4,
        title: "SoundHelix Song 4",
        artist: "SoundHelix",
        album: "Pop Rocks",
        duration: "5:02",
        cover: "https://picsum.photos/200?random=4",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
            ,playList: "Top Hits 2024",
            album: "Pop Rocks",
            artist: "SoundHelix"
    }
];



const PLAYLISTS = [
    { id: 'p1', name: "Top Hits 2024", description: "The hottest tracks right now.", cover: "https://picsum.photos/200?random=10" },
    { id: 'p2', name: "Chill Vibes", description: "Relax and unwind.", cover: "https://picsum.photos/200?random=11" },
    { id: 'p3', name: "Coding Focus", description: "Beats to code to.", cover: "https://picsum.photos/200?random=12" }
];

const ALBUMS = [
    { id: 'a1', name: "Electronic Vibes", artist: "SoundHelix", cover: "https://picsum.photos/200?random=20" },
    { id: 'a2', name: "Deep Beats", artist: "SoundHelix", cover: "https://picsum.photos/200?random=21" }
];

const ARTISTS = [
    { id: 'art1', name: "SoundHelix", followers: "1.2M", cover: "https://picsum.photos/200?random=30" },
    { id: 'art2', name: "Unknown Artist", followers: "500k", cover: "https://picsum.photos/200?random=31" }
];

const CATEGORIES = [
    { id: 'c1', name: "Pop", color: "#rgb(255, 0, 0)" },
    { id: 'c2', name: "Indie", color: "#rgb(0, 255, 0)" },
    { id: 'c3', name: "Focus", color: "#rgb(0, 0, 255)" }
];


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, user: { name: user.name, username: user.username } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});


app.get('/api/songs', (req, res) => {
    const { search } = req.query;
    if (search) {
        const lowerSearch = search.toLowerCase();
        const filtered = SONGS.filter(s => 
            s.title.toLowerCase().includes(lowerSearch) || 
            s.artist.toLowerCase().includes(lowerSearch) ||
            s.album.toLowerCase().includes(lowerSearch)
        );
        return res.json(filtered);
    }
    res.json(SONGS);
});

app.get('/api/playlists', (req, res) => res.json(PLAYLISTS));
app.get('/api/albums', (req, res) => res.json(ALBUMS));
app.get('/api/artists', (req, res) => res.json(ARTISTS));
app.get('/api/categories', (req, res) => res.json(CATEGORIES));

// Get specific collections with their songs
app.get('/api/playlists/:id', (req, res) => {
    const playlist = PLAYLISTS.find(p => p.id === req.params.id);
    if (!playlist) return res.status(404).json({ message: "Not Found" });
    // Filter songs belonging to this playlist (dummy logic: matching name)
    const playlistSongs = SONGS.filter(s => s.playList === playlist.name); 
    res.json({ ...playlist, songs: playlistSongs });
});

app.get('/api/albums/:id', (req, res) => {
    const album = ALBUMS.find(a => a.id === req.params.id);
    if (!album) return res.status(404).json({ message: "Not Found" });
    const albumSongs = SONGS.filter(s => s.album === album.name);
    res.json({ ...album, songs: albumSongs });
});

app.get('/api/artists/:id', (req, res) => {
    const artist = ARTISTS.find(a => a.id === req.params.id);
    if (!artist) return res.status(404).json({ message: "Not Found" });
    const artistSongs = SONGS.filter(s => s.artist === artist.name);
    res.json({ ...artist, songs: artistSongs });
});


app.get('/', (req, res) => {
    res.send('Mystify Server is Running');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
