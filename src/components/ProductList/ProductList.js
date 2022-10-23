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
        products,
        identifier,
        setIdentifier
    } = useContext(ProductContext);

    useEffect(()=>{
        if (!loading && !loaded){
            console.log('fetching products');
            getProducts();
        } else {
            console.log('loading', loading);
            console.log('loaded', loaded);
        }
    }, [products, loading, loaded]);

    if (loading){return (
        <div className="mt-4 is-flex is-justify-content-center">
            <div className="loader is-size-1"></div>
        </div>         
        )} 

    if(products.length===0){
        return (
            <div className="mt-4 is-flex is-justify-content-center">
                <div className="box has-text-centered is-size-4">No products to view</div>
            </div>
            )
    }

    // useEffect(()=>{
    //     clickModal();
    // },[identifier]);

    // if(identifier=""){
    //     return;
    // };

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

    // const handleDelete = (e)=>{
    //     clickModal(e);
    //     clickModal(e);
    // }

    const mouseOver = (e)=>{
        const targetElement = e.target
        const tag = targetElement.querySelector(".tag");
        if(tag){
            tag.classList.remove("is-sr-only");
        }
    }

    const mouseOut = (e)=>{
        const targetElement = e.target
        const tag = targetElement.querySelector(".tag");
        if(tag){
            tag.classList.add("is-sr-only");
        }
    }

    console.log('products data type', typeof(products));

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
                        <div className="card" key={id}>
                            <DeleteModal id={id} />
                            <header className="card-header px-5 has-background-primary-light">
                                <div className="card-title">
                                    <h4 className="is-size-5 has-text-weight-semibold">{brandName}</h4>
                                    <h3 className="is-size-4 has-text-weight-bold">{productName}</h3>
                                </div>
                            </header>
                            <div className="product-ul card-content">
                                <ul>
                                    {productType.length>0 && 
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="flask"/>
                                        {` ${standardiseEnums(productType)} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Product Type</span>
                                    </li>}
                                    {activeIngredient.length>0 && !activeIngredient.includes('') && 
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="eye-dropper"/>
                                        {` ${activeIngredient} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Active Ingredient</span>
                                    </li>}
                                    {keyFeature.length>0 && 
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="cog"/>
                                        {` ${standardiseEnums(keyFeature).join(", ")} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Key Feature</span>
                                    </li>}
                                    {timeOfUse.length>0 &&
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="clock"/>
                                        {` ${standardiseEnums(timeOfUse)} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Time of Use</span>
                                    </li>}
                                    {frequencyOfUse!=="" &&
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="calendar-check" />
                                        {` ${frequencyOfUse} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Frequency of Use</span>
                                    </li>}
                                    {description!=="" &&
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="sticky-note"/>
                                        {` ${description} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Description</span>
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
                                    <a data-product-id={id} className="button is-ghost" onClick={(e)=>clickModal(e)}>
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