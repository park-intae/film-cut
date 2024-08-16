import React, { useState } from 'react';

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
        <form onSubmit={searchHandeler}>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='검색어를 입력해주세요'
            />
        </form>
    );
};

export default SearchBox;