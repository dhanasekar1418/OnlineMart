import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: Date,
  reviewerName: String,
  reviewerEmail: String,
});

const dimensionSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number,
});

const metaSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  barcode: String,
  qrCode: String,
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // maps from title
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number, required: true },
    tags: [String],
    brand: { type: String },
    sku: { type: String },
    weight: { type: Number },
    dimensions: dimensionSchema,
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String },
    reviews: [reviewSchema],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number },
    meta: metaSchema,
    images: [String],
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
