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
import Protected from './Protected';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/home" element={<Protected Cmp={Home} />} />
          <Route path="/addProduct" element={<Protected Cmp={AddProduct} />} />
          <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
          <Route path="/productList" element={<Protected Cmp={ProductList} />} />
          <Route path="/search" element={<Protected Cmp={SearchProduct} />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
