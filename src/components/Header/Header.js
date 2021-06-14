import { NavLink } from 'react-router-dom';

export default function Header(){
    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const navbarBurgers = document.querySelectorAll('.navbar-burger');
    
        // Check if there are any navbar burgers
        if (navbarBurgers.length > 0) {
        
            // Add a click event on each of them
            navbarBurgers.forEach( el => {
                el.addEventListener('click', () => {
        
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
        
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
        
                });
            });
            }
        
        });
    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="#" >
                    <span>Skincare Shelf</span>
                </a>
                <a  role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" id="navMenu">
                <div class="navbar-start">
                    <div class="navbar-item">
                        <NavLink to="/">Home</NavLink> 
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <NavLink to="/add">Add Product</NavLink> 
                    </div>
                </div>
            </div>
        </nav>
    )
}