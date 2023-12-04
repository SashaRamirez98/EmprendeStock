import React from "react";
import FormCreateProduct from "../Components/Formulario/FormCreateProduct";

const CreateProduct = () => {
    return(
        <div> 
            <h1 style={{textAlign: 'center', margin: '1%'}}> Ingresar nuevo producto </h1> 
            <FormCreateProduct />
        </div>
        
    );
}

export default CreateProduct;