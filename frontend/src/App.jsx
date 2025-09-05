import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import ProductCatalog from "./Pages/ProductCatalog.jsx";
import CartPage from "./Pages/CartPage.jsx";

function App() {

  return (
    <>
    <RegisterPage/>
      <LoginPage/>

      <ProductCatalog/>
      <CartPage/>
    </>
  )
}

export default App
