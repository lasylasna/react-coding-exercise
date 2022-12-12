import React from 'react';
import { Link } from "react-router-dom";
import Search from './Search';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-inner-container'>
                <Link className="add-btn" to="/add">
                    Add Car
                </Link>
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
}

export default Header
