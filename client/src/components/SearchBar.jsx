import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();

    // specific requirement: place search bar on search page.
    // Logic: type -> update state -> update URL

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim()) {
            navigate(`/search/${query}`);
        } else {
            navigate('/search');
        }
    };

    return (
        <input 
            type="text" 
            placeholder="Search artists, songs, podcasts" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
