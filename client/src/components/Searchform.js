// frontend/src/components/Search/SearchForm.js

import React, { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
