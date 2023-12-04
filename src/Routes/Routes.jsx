import React from "react";
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import CreateProduct from '../Pages/CreateProduct'
import ShowProducts from "../Pages/ShowProducts";

const AppRoutes = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateProduct />} />
                <Route path='/show' element={<ShowProducts />} />
            </Routes>
        </>
    )
}

export default AppRoutes;