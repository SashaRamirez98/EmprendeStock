import React from "react";
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './FormCreateProduct.css'
import { axiosInstance } from "../../services/axios.config";

const FormCreateProduct = () => {

    const initialValues = {
        name: '',
        code: '',
        // description: '',
        stock: '',
        price: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre demasiado corto')
            .max(25, 'Nombre demasiado largo')
            .required('Este campo es obligatorio.'),
        code: Yup.number().required('Este campo es obligatorio'),
        // description: Yup.string()
        //     .min(10, 'Descripción demasiado corta')
        //     .max(150, 'Descripción demasiado larga')
        //     .required('Este campo es obligatorio.'),
        stock: Yup.number().required('Este campo es obligatorio'),
        price: Yup.number().required('Este campo es obligatorio')
    })


    return (
        <div className="container">
            <Formik
                initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit ={(values, {setSubmitting}) => {
                    console.log(values);
                    axiosInstance.post('/', values)
                    .then(r => {
                        if (r.status == 201) {
                            console.log(r)
                            setSubmitting(false)
                        } else{
                            throw new Error (`[${r.status}]Error en la solicitud`)
                        }
                    })
                    .catch( err => console.log(err))
                }}
            >
                {({ values, errors, isSubmitting, touched }) => ( 
                    <Form>
                        <FormBs.Group className="mb-3">
                            <label htmlFor='name'>Nombre del producto</label>
                            <Field id='name' type='text' placeholder='Remera Blanca' name='name' className='form-control field-input' style={{ color: 'black' }} />
                            {errors.name && touched.name && (
                                <ErrorMessage name='name' component='div'></ErrorMessage>
                            )}
                        </FormBs.Group>
                        <FormBs.Group className="mb-3">
                            <label htmlFor='code'>Código</label>
                            <Field id='code' type='text' placeholder='1234' name='code' className='form-control field-input' style={{ color: 'black' }} />
                            {errors.code && touched.code && (
                                <ErrorMessage name='code' component='div'></ErrorMessage>
                            )}
                        </FormBs.Group>
                        {/* <FormBs.Group className="mb-3">
                            <label htmlFor='description'>Descripción</label>
                            <Field id='description' type='text' placeholder='Remera cuello redondo talle S de algodón' name='description' className='form-control field-input' style={{ color: 'black' }} />
                            {errors.description && touched.description && (
                                <ErrorMessage name='description' component='div'></ErrorMessage>
                            )}
                        </FormBs.Group> */}
                        <FormBs.Group className="mb-3">
                            <label htmlFor='stock'>Stock disponible</label>
                            <Field id='stock' type='text' placeholder='25' name='stock' className='form-control field-input' style={{ color: 'black' }} />
                            {errors.stock && touched.stock && (
                                <ErrorMessage name='stock' component='div'></ErrorMessage>
                            )}
                        </FormBs.Group>
                        <FormBs.Group className="mb-3">
                            <label htmlFor='price'>Precio</label>
                            <Field id='price' type='text' placeholder='25.000' name='price' className='form-control field-input' style={{ color: 'black' }} />
                            {errors.price && touched.price && (
                                <ErrorMessage name='price' component='div'></ErrorMessage>
                            )}
                        </FormBs.Group>

                            <Button className="btn btn-primary" type='submit'> Cargar Producto </Button>
                            {
                                isSubmitting ? (<p>Cargando nuevo producto...</p>) : null
                            }
                    </Form>
                )
                }

            </Formik>
        </div>
    );
}

export default FormCreateProduct;