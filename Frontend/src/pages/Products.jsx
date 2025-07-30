import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import '../Styles/home.css';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, loading } = useSelector((state) => state.product);

  // Get search term from query params
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  // Fetch all products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading products...</p>
      </div>
    );
  }

  // Filter only if search term exists
  const filteredProducts = searchTerm
  ? products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    ).slice(-24)
  : products.slice(-24);
// Show all products if search is empty

  return (
    <main className="products-page">
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </main>
  );
};

export default Home;
