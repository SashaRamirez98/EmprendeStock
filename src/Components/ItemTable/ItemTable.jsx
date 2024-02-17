import React, {useState} from "react";
import Modal from "../Modal/Modal";

const ItemTable = ({ item, editItem, handleDelete }) => {
    const { name, price, code, stock, id } = item;
    const [modalShow, setModalShow] = useState(false);

    // Función para actualizar el estado local del componente padre con los datos actualizados del producto
    const handleUpdateItem = (updatedItem) => {
        updateLocalState(updatedItem);
    };

    const onDeleteClick = () => {
        handleDelete(id);
    };

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{code}</td>
                <td>{stock}</td>
                <td>{price}</td>
                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <i style={{ cursor: 'pointer' }} className="bi bi-pencil-square" onClick={() => setModalShow(true)}></i>
                    <i style={{ cursor: 'pointer' }} className="bi bi-trash3-fill" onClick={onDeleteClick}></i>
                </td>
            </tr>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                item={item}
                onSubmit={editItem}
            />
        </>
    );
}

export default ItemTable;

