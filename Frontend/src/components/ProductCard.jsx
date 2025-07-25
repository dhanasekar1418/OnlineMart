import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
   <div className="product-card">
  <img src={product.image} alt={product.name} />
  <div className="product-card-content">
    <h3 className="product-card-title">{product.name}</h3>
    <p className="product-card-price">₹{product.price}</p>
    <Link to={`/product/${product._id}`} className="product-card-link">
      View Details
    </Link>
  </div>
</div>
  );
};

export default ProductCard;