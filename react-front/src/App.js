import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AddProduct from './AddProduct';
import Footer from './Footer';
import UpdateProduct from './UpdateProduct';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
import UserProductList from './UserProductList';
import Cart from './Cart';
import Compras from './Compras';
import EnProcesoDeEnvio from './EnProcesoDeEnvio';
import ProductosEntregados from './ProductosEntregados';
import Ventas from './Ventas';
import GuiaUso from './GuiaUso';
import Protected from './Protected';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Protected Cmp={Home} />} />
          <Route path="/addProduct" element={<Protected Cmp={AddProduct} adminOnly />} />
          <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} adminOnly />} />
          <Route path="/productList" element={<Protected Cmp={ProductList} adminOnly />} />
          <Route path="/entregados" element={<Protected Cmp={ProductosEntregados} adminOnly />} />
          <Route path="/pedidos" element={<Protected Cmp={EnProcesoDeEnvio} adminOnly />} />
          <Route path="/ventas" element={<Protected Cmp={Ventas} adminOnly />} />
          <Route path="/search/:searchTerm" element={<Protected Cmp={SearchProduct} />} />
          <Route path="/userProductList" element={<Protected Cmp={UserProductList} />} />
          <Route path="/cart" element={<Protected Cmp={Cart} />} />
          <Route path="/compras" element={<Protected Cmp={Compras} />} />
          <Route path="/guia" element={<GuiaUso />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
