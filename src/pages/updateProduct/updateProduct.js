import Header from './../../components/Header/Header';
import ProductForm from "../../components/ProductForm/ProductForm";
import { useParams } from "react-router-dom";
import { ProductContext } from "./../../contexts/productContext";
import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function UpdateProduct(){
    let { id } = useParams();
    console.log('param id', id);
    const {products, getProducts, loaded, loading} = useContext(ProductContext)
    
    useEffect(() => {
        console.log("in useEffect", products, loaded, loading);
        if (!loaded && !loading) {
            getProducts();
            }
        }, [loaded, loading, products]);
    console.log('products', products)
    const productToBeUpdated = products.find((product) => product.id === id);
    console.log('product to be updated' ,productToBeUpdated)

    return (
        <div>
            <Header />
            <div className="px-3 is-flex is-justify-content-space-between">
                <h2 className="has-text-primary is-size-4 has-text-weight-bold	">Edit Product</h2>
                <NavLink to="/">
                    <span><FontAwesomeIcon icon="long-arrow-alt-left"/> Back</span>
                </NavLink>
            </div>
            <ProductForm initialValues={productToBeUpdated} />
        </div>
    )
}