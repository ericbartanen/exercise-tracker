import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <div className='nav-container'>
            <nav className='App-nav'>
                <Link className='App-nav-button' to='/'>Home</Link>
                <Link className='App-nav-button' to='/create-exercise'>Add New PR</Link>
            </nav>
        </div>
    );
}

export default Navigation; 