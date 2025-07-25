import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/cart.css';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleQuantityChange = (id, newQuantity, name) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
      toast.success(`${name} removed from cart!`, {
        position: 'top-right',
        autoClose: 2000,
      });
    } else {
      dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
      toast.success(`Updated ${name} quantity to ${newQuantity}!`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item._id)));
    toast.success('Cart cleared!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  // Calculate total: sum of price * quantity
  const total = Array.isArray(cartItems)
  ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  : 0;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-details">
                <Link to={`/product/${item._id}`} className="item-name-link">
  <h4 className="item-name">{item.name}</h4>
</Link>

                <p className="item-price">Price: ₹{item.price}</p>
                <div className="quantity-selector">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.name)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.name)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <p className="item-total">Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item._id, item.name)}
                className="remove-btn"
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <p className="total-price">Total: ₹{total}</p>
            <div className="cart-actions">
              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;