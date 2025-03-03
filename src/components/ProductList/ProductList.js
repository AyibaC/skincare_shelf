import React, { useEffect, useContext } from 'react';
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
        loading,
        loaded,
        products,
    } = useContext(ProductContext);

    useEffect(()=>{
        if (!loading && !loaded){
            console.log('fetching products');
            getProducts(`?timestamp=${new Date().getTime()}`);
        } else {
            console.log('loading', loading);
            console.log('loaded', loaded);
        }
    }, [products, loading, loaded, getProducts]);

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
        const transform = {
            'antiAcne': 'Anti-acne',
            'moisturising': 'Moisturising',
            'hydrating': 'Hydrating',
            'sunProtection': 'Sun Protection',
            'evenSkinTone': 'Even Skin Tone',
            'oilControl': 'Oil Control',
            'antiAgeing': 'Anti-ageing',
            'brightening': 'Brightening',
            'exfoliating': 'Exfoliating',
            'cleansing' :'Cleansing',
            'other': 'Other',
            'morning': 'Morning',
            'evening': 'Evening'
        };
        const newArr = []
        for(const item of arr){
            let features = Object.keys(transform);
            features.forEach((feature)=>{
                if(item===feature){
                newArr.push(transform[feature])
                }
            })
            }
            return newArr
        };


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
    console.log('product state: ',products)

    return(
        <div className="columns is-multiline m-3">
            {products.map(({
                activeIngredient,
                brandName,
                description,
                frequencyOfUse,
                id,
                keyFeature,
                productName,
                productType,
                timeOfUse
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
                                    {productType && 
                                        <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                            <FontAwesomeIcon icon="flask"/>
                                            {` ${productType.charAt(0).toUpperCase() + productType.slice(1)} `}
                                            <span className="tag is-primary is-sr-only mr-1" >Product Type</span>
                                        </li>}
                                    {activeIngredient && !activeIngredient.includes('') && 
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
                                        {` ${standardiseEnums(timeOfUse).join(', ')} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Time of Use</span>
                                    </li>}
                                    {frequencyOfUse && frequencyOfUse!=="" &&
                                    <li onMouseOver={mouseOver} onMouseOut={mouseOut}>
                                        <FontAwesomeIcon icon="calendar-check" />
                                        {` ${frequencyOfUse} `}
                                        <span className="tag is-primary is-sr-only mr-1" >Frequency of Use</span>
                                    </li>}
                                    {description && description!=="" &&
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