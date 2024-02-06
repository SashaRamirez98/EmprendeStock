import React, { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import Table from "../Components/Table/Table";

const ShowProducts = () => {

    const [items, setItems] = useState([]);

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

    const editItem = (id, data) => {
        console.log('editando producto');
        axiosInstance.put(`/${id}`, data)
        .then(r => {
            if(r.status === 200){
                axiosInstance.get('/')
                .then(r => {
                    if( r.status === 200){
                        setItems(r.data)
                    } else{
                        throw new Error([`Error ${r.status} en la solicitud`])
                    }
                })
                .catch(err => console.log(err))
            } else{
                throw new Error([`Error ${r.status} en la solicitud`])
            }
        })
        .catch(err => console.log(err))
       
    }

    const handleDelete = (id) => {
        axiosInstance.delete(`/${id}`)
          .then(r => {
            if (r.status === 200) {
              console.log(r);
              const itemsUpload = items.filter(item => item.id !== id);
              console.log(itemsUpload);
              setItems(itemsUpload);
            }
          })
          .catch(error => {
            console.error('Error al eliminar el elemento:', error);
          });
      };
    

    return(
        <div>
            <h1 style={{textAlign: 'center', margin:'2%'}}> Lista de Productos </h1>
            <div className="container">
                {
                    items.length > 0 ?
                     <Table items={items} editItem={editItem} handleDelete={handleDelete}/>
                    :
                    <h2 style={{textAlign: 'center'}}> No hay productos en el sistema... </h2>
                }
            </div>
        </div>
    );
}

export default ShowProducts;