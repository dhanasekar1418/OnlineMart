import axiosInstance from '../utils/axiosInstance';

export const getAllProducts = async () => {
  const { data } = await axiosInstance.get('/api/products');
  return data;
};
