import React, { useEffect, useContext} from 'react';
import { ProductContext } from './../../contexts/productContext'

export default function ProductList(){
    const {
        getProducts,
        loading,
        loaded,
        error,
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

    return(
        <div>
            {products.forEach(({
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
                <div class="card" key={id}>
                    <header class="card-header">
                        <h4>{brandName}</h4>
                        <h3>{productName}</h3>
                    </header>
                    <div class="card-content">
                        <ul>
                            <li>{productType}</li>
                            <li>{activeIngredient}</li>
                            <li>{keyFeature}</li>
                            <li>{timeOfUse}</li>
                            <li>{frequencyOfUse}</li>
                            <li>{description}</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <span class="card-footer-item icon">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span class="card-footer-item icon">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                    </div>
                </div>
                )
            })}
        </div>
    )
}