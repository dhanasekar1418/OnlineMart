import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';
import axiosInstance from '../utils/axiosInstance.js';


dotenv.config();
connectDB();

const importProducts = async () => {
  try {
    const { data } = await axiosInstance.get('/api/products');

    const formatted = data.map(item => ({
      name: item.title,
      image: item.image,
      price: item.price,
      brand: 'Sample Brand',
      category: item.category,
      countInStock: 10,
      description: item.description,
    }));

    await Product.deleteMany(); // Optional: clear old data
    await Product.insertMany(formatted);

    console.log('✅ Products Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing products:', error);
    process.exit(1);
  }
};

importProducts();
