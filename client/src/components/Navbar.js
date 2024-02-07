// frontend/src/components/Navbar/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/search">Search</Link></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;
