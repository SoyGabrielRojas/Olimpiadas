import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Login from './login';
import Register from './Register';
import AddProduct from './AddProduct';
import Footer from './Footer';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProduct" element={<Protected Cmp={AddProduct} />} />
          <Route path="/updateProduct" element={<Protected Cmp={UpdateProduct} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
