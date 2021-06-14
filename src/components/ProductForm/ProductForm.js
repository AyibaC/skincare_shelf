import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ProductContext } from './../../contexts/productContext';

export default function ProductForm(){
    const { addProduct } = useContext(ProductContext);
    const [populated, setPopulated] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (formValues)=>{
        console.log('form values', formValues);
        //turn key features into array
        const keyFeatureObj = formValues.keyFeature;
        const keyFeatureArr = [];
        for (const f in keyFeatureObj){
            if(keyFeatureObj[f]===true){
                keyFeatureArr.push(f)
            }
        }
        //turn time of use into array
        const timeObj = formValues.timeOfUse;
        const timeArr = [];
        for (const t in timeObj){
            if(timeObj[t]===true){
                timeArr.push(t)
            }
        }
        //turn active ingredient into array
        const active = formValues.activeIngredient;
        const activeArr = [];
        activeArr.push(active);

        //turn product type into array
        const type = formValues.productType;
        const typeArr = [];
        typeArr.push(type);

        formValues = {
                ...formValues,
                keyFeature: keyFeatureArr,
                timeOfUse: timeArr,
                activeIngredient: activeArr,
                productType: typeArr
        };
        console.log("updated form values", formValues);

        addProduct(formValues);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="field">
                <label class="label" for="productName">Product Name</label>
                <div class="control">
                    <input class="input" type="text" name="productName" id="productName" {...register("productName")} />
                </div>
            </div>
            <div class="field">
                <label class="label" for="brandName">Brand Name</label>
                <div class="control">
                    <input class="input" type="text" name="brandName" id="brandName" {...register("brandName")} />
                </div>
            </div>
            <div class="field">
                <label class="label" for="productType">Product Type</label>
                <span class="select">
                    <select name="productType" id="productType" {...register("productType")}>
                        <option>Select product type</option>
                        <option value="serum">Serum</option>
                        <option value="moisturiser">Moisturiser</option>
                        <option value="cleanser">Cleanser</option>
                        <option value="sun_protection">Sun Protection</option>
                        <option value="treatment">Treatment</option>
                        <option value="oil">Oil</option>
                        <option value="mask">Mask</option>
                        <option value="eye_cream">Eye Cream</option>
                        <option value="toner">Toner</option>
                        <option value="essence">Essence</option>
                        <option value="other">Other</option>
                    </select>
                </span>
            </div>
            <div class="field">
                <label class="label" for="activeIngredient">Active Ingredient(s)</label>
                <div class="control">
                    <input class="input" type="text" name="activeIngredient" id="activeIngredient" {...register("activeIngredient")}/> 
                </div>
            </div>
            <div class="field">
                <label class="label" for="keyFeature">Key Feature(s)</label>
                <div class="control" name="keyFeature" id="keyFeature">
                        <label class="checkbox" for="anti_acne"><input type="checkbox" name="anti_acne" id="anti_acne" {...register("keyFeature.anti_acne")}/>Anti-acne</label>
                        <label class="checkbox" for="moisturising"><input type="checkbox" name="moisturising" id="moisturising" {...register("keyFeature.moisturising")}/>Moisturising</label>
                        <label class="checkbox" for="hydrating"><input type="checkbox" name="hydrating" id="hydrating" {...register("keyFeature.hydrating")}/>Hydrating</label>
                        <label class="checkbox" for="sun_protection"><input type="checkbox" name="sun_protection" id="sun_protection" {...register("keyFeature.sun_protection")}/>Sun Protection</label>
                        <label class="checkbox" for="even_skin_tone"><input type="checkbox" name="even_skin_tone" id="even_skin_tone" {...register("keyFeature.even_skin_tone")}/>Even Skin Tone</label>
                        <label class="checkbox" for="oil_control"><input type="checkbox" name="oil_control" id="oil_control" {...register("keyFeature.oil_control")}/>Oil Control</label>
                        <label class="checkbox" for="anti_ageing"><input type="checkbox" name="anti_ageing" id="anti_ageing" {...register("keyFeature.anti_ageing")}/>Anti-ageing</label>
                        <label class="checkbox" for="brightening"><input type="checkbox" name="brightening" id="brightening" {...register("keyFeature.brightening")}/>Brightening</label>
                        <label class="checkbox" for="exfoliating"><input type="checkbox" name="exfoliating" id="exfoliating" {...register("keyFeature.exfoliating")}/>Exfoliating</label>
                        <label class="checkbox" for="cleansing"><input type="checkbox" name="cleansing" id="cleansing" {...register("keyFeature.cleansing")}/>Cleansing</label>
                        <label class="checkbox" for="other"><input type="checkbox" name="other" id="other"/>Other</label>
                </div>
            </div>
            <div class="field">
                <label class="label" for="timeOfUse">Time of Use</label>
                <div class="control" name="timeofUse" id="timeOfUse" >
                    <label class="checkbox" for="morning"><input type="checkbox" name="morning" id="morning" {...register("timeOfUse.morning")}/>Morning</label>
                    <label class="checkbox" for="evening"><input type="checkbox" name="evening" id="evening" {...register("timeOfUse.evening")}/>Evening</label>
                </div>
            </div>
            <div class="field">
                <label class="label" for="frequencyOfUse">Frequency of Use</label>
                <div class="control">
                    <input class="input" type="text" name="frequencyOfUse" id="frequencyOfUse" {...register("frequencyOfUse")}/> 
                </div>
                <p class="help">Every day? Every other day? Switch on for four weeks then off for two?</p>
            </div>
            <div class="field">
                <label class="label" for="description">Description</label>
                <div class="control">
                    <textarea class="textarea" name="description" id="description" {...register("description")} placeholder="Use this space to for a description of the product or to leave comments"></textarea>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" type="submit">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light" type="reset" onClick={() => reset()}>Refresh</button>
                </div>
            </div>
        </form>
    )
}