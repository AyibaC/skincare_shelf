import React, { useEffect, useContext, useState, useCallback } from 'react';
import { ProductContext } from './../../contexts/productContext';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import DeleteModal from './../DeleteModal/DeleteModal';
import './ProductList.css'

export default function ProductList(){
    const {
        getProducts,
        clickModal,
        isModal,
        loading,
        loaded,
        products
    } = useContext(ProductContext);

    useEffect(()=>{
        if (!loading && !loaded){
            console.log('fetching products');
            getProducts();
        } else {
            console.log('loading', loading);
            console.log('loaded', loaded);
        }
    }, [getProducts, products, loading, loaded]);

    if (loading){return <p>Loading...</p>;} //TODO: add spinner

    if(products.length===0){
        return <p>No products to view</p>
    }

    function standardiseEnums(arr){
        const newArr = []
        for (const a of arr){
            const b = a.slice(1)
            switch(b){
                case 'nti_acne':
                case 'nti_ageing': {
                    let c = a.charAt(0).toUpperCase()+ b.replace('_','-');
                    newArr.push(c);
                    break;
                }
                default: {
                    let c = a.charAt(0).toUpperCase()+ b.replace(/_/g,' ');
                    newArr.push(c);
                    break;
                }
            }
        }
        return newArr;
    }

    return(
        <div className="columns is-multiline m-3">
            {products.map(({
                id,
                productName,
                brandName,
                productType,
                activeIngredient,
                keyFeature,
                timeOfUse,
                frequencyOfUse,
                description
            }) => {
                return (
                    <div className="column is-one-third">
                        <DeleteModal key={id+productName} id={id}/>
                        <div className="card" key={id}>
                            <header className="card-header px-5 has-background-primary-light">
                                <div className="card-title">
                                    <h4 className="is-size-5 has-text-weight-semibold">{brandName}</h4>
                                    <h3 className="is-size-4 has-text-weight-bold">{productName}</h3>
                                </div>
                            </header>
                            <div className="product-ul card-content">
                                <ul className="has-text-centered">
                                    {productType.length>0 && 
                                    <li>
                                        <FontAwesomeIcon icon="flask"/>
                                        {` ${standardiseEnums(productType)}`}
                                    </li>}
                                    {activeIngredient.length>0 && 
                                    <li>
                                        <FontAwesomeIcon icon="eye-dropper"/>
                                        {` ${activeIngredient}`}
                                    </li>}
                                    {keyFeature.length>0 && 
                                    <li>
                                        <FontAwesomeIcon icon="cog"/>
                                        {` ${standardiseEnums(keyFeature)}`}
                                    </li>}
                                    {timeOfUse.length>0 &&
                                    <li>
                                        <FontAwesomeIcon icon="clock"/>
                                        {` ${standardiseEnums(timeOfUse)}`}
                                    </li>}
                                    {frequencyOfUse!=="" &&
                                    <li>
                                        <FontAwesomeIcon icon="calendar-check" />
                                        {` ${frequencyOfUse}`}
                                    </li>}
                                    {description!=="" &&
                                    <li>
                                        <FontAwesomeIcon icon="sticky-note"/>
                                        {` ${description}`}
                                    </li>}
                                </ul>
                            </div>
                            <div className="card-footer has-background-link-light">
                                <span className="card-footer-item icon">
                                    <NavLink to={`/${id}`}>
                                        <FontAwesomeIcon icon="edit" title="Edit" />
                                    </NavLink>
                                </span>
                                <span className="card-footer-item icon">
                                    <a className="button is-ghost" onClick={clickModal(id)}>
                                        <FontAwesomeIcon icon="trash-alt" title="Delete" />
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}