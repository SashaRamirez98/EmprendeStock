import React, { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import Table from "../Components/Table/Table";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ShowProducts = () => {
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const fetchProducts = () => {
        setLoading(true); // Establecer loading en true antes de realizar la solicitud
        axiosInstance.get('/')
            .then(response => {
                if (response.status === 200) {
                    // Actualizar el estado con los datos recibidos de la API
                    setItems(response.data);
                } else {
                    throw new Error(`[${response.status}] Error en la solicitud`);
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                // Aquí podrías agregar lógica adicional para manejar el error, como mostrar un mensaje de error al usuario
            })
            .finally(() => setLoading(false)); // Establecer loading en false después de que se complete la solicitud, ya sea con éxito o con error
    };
    
    const editItem = (id, data) => {
        console.log('Editando producto:', id, data);
        if (!data) {
            console.error('Error: Data no está definida');
            return;
        }
        axiosInstance.put(`/${id}`, data)
            .then(response => {
                if (response.status === 200) {
                    // Actualizar los datos después de editar el producto
                    fetchProducts();
                    console.log('Producto editado exitosamente');
                } else {
                    throw new Error(`Error ${response.status} en la solicitud`);
                }
            })
            .catch(error => {
                console.error('Error al editar producto:', error);
            });
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/${id}`)
            .then(r => {
                if (r.status === 200) {
                    console.log(r);
                    const itemsUpload = items.filter(item => item.id !== id);
                    setItems(itemsUpload);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el elemento:', error);
            });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchValue);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue]);

    const handleSearch = async (searchValue) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/`);
            const data = response.data;

            // Convertir el valor de búsqueda a minúsculas
            const searchValueLower = searchValue.toLowerCase();

            // Filtrar los resultados basados en la búsqueda insensible a mayúsculas y minúsculas
            const filteredData = data.filter(
        (product) =>
            (product.code && product.code.toLowerCase().includes(searchValueLower)) ||
            (product.name && product.name.toLowerCase().includes(searchValueLower))
        );

            setSearchResults(filteredData);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '2%' }}> Lista de Productos </h1>
            <Form className="d-flex" style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
                <Form.Control
                    type="search"
                    placeholder="Código o Nombre"
                    className="me-2"
                    aria-label="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="outline-success" type="submit" onClick={() => handleSearch(searchValue)}> Buscar </Button>
            </Form>
            {loading ? (
                <div style={{ textAlign: 'center' }}>Cargando...</div>
            ) : (
                <div className="container">
                    {searchResults.length > 0 ? (
                        <Table items={searchResults} editItem={editItem} handleDelete={handleDelete} />
                    ) : (
                        <Table items={items} editItem={editItem} handleDelete={handleDelete} />
                    )}
                </div>
            )}
        </div>
    );
}

export default ShowProducts;