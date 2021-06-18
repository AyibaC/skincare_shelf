import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ProductContext } from './../../contexts/productContext';

export default function DeleteModal(id){
    const { getProducts, products, deleteProduct, loaded, isModal, clickModal } = useContext(ProductContext);

    useEffect(() => {
        console.log("in useEffect", products, loaded);
        if (!loaded) {
            getProducts();
            }
        }, [loaded, getProducts, products]);
    console.log('products', products)
    const productToBeDeleted = products.find((product) => product.id === id);
    console.log('product to be deleted' ,productToBeDeleted)

    const active = isModal ? "is-active" : "";

    return (
        <div className={`modal ${active}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <div className="modal-card-body">
                    <p>Are you sure you want to delete this product?</p>
                </div>
                <div className="modal-card-foot">
                    <button className="button is-primary" onClick={() => deleteProduct(id)}>Delete</button>
                    <button className="button is-light" onClick={clickModal}>Cancel</button>
                </div>
            </div>
            <button className="modal-close is-large" onClick={clickModal} aria-label="close"></button>
        </div>
    )
}