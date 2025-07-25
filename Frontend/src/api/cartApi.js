// api/cartApi.js
import axiosInstance from '../utils/axiosInstance';

export const addToCartApi = (productId, quantity) => {
  return axiosInstance.post('/api/cart/add', { productId, quantity });
};

export const getCartApi = () => {
  return axiosInstance.get('/api/cart');
};
