import React, { useReducer } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import NavBar from './Components/NavBar/NavBar'
import AppRoutes from './Routes/Routes'


function App() {


  return (
    <>
      <Router>
          <NavBar />
          <AppRoutes />
      </Router>
    </>
  )
}

export default App
