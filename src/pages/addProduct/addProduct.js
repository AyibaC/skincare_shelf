import Header from '../../components/Header/Header.js';
import ProductForm from './../../components/ProductForm/ProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function AddProduct(){
    return(
        <div>
            <Header />
            <div className="px-3 is-flex is-justify-content-space-between">
                <h2 className="has-text-primary is-size-4 has-text-weight-bold	">Add Product</h2>
                <NavLink to="/">
                    <span><FontAwesomeIcon icon="long-arrow-alt-left"/> Back</span>
                </NavLink>
            </div>
            <ProductForm />
        </div>
    ) 
}