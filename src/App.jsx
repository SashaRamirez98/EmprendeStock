import React, { useReducer } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import NavBar from './Components/NavBar/NavBar'
import AppRoutes from './Routes/Routes'
import { ItemsContext, ItemsReducer } from './Context/ItemsContext'


function App() {

  // const initialState = []
  // const [items, dispatch] = useReducer(ItemsReducer, initialState)

  return (
    <>
      <Router>
        {/* <ItemsContext.Provider value={{items, dispatch}}> */}
          <NavBar />
          <AppRoutes />
        {/* </ItemsContext.Provider> */}
      </Router>
    </>
  )
}

export default App
