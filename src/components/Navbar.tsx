import React from 'react';
import { Link } from 'react-router-dom';
import "../style/navbar.scss";

const Navbar: React.FC = () => {

    return (
        <>
            <div className='nav'>
                <Link to={'/allresults'}>All results</Link>
                <Link to={'/'}>Races</Link>
            </div>
        </>
    )
}

export default Navbar;