import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from "../../assets/assets";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem(token);
        setToken(null); // Clear token on logout
        Navigate("/");
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                            <hr />
                            <li onClick={handleLogout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
