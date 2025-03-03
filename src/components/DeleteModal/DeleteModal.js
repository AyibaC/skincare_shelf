import React, { useContext, useEffect} from 'react';
import { ProductContext } from './../../contexts/productContext';

export default function DeleteModal(){

    const { getProducts, products, deleteProduct, loaded, loading, isModal, clickModal, identifier } = useContext(ProductContext);

    useEffect(() => {
        if (!loaded && !loading) {
            getProducts();
            } 
        }, [loaded, getProducts, products, loading]);

    const productToBeDeleted = products.find((product) => product.id === identifier);
    console.log('product to be deleted' ,productToBeDeleted);

    const active = isModal ? "is-active" : "";

    return (
        <div className={`modal ${active}`}>
            <div className="modal-background" onClick={clickModal}></div>
            <div className="modal-card">
                <div className="modal-card-body">
                    <p>Are you sure you want to delete this product?</p>
                </div>
                <div className="modal-card-foot">
                    <button className="button is-primary" onClick={()=>deleteProduct(identifier)}>Delete</button>
                    <button className="button is-light" onClick={clickModal}>Cancel</button>
                </div>
            </div>
            <button className="modal-close is-large" onClick={clickModal} aria-label="close"></button>
        </div>
    )
}