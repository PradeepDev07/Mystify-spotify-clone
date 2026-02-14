import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { PlayerProvider } from './context/PlayerContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CollectionPage from './pages/CollectionPage';
import SearchPage from './pages/SearchPage';
import Player from './components/Player';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

const MainLayout = () => {
    return (
        <div className="app-main" style={{backgroundColor: '#000000'}}> {/* Ensure black background */}
            <Navbar />
            <div className="content-wrapper" style={{display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden', gap: '8px', padding: '8px'}}>
                <Sidebar />
                <div style={{flex: 1, overflowY: 'auto', background: 'linear-gradient(to bottom, #202020, #121212)', position: 'relative', borderRadius: '8px'}}>
                    <Outlet />
                </div>
            </div>
            <Player />
        </div>
    );
};

const App = () => {
  return (
    <SearchProvider>
      <PlayerProvider>
        <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/playlist/:id" element={<CollectionPage type="playlist" />} />
                  <Route path="/album/:id" element={<CollectionPage type="album" />} />
                  <Route path="/artist/:id" element={<CollectionPage type="artist" />} />
                  <Route path="/search/:query" element={<SearchPage />} />
                  <Route path="/search" element={<SearchPage />} />
              </Route>
              
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
      </PlayerProvider>
    </SearchProvider>
  );
};


export default App;
