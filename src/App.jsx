import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Header from './Cabecera/Header';
import MainPage from './Mainpage/mainpage';
import Footer from './footer/footer';
import ResumenCuenta from './ResumenCuenta/ResumenCuenta'; // Importa la página de Resumen de Cuenta
import Dashboard from './Dashboard/Dashboard';
import OrderDetail from './OrderDetail/OrdenAdmin';
import AddProduct from './AddProduct/AddProduct';
import ProductList from './ProductList/ProductList';
import Products from './Products/Products';
import SearchResp from './SearchResp/SearchResp';
import Checkout from './Payment/Checkout';
import CompraExitosa from './Payment/CompraExitosa';
import OrdenDetalle from './ResumenCuenta/OrdenDetalle';


import './App.css';

function App() {
  return (
    <div>
      <Header />
      {/* Configura las rutas */}
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* Página principal */}
        <Route path="/resumen-cuenta" element={<ResumenCuenta />} /> {/* Resumen de Cuenta */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/OrderDetail" element={<OrderDetail />} />
        <Route path='/AddProduct' element={<AddProduct/>} />
        <Route path='/ProductList' element={<ProductList/>} />
        <Route path='/Products' element={<Products/>} />
        <Route path='/SearchResp' element={<SearchResp/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/DetallesAdmin/:id" element={<OrdenDetalle />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
