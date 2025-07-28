import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './tempPages/Home';
import Login from './tempPages/Login';
import Register from './tempPages/Signup';
import ProductDetails from './tempPages/ProductDetails';
import Cart from './tempPages/Cart';
import Checkout from './tempPages/Checkout';
import AdminDashboard from './tempPages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Product from './tempPages/Products';
import Signup from './tempPages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const App = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-[80vh] py-6 px-4 container mx-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      {/* ✅ ToastContainer added here */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};


export default App;
