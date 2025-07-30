import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear old products
    await Product.deleteMany();
    console.log('✅ Cleared existing products');

    // Fetch DummyJSON products
    const { data } = await axios.get('https://dummyjson.com/products?limit=100');
    const productsFromAPI = data.products;

    // Map and format all fields
    const formattedProducts = productsFromAPI.map((p) => ({
      name: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      tags: p.tags,
      brand: p.brand,
      sku: p.sku,
      weight: p.weight,
      dimensions: p.dimensions,
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      availabilityStatus: p.availabilityStatus,
      reviews: p.reviews.map((r) => ({
        rating: r.rating,
        comment: r.comment,
        date: r.date,
        reviewerName: r.reviewerName,
        reviewerEmail: r.reviewerEmail,
      })),
      returnPolicy: p.returnPolicy,
      minimumOrderQuantity: p.minimumOrderQuantity,
      meta: p.meta,
      images: p.images,
      thumbnail: p.thumbnail,
    }));

    // Insert into MongoDB
    await Product.insertMany(formattedProducts);
    console.log('✅ Products imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
