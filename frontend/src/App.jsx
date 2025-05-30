import * as React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProductDetailPage from "./pages/ProductDetail";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/productdetail" element={<ProductDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;