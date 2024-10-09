import React, { useState } from 'react';
import styles from './css/SearchBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {
    const [query, setQuery] = useState('');

    const searchHandeler = (e) => {
        e.preventDefault();
        if (query.trim()) {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = googleSearchUrl;
        }
    };

    return (
        <form className={styles.searchForm} onSubmit={searchHandeler}>
            <div className={styles.box}>
                <input
                    className={styles.searchBox}
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='검색어를 입력해주세요'
                />
                <button className={styles.circle}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
        </form>
    );
};

export default SearchBox;