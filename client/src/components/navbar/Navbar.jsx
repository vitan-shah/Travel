import React, { useContext } from 'react';
import "./navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.svg';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="navbar">
                <div className="navContainer">
                    <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
                        <img src={logo} alt="Logo" className='logo' />
                    </Link>
                    {user ? (
                        <div className='user'>
                            <p>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div className="navItems">
                            <button className="navButton">Register</button>
                            <button className="navButton" onClick={() => navigate('/login')}>Login</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar
