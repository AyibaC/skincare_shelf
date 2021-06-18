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
    clickModal: () => {},
    isModal: false,
    loaded: false,
    loading: false,
    error: null,
    products: []
});

export const ProductProvider = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isModal, setIsModal] = useState(false);

    const { addToast } = useToasts();

    const getProducts = useCallback(async()=>{
        if (loading || loaded || error) {
        return;
        }

        setLoading();

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
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    },[ setLoading, setLoaded, setProducts, setError, loading, loaded, error] );

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
            addToast(`${results.data.createSkincare.productName} (${results.data.createSkincare.brandName}) successfully added`, {appearance: 'success'});
        }
    } catch (err) {
            const e = err.body
            console.log(e);
        }
    },[setProducts, addToast, getProducts])

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
                        where: {id: id}
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
                setIsModal(false);
                addToast(`${deletedProduct.productName} (${deletedProduct.brandName}) successfully deleted`, {appearance: 'success'});
            }
        } catch (err) {
            console.log(err)
        }
    },[products, setProducts, addToast])

    const updateProduct = useCallback(async(id, formData)=>{
        const query = `
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
        try{
            const response = await fetch(graphqlEndpoint,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    query: query, 
                    variables: {
                        where: {id: id},
                        data: formData
                    }
                })
            })
            if(!response.ok){
                throw response;
            } else {
                const results = await response.json();
                console.log(results.data.updateSkincare);
                const newProduct = results.data.updateSkincare 
                const index = products.findIndex((product) => product._id === id);
                const oldProduct = products[index];
                const newProducts = [...products.slice(0, index), ...products.slice(index + 1)];
                newProducts.push(newProduct);
                localStorage.setItem('products', JSON.stringify(newProducts));
                setProducts(newProducts);
                addToast(`${oldProduct.productName} (${oldProduct.brandName}) successfully updated`, {appearance: 'success'});
            }
        } catch(err) {
            console.log(err)
        }
    },[products, setProducts, addToast])

    const clickModal = () => {
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
            products
        }}>
            {props.children}
        </ProductContext.Provider>
    )
    }    