import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import '../Styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // Get user from Redux state

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    dispatch(addToCart({ productId: product._id, quantity }))
      .unwrap()
      .then(() => {
        setIsAddedToCart(true);
        toast.success(`${product.name} (${quantity}) added to cart!`, {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(err || 'Failed to add to cart');
      });
  };


  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(
      isFavorited
        ? `${product.name} removed from favorites!`
        : `${product.name} added to favorites!`,
      {
        position: 'top-right',
        autoClose: 2000,
      }
    );
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="product-details-container">
      {isLoading ? (
        <div className="skeleton-loader">
          <div className="skeleton-image"></div>
          <div className="skeleton-info">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-price"></div>
            <div className="skeleton-text skeleton-description"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ) : (
        <div className="product-details-grid">
          <div className="image-container">
            <img 
              src={
                product.thumbnail ||
                (product.images && product.images.length > 0 && product.images[0]) ||
                '/placeholder.jpg'
              }
              alt={product.name}
              className="product-image"
            />

          </div>
          <div className="product-info">
            <div className="product-header">
              <h2 className="product-name">{product.name}</h2>
              <button 
                className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
                onClick={handleToggleFavorite}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <p className="product-price">₹{product.price}</p>
            <p className="product-description">{product.description}</p>
            <div className="quantity-selector">
              <button 
                className="quantity-button" 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-button" 
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart} 
              className={`add-to-cart-button ${isAddedToCart ? 'added' : ''}`}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
