import './ProductForm.css'
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from './../../contexts/productContext';
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";


export function populationData(data){

    const keyFeatureObj = {
        "antiAcne": false,
        "moisturising": false,
        "hydrating": false,
        "sunProtection": false,
        "evenSkinTone": false,
        "oilControl": false,
        "antiAgeing": false,
        "brightening": false,
        "exfoliating": false,
        "cleansing": false,
        "other": false,
    }
        
    for (const k of data.keyFeature){
        if (k in keyFeatureObj) {
            keyFeatureObj[k] = true
        }
    }

    const timeObj = {
        "morning": false,
        "evening": false
    }

    for (const t of data.timeOfUse){
        if (t in timeObj) {
            timeObj[t] = true
        }
    }

    data = {
        ...data,
        // productType: productTypeObj,
        keyFeature: keyFeatureObj,
        timeOfUse: timeObj
    }

    console.log('data for populating form' ,data)
    return data;
}

const schema = yup.object().shape({
    productName: yup.string().required('Product name required'),
    brandName: yup.string().required()
});

export default function ProductForm( {initialValues} ){
    const { addProduct, updateProduct, loading } = useContext(ProductContext);
    const [populated, setPopulated] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
    }); 
    let { id } = useParams();

    console.log('loading state', loading);

    // const { isDirty, isValid } = formState;
    // console.log('formState', formState);
    // console.log('errors', formState.errors);

    // console.log('initial values', initialValues);

    if (initialValues && !populated) {
        reset({
            ...populationData(initialValues),
        });
        setPopulated(true);
    }

    const onSubmit = async (formValues)=>{
        // const loaderWrapper = document.querySelector('.loader-wrapper');
        // loaderWrapper.classList.add('is-active');
        console.log('form values', formValues);

        function transformFormData(formData){
            //turn key features into array
            const keyFeatureArr = [];
            if(formData.keyFeature){
                const KFObj = formData.keyFeature;
                for (const f in KFObj){
                    if(KFObj[f]===true){
                        keyFeatureArr.push(f)
                    }
                }
            };

            //turn time of use into array
            const timeArr = [];
            if(formData.timeOfUse){
                const TObj = formData.timeOfUse;
                for (const t in TObj){
                    if(TObj[t]===true){
                        timeArr.push(t)
                    }
                }
            };

            //turn active ingredient into array
            // const activeArr = []
            // if(formData.activeIngredient){
            //     const active = formData.activeIngredient;
            //     console.log('active',active);
            //     const activeSplit = active.split(',');
            //     activeArr.push(...activeSplit);
            // };

            //turn product type into array
            // const typeArr = [];
            // if(formData.productType){
            //     const type = formData.productType;
            //     typeArr.push(type);
            // };

            formData = {
                    ...formData,
                    keyFeature: keyFeatureArr,
                    timeOfUse: timeArr,
                    // activeIngredient: activeArr,
            };
            console.log("updated form values", formData);
            return formData;
        };


        if(populated){
            let updates = {};
            console.log('initial values', initialValues);
            for (const key in initialValues) {
                console.log('key', key);
                if (initialValues.hasOwnProperty(key)) {
                    if (initialValues[key] !== formValues[key] && key[0] !== "_") {
                        updates[key] = formValues[key];
                    }
                }
            }
            updates = transformFormData(updates);
            console.log("updates", updates);
            updateProduct(id, updates);
        } else {
            addProduct(transformFormData(formValues));
        }

        // loaderWrapper.classList.remove('is-active');
}
        
        // let i = 1;
        // const addInput = (e)=>{
        //     e.preventDefault();
        //     const targetElement = e.target;
        //     const div = targetElement.parentElement;
        //     const control = div.parentElement;
        //     // const input = '<input className="input" type="text" name="activeIngredient" id={`activeIngredient`} {...register("activeIngredient.0")}/>'
        //     // control.innerHTML = input
        //     const input = document.createElement('input');
        //     input.classList.add('input');
        //     input.setAttribute("type", "text");
        //     input.setAttribute("name", "activeIngredient.0");
        //     input.setAttribute("id", `activeIngredient_${i}`);
        //     // input.setAttribute(`${{...register("activeIngredient.0")}}`, "");
        //     control.appendChild(input);
        //     // // input.outerHTML = `<input className="input" type="text" name="activeIngredient" id="activeIngredient" ...register("activeIngredient.0")>`
        //     console.log('input', input);
        //     i++;
        // }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="column is-half is-offset-one-quarter">
            <div className="field">
                <label className="label" htmlFor="productName">Product Name</label>
                <div className="control">
                    {formState.errors.productName ? 
                        <input className="input is-danger" type="text" name="productName" id="productName" {...register("productName", {
                        required: "No product name entered"
                    })}  /> : 
                    <input className="input" type="text" name="productName" id="productName" {...register("productName", {
                        required: "No product name entered"
                    })}  />}
                    {formState.errors.productName && <p className="help is-danger">Please enter a product name</p>}
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="brandName">Brand Name</label>
                <div className="control">
                    {formState.errors.brandName?
                    <input className="input is-danger" type="text" name="brandName" id="brandName" {...register("brandName", {
                        required: "No brand name entered"
                    })} />:
                    <input className="input" type="text" name="brandName" id="brandName" {...register("brandName", {
                        required: "No brand name entered"
                    })} />}
                    {formState.errors.brandName && <p className="help is-danger">Please enter a brand name</p>}
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="productType">Product Type</label>
                <span className="select">
                    <select name="productType" id="productType" {...register("productType", {required: "No product type entered"})}>
                        <option value="">Select product type</option>
                        <option value="serum">Serum</option>
                        <option value="moisturiser">Moisturiser</option>
                        <option value="cleanser">Cleanser</option>
                        <option value="sunProtection">Sun Protection</option>
                        <option value="treatment">Treatment</option>
                        <option value="oil">Oil</option>
                        <option value="mask">Mask</option>
                        <option value="eyeCream">Eye Cream</option>
                        <option value="toner">Toner</option>
                        <option value="essence">Essence</option>
                        <option value="other">Other</option>
                    </select>
                </span>
            </div>
            <div className="field">
                <label className="label" htmlFor="activeIngredient">Active Ingredient</label>
                <div className="control" >
                    <div className="is-flex">
                        <input className="input" type="text" name="activeIngredient" id="activeIngredient" {...register("activeIngredient")}/> 
                        {/* <button className="ml-1" title="Add another" onClick={addInput}>+</button> */}
                    </div>
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="keyFeature">Key Feature(s)</label>
                <div className="control is-flex is-flex-wrap-wrap is-justify-content-start" name="keyFeature" id="keyFeature">
                        <label className="checkbox pl-2" htmlFor="anti_acne"><input type="checkbox" name="anti_acne" id="anti_acne" {...register("keyFeature.antiAcne")}/> Anti-acne</label>
                        <label className="checkbox pl-2" htmlFor="moisturising"><input type="checkbox" name="moisturising" id="moisturising" {...register("keyFeature.moisturising")}/> Moisturising</label>
                        <label className="checkbox pl-2" htmlFor="hydrating"><input type="checkbox" name="hydrating" id="hydrating" {...register("keyFeature.hydrating")}/> Hydrating</label>
                        <label className="checkbox pl-2" htmlFor="sun_protection"><input type="checkbox" name="sun_protection" id="sun_protection" {...register("keyFeature.sunProtection")}/> Sun Protection</label>
                        <label className="checkbox pl-2" htmlFor="even_skin_tone"><input type="checkbox" name="even_skin_tone" id="even_skin_tone" {...register("keyFeature.evenSkinTone")}/> Even Skin Tone</label>
                        <label className="checkbox pl-2" htmlFor="oil_control"><input type="checkbox" name="oil_control" id="oil_control" {...register("keyFeature.oilControl")}/> Oil Control</label>
                        <label className="checkbox pl-2" htmlFor="anti_ageing"><input type="checkbox" name="anti_ageing" id="anti_ageing" {...register("keyFeature.antiAgeing")}/> Anti-ageing</label>
                        <label className="checkbox pl-2" htmlFor="brightening"><input type="checkbox" name="brightening" id="brightening" {...register("keyFeature.brightening")}/> Brightening</label>
                        <label className="checkbox pl-2" htmlFor="exfoliating"><input type="checkbox" name="exfoliating" id="exfoliating" {...register("keyFeature.exfoliating")}/> Exfoliating</label>
                        <label className="checkbox pl-2" htmlFor="cleansing"><input type="checkbox" name="cleansing" id="cleansing" {...register("keyFeature.cleansing")}/> Cleansing</label>
                        <label className="checkbox pl-2" htmlFor="other"><input type="checkbox" name="other" id="other" {...register("keyFeature.other")}/> Other</label>
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="timeOfUse">Time of Use</label>
                <div className="control is-flex is-flex-wrap-wrap is-justify-content-start" name="timeofUse" id="timeOfUse" >
                    <label className="checkbox pl-2" htmlFor="morning"><input type="checkbox" name="morning" id="morning" {...register("timeOfUse.morning")}/> Morning</label>
                    <label className="checkbox pl-2" htmlFor="evening"><input type="checkbox" name="evening" id="evening" {...register("timeOfUse.evening")}/> Evening</label>
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="frequencyOfUse">Frequency of Use</label>
                <div className="control">
                    <input className="input" type="text" name="frequencyOfUse" id="frequencyOfUse" {...register("frequencyOfUse")} />
                </div>
                <p className="help">Every day? Every other day? Switch on for four weeks then off for two? How often do you use this product?</p>
            </div>
            <div className="field">
                <label className="label" htmlFor="description">Description</label>
                <div className="control">
                    <textarea className="textarea" name="description" id="description" {...register("description")} placeholder="Use this space to for a description of the product or to leave comments"></textarea>
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" type="submit" >{populated ? "Update" : "Add"} Product</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" type="reset" onClick={() => reset()}>Refresh</button>
                </div>
                <div className={`loader-wrapper ${loading ? "is-loading" : ""}`}>
                    <div className="loader is-size-2"></div>
                </div>
            </div>
        </form>
    )
}