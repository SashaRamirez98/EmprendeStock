import React from "react";
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';
import './Modal.css'

const Modal = (props) => {

    const initialValues = {
        name: props.item.name || '',
        code: props.item.code || '',
        description: props.item.description || '',
        image: props.item.image || '',
        stock: props.item.stock || '',
        price: props.item.price || ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Nombre demasiado corto')
            .max(25, 'Nombre demasiado largo')
            .required('Este campo es obligatorio.'),
        code: Yup.number().required('Este campo es obligatorio'),
        description: Yup.string()
            .min(10, 'Descripción demasiado corta')
            .max(150, 'Descripción demasiado larga')
            .required('Este campo es obligatorio.'),
        image: Yup.string().required('Este campo es obligatorio'),
        stock: Yup.number().required('Este campo es obligatorio'),
        price: Yup.number().required('Este campo es obligatorio')
    })

    return(
        <ModalBs
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBs.Header closeButton className="bg-dark">
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Editar producto
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className="bg-dark">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={ async (values, { setSubmitting }) => {
                        console.log(values);
                        await props.onSubmit(props.item.id, values)
                        setSubmitting(false);
                        props.onHide()
                    }}
                >
                    {({ values, errors, isSubmitting, touched, handleChange }) => (
                        <Form>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='name'>Nombre del producto</label>
                                <Field id='name' type='text' placeholder='Remera Blanca' name='name'
                                className='form-control field-input' style={{ color: 'black' }} onChange={handleChange} />
                                {errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )}
                            </FormBs.Group>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='code'>Código</label>
                                <Field id='code' type='text' placeholder='1234' name='code'
                                className='form-control field-input' style={{ color: 'black' }} onChange={handleChange} />
                                {errors.code && touched.code && (
                                    <ErrorMessage name='code' component='div'></ErrorMessage>
                                )}
                            </FormBs.Group>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='description'>Descripción</label>
                                <Field id='description' type='text' placeholder='Remera cuello redondo talle S de algodón' name='description'
                                className='form-control field-input' style={{ color: 'black' }} onChange={handleChange} />
                                {errors.description && touched.description && (
                                    <ErrorMessage name='description' component='div'></ErrorMessage>
                                )}
                            </FormBs.Group>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='image'>Imagen</label>
                                <Field id='image' type='text' placeholder='URL de la imagen' name='image'
                                className='form-control field-input' style={{ color: 'black' }} onChange={handleChange} />
                                {errors.image && touched.image && (
                                    <ErrorMessage name='image' component='div'></ErrorMessage>
                                )}
                            </FormBs.Group>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='stock'>Stock disponible</label>
                                <Field id='stock' type='text' placeholder='25' name='stock'
                                className='form-control field-input' style={{ color: 'black' }} onChange={handleChange} />
                                {errors.stock && touched.stock && (
                                    <ErrorMessage name='stock' component='div'></ErrorMessage>
                                )}
                            </FormBs.Group>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='price'>Precio</label>
                                <Field id='price' type='text' placeholder='25.000' name='price'
                                className='form-control field-input' style={{ color: 'black' }} onChange={handleChange} />
                                {errors.price && touched.price && (
                                    <ErrorMessage name='price' component='div'></ErrorMessage>
                                )}
                            </FormBs.Group>

                            <Button className="btn btn-primary" type='submit'> Editar Producto </Button>
                            {
                                isSubmitting ? (<p>Editando producto...</p>) : null
                            }
                        </Form>
                    )
                    }

                </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className="bg-dark">
                <Button onClick={props.onHide}>Close</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
}

export default Modal;