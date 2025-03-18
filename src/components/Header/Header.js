import { NavLink } from 'react-router-dom';
import React from 'react';
import './Header.css'

export default function Header(){
    const [isActive, setisActive] = React.useState(false);

    return (
        <nav className="navbar has-background-primary-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink className="navbar-item" to="/" >
                    <span className="is-size-2 has-text-primary logo-font" >Skincare Shelf</span>
                </NavLink>
                <a  
                    role="button" 
                    className={`navbar-burger has-text-primary ${isActive ? "is-active" : ""}`}
                    data-target="navMenu" 
                    aria-label="menu" 
                    aria-expanded="false"
                    onClick={() => {
                        setisActive(!isActive);
                }}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${isActive ? "is-active" : ""}`} id="navMenu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <NavLink to="/">Home</NavLink> 
                    </div>
                    <div className="navbar-item">
                        <NavLink to="/add">Add Product</NavLink> 
                    </div>
                </div>
                <div className="navbar-end">
                </div>
            </div>
            <p className='mx-3'>Document all your skincare products so you don't lose track of what you have and what it does</p>
        </nav>
    )
}