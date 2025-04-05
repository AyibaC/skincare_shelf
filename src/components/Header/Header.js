import { NavLink } from 'react-router-dom';
import React, {useState} from 'react';
import './Header.css';

export default function Header(){
    const [isActive, setisActive] = React.useState(false);
    // const [hidden, setHidden] = useState(()=>{
    //         return localStorage.getItem("welcomeMessageHidden") === "true";
    //     });

    // const handleOpenWelcome = ()=>{
    //     setHidden(false);
    //     localStorage.setItem("welcomeMessageHidden", "false");

    //     console.log('hidden: ', hidden);
    //     console.log('local storage hidden: ',localStorage.getItem("welcomeMessageHidden") );
    // }; 

    const [hidden, setHidden] = useState(true)
    
    const handleOpenWelcome = ()=>{
        setHidden(!hidden);
        setisActive(!isActive);

        console.log('hidden: ', hidden);
    };
    
    const handleCloseMessage = ()=>{
        setHidden(true);

        console.log('hidden: ', hidden);
    };

    return (
        <div>
            <nav className="navbar has-background-primary-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to="/" >
                        <span className="is-size-2 has-text-primary logo-font" >Skincare Shelf</span>
                    </NavLink>
                    <a  
                        role="button" 
                        className={`navbar-burger link-primary ${isActive ? "is-active" : ""}`}
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
                <div className={`navbar-menu has-background-primary-light ${isActive ? "is-active" : ""}`} id="navMenu">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            <NavLink onClick={() => {setisActive(!isActive)}} to="/">Home</NavLink> 
                        </div>
                        <div className="navbar-item">
                            <NavLink onClick={() => {setisActive(!isActive)}} to="/add">Add Product</NavLink> 
                        </div>
                        <div className="navbar-item">
                            <button className="button is-ghost p-0" onClick={handleOpenWelcome} id="help-button">Help</button>
                        </div>
                    </div>
                    <div className="navbar-end">
                    </div>
                </div>
                <p className='mx-3'>Document all your skincare products so you don't lose track of what you have and what it does</p>
            </nav>
            <article className={`message is-dark mx-6 is-dark ${hidden?"is-hidden":""}`} id="help-message">
                <div className="message-header">
                    <p>Welcome</p>
                    <button className="delete" onClick={handleCloseMessage} aria-label="delete"></button>
                </div>
                <div className="message-body">
                <p>Skincare shelf is a CRUD app bootsrapped with create react app designed to help skincare junkies keep track of what's in their collection. Each card represents a product with the brand name followed by the product name in the header. Information held in the card includes:</p> 
                <br /><ul>
                    <li>Product Type - e.g. serum, moisturiser</li>
                    <li>Active Ingredient - e.g. hyaluronic acid, niacinamide</li>
                    <li>Key Features - what the product does for the skin e.g. exfoliating, anti-ageing</li>
                    <li>Time of Use - morning or evening</li>
                    <li>Frequency of Use - e.g. every day, once a week</li> 
                    <li>Description - a free text box for anything else the user wants to remind themself about the product</li> 
                </ul><br />
                <p>Brand Name, Product Name and Frequency of Use are required, all other options are optional.
                <br />To add a product, navigate to the Add Product page via the menu in the header and fill out the form. To update or delete a product, use the icons in the footer of the product card you wish to edit.</p> 
                </div>
            </article>
        </div>
    )
}