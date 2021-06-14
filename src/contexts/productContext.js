import React, { useState, createContext, useEffect, useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

const graphqlEndpoint = "https://api-eu-central-1.graphcms.com/v2/ckptiv255mjr301xxgonb0u6s/master"

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
    };

export const ProductContext = createContext ({
    getProduct: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    loaded: false,
    loading: false,
    error: null,
    products: []
});

export const ProductProvider = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([])

    useEffect(()=>{

    },[]);

const { addToast } = useToasts();


    const getProducts = useCallback(async()=>{
        if (loading || loaded || error){
            console.log('error', error);
            return;
        } else {
            setLoading(true);
        }

        const query = `query Skincares {
            skincares {
                id
                productName
                brandName
                productType
                activeIngredient
                keyFeature
                timeOfUse
                frequencyOfUse
                description
                }
            }
            `
        const queryObj = { query: query }

        try{
            const response = await fetch(graphqlEndpoint,{
                method: "POST",
                headers: headers,
                body: JSON.stringify(queryObj)
            } )
            if(!response.ok){
                throw response;
            } else {
                const results = await response.json();
                console.log(results.data.skincares);
                localStorage.setItem('products', JSON.stringify(results.data.skincares));
                setProducts(results.data.skincares)
            }
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    },[ setLoading, setLoaded, setProducts, loading, loaded, error] );

    const addProduct = useCallback(async(formData)=>{
        const query = `mutation CreateSkincare($data:SkincareCreateInput!){
            createSkincare(data:$data){
                id
                productName
                brandName
                }
            }`

        try {
            const response = await fetch(graphqlEndpoint,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                query: query, 
                variables: {
                    data: formData
                }
            })
        }) 
        if(!response.ok){
            throw response
        } else {
            const results = await response.json();
            console.log(results.data.createSkincare);
            const newProducts = getProducts();
            localStorage.setItem('products', newProducts);
            setProducts(newProducts);
            addToast(`${results.data.createSkincare.productName} (${results.data.createSkincare.brandName}) successfully deleted`, {appearance: 'success'});
        }
    } catch (err) {
            console.log(err)
        }
    },[setProducts])

    const deleteProduct = useCallback(async(id)=>{
        const query = `
        mutation DeleteSkincare($where:SkincareWhereUniqueInput!){
            deleteSkincare(where:$where){
                id
                productName
                brandName
                }
            }
        `

        try{
            const response = await fetch(graphqlEndpoint,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    query: query, 
                    variables: {
                        data: {id: id}
                    }
                })
            })
            if(!response.ok){
                throw response
            } else {
                const results = await response.json();
                console.log(results.data.deleteSkincare);
                const index = products.findIndex((product) => product._id === id);
                const deletedProduct = products[index];
                const updatedProducts = [...products.slice(0, index), ...products.slice(index + 1)];
                localStorage.setItem('products', JSON.stringify(updatedProducts));
                setProducts(updatedProducts);
                addToast(`${deletedProduct.productName} (${deletedProduct.brandName}) successfully deleted`, {appearance: 'success'});
            }
        } catch (err) {
            console.log(err)
        }
    },[products, setProducts])

    return (
        <ProductContext.Provider value={{
            getProducts,
            addProduct,
            deleteProduct,
            loading,
            loaded,
            error,
            products
        }}>
            {props.children}
        </ProductContext.Provider>
    )
    }    