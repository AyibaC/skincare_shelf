import React, { useState, createContext, useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

const ENDPOINT = process.env.REACT_APP_ENDPOINT
const PERMANENT_AUTH_TOKEN =  process.env.REACT_APP_PERMANENT_AUTH_TOKEN

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": PERMANENT_AUTH_TOKEN
    };

export const ProductContext = createContext ({
    getProduct: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    clickModal: () => {},
    isModal: false,
    loaded: false,
    loading: false,
    error: null,
    products: [],
    identifier: ""
});

export const ProductProvider = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [identifier, setIdentifier] = useState("");

    const { addToast } = useToasts();

    const getProducts = useCallback(async()=>{
        // if (loading || loaded || error) {
        // return;
        // }

        

        setLoading(true);

        const query = `query Skincares {
            skincares {
                activeIngredient
                brandName
                description
                frequencyOfUse
                id
                keyFeature
                productName
                productType
                timeOfUse
                }
            }
            `

        try{
            const response = await fetch(ENDPOINT,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    query: query
                })
            } )
            if(!response.ok){
                throw response;
            } else {
                const results = await response.json();
                console.log(results.data.skincares);
                localStorage.setItem('products', JSON.stringify(results.data.skincares));
                setProducts(results.data.skincares);
            }
        } catch(err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    },[ setLoading, setLoaded, setProducts, setError] );

    const addProduct = useCallback(async(formData)=>{
        console.log('product to be added', formData);
        // if (loading || loaded || error) {
        //     console.log('loading:', loading, 'loaded:', loaded, "error:", error)
        //     return;
        //     }
    
        setLoading(true);

        const createQuery = `mutation CreateSkincare($data:SkincareCreateInput!){
            createSkincare(data:$data){
                id
                productName
                brandName
                }
            }`

        const publishQuery = `mutation PublishSkincare($where:SkincareWhereUniqueInput!) {
            publishSkincare(where:$where, to: PUBLISHED) {
                id
                productName
                brandName
            }
            }`

        try {
            const response = await fetch(ENDPOINT,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                query: createQuery, 
                variables: {
                    data: formData
                }
            })
            }) 
            if(!response.ok){
                throw response
            } else {
                console.log('Create query successfully run')
                const results = await response.json();
                try{
                    console.log(results.data.createSkincare.id);
                    const publishResponse = await fetch(ENDPOINT,{
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify({
                            query: publishQuery, 
                            variables: {
                                where: {id: results.data.createSkincare.id}
                            }
                        })
                    }) 
                    if(!publishResponse.ok){
                        throw publishResponse
                    } else{
                        console.log(results.data.createSkincare);
                        const newProducts = getProducts();
                        localStorage.setItem('products', newProducts);
                        setProducts(newProducts);
                        //setIsModal(false);
                        addToast(`${results.data.createSkincare.productName} (${results.data.createSkincare.brandName}) successfully added`, {appearance: 'success'});
                    }
                }catch(err){
                        console.log(err);
                        setError(err);
                        addToast('Product not added, please try again.', { appearance: 'error' });
                    }
                
            }
        } catch (err) {
            console.log(err);
            setError(err);
            addToast('Product not added, please try again.', { appearance: 'error' });
        } finally {
            setLoading(false);
            setLoaded(true);
        }
        
    },[setProducts, addToast, getProducts, setLoaded, setLoading, setError])

    const deleteProduct = useCallback(async(ID)=>{
        // if (loading || loaded || error) {
        //     return;
        //     }
    
        setLoading(true);

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
            const response = await fetch(ENDPOINT,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    query: query, 
                    variables: {
                        where: {id: ID}
                    }
                })
            })
            if(!response.ok){
                throw response
            } else {
                const results = await response.json();
                console.log(results.data.deleteSkincare);
                const index = products.findIndex((product) => product.id === ID);
                const deletedProduct = products[index];
                const updatedProducts = [...products.slice(0, index), ...products.slice(index + 1)];
                localStorage.setItem('products', JSON.stringify(updatedProducts));
                setProducts(updatedProducts);
                setIsModal(false);
                addToast(`${deletedProduct.productName} (${deletedProduct.brandName}) successfully deleted`, {appearance: 'success'});
            }
        } catch (err) {
            console.log(err);
            setError('Product not deleted, please try again.', { appearance: 'error' });
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    },[products, setProducts, addToast, setLoaded, setLoading, setError])

    const updateProduct = useCallback(async(id, formData)=>{
        // if (loading || loaded || error) {
        //     return;
        //     };

        console.log('context form data',formData)
    
        setLoading(true);

        const updateQuery = `
        mutation UpdateSkincare($where:SkincareWhereUniqueInput!, $data:SkincareUpdateInput!){
            updateSkincare(where:$where,data:$data){
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

        const publishQuery = `mutation PublishSkincare($where:SkincareWhereUniqueInput!) {
            publishSkincare(where:$where, to: PUBLISHED) {
                id
                productName
                brandName
            }
            }`

        try{
            const response = await fetch(ENDPOINT,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    query: updateQuery, 
                    variables: {
                        where: {id: id},
                        data: formData
                    }
                })
            })
            if(!response.ok){
                const error = await response.json();
                throw error;
            } else {
                const results = await response.json();
                console.log(results.data.updateSkincare);
                const publishResponse = await fetch(ENDPOINT,{
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        query: publishQuery, 
                        variables: {
                            where: {id: results.data.updateSkincare.id}
                        }
                    })
                }) 
                if(!publishResponse.ok){
                    throw publishResponse
                } else{
                    const newProduct = results.data.updateSkincare 
                    const index = products.findIndex((product) => product.id === id);
                    console.log('index', index);
                    const oldProduct = products[index];
                    const newProducts = [...products.slice(0, index), ...products.slice(index + 1)];
                    console.log("new product", newProduct)
                    newProducts.push(newProduct);
                    localStorage.setItem('products', JSON.stringify(newProducts));
                    setProducts(newProducts);
                    addToast(`${oldProduct.productName} (${oldProduct.brandName}) successfully updated`, {appearance: 'success'});
                }
            }
        } catch (err) {
            console.log(err);
            setError(err);
            addToast('Product not updated, please try again.', { appearance: 'error' });
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    },[products, setProducts, addToast, setLoaded, setLoading, setError])

    const clickModal = (e)=>{
        if(e){
            console.log('target', e.currentTarget)
            setIdentifier(e.currentTarget.dataset.productId);
            console.log('click modal identifier', identifier);
        }
        setIsModal(!isModal);
    };

    return (
        <ProductContext.Provider value={{
            getProducts,
            addProduct,
            deleteProduct,
            updateProduct,
            clickModal,
            isModal,
            loading,
            loaded,
            error,
            products,
            identifier
        }}>
            {props.children}
        </ProductContext.Provider>
    )
    }    