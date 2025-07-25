import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import products from '../data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Sample products imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};

importData();
