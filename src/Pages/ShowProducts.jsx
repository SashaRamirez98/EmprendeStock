import React, { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import Table from "../Components/Table/Table";
import Form from 'react-bootstrap/Form';

const ShowProducts = () => {

    const [items, setItems] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axiosInstance.get('/')
        .then(r => {
            if( r.status === 200){
                setItems(r.data)
            }else{
                throw new Error(`[${r.status}]Error en la solicitud1`)
            }
        })
        .catch(err => console.log(err))
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/`);
            setItems(response.data);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const editItem = (id, data) => {
        console.log('editando producto');
        axiosInstance.put(`/${id}`, data)
        .then(r => {
            if (r.status === 200) {
                // Actualizar items directamente con los datos editados
                const updatedItems = items.map(item => {
                    if (item.id === id) {
                        return { ...item, ...data }; // Actualizar los datos del elemento editado
                    }
                    return item;
                });
                setItems(updatedItems); // Actualizar el estado local con los datos editados
                setSearchResults(updatedItems); // Actualizar también los resultados de búsqueda
            } else {
                throw new Error([`Error ${r.status} en la solicitud`])
            }
        })
        .catch(err => console.log(err));
    };
    
    const handleDelete = (id) => {
        axiosInstance.delete(`/${id}`)
        .then(r => {
            if (r.status === 200) {
                // Eliminar el elemento de items directamente
                const updatedItems = items.filter(item => item.id !== id);
                setItems(updatedItems); // Actualizar el estado local sin el elemento eliminado
                setSearchResults(updatedItems); // Actualizar también los resultados de búsqueda
            }
        })
        .catch(error => {
            console.error('Error al eliminar el elemento:', error);
        });
    };

 
//Buscador del search
      useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchValue);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    const handleSearch = async (searchValue) => {
        try {
            const response = await axiosInstance.get(`/`);
            const data = response.data;

            // Convertir el valor de búsqueda a minúsculas
            const searchValueLower = searchValue.toLowerCase();

            // Filtrar los resultados basados en la búsqueda insensible a mayúsculas y minúsculas
            const filteredData = data.filter(
                (product) =>
                    (typeof product.code === 'string' && product.code.toLowerCase().includes(searchValueLower)) ||
                    (typeof product.name === 'string' && product.name.toLowerCase().includes(searchValueLower))
            );

            setSearchResults(filteredData);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } 
    };

    return(
        <div>
            <h1 style={{textAlign: 'center', margin:'2%'}}> Lista de Productos </h1>
            <Form className="d-flex" style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '20px', justifyContent: 'center' }}>
                <Form.Control
                    type="search"
                    placeholder="Código o Nombre"
                    className="me-2"
                    aria-label="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Form>
            <div className="container">
                {items.length <= 0 ? (
                    <h2 style={{ textAlign: 'center' }}>No hay productos en el sistema...</h2>
                ) : (
                    <>
                        {(searchResults.length > 0 || items.length > 0) ? (
                            <Table items={searchResults.length > 0 ? searchResults : items} editItem={editItem} handleDelete={handleDelete} />
                        ) : (
                            <div style={{ textAlign: 'center' }}>Cargando...</div>
                        )}
                    </>
                )}
            </div>
            {/* <div className="container">
                {(searchResults.length > 0 || items.length > 0) ? (
                    <Table items={searchResults.length > 0 ? searchResults : items} editItem={editItem} handleDelete={handleDelete} />
                ) : (
                    <div style={{ textAlign: 'center' }}>Cargando...</div>
                )}
            </div> */}
        </div>
    );
}

export default ShowProducts;

