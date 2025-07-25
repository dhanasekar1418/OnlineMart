import express from 'express';
import { 
  addToCart, 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addToCart);              // Add item to cart
router.get('/', protect, getCart);                    // Get current user's cart
router.delete('/:productId', protect, removeFromCart); // Remove item from cart
router.put('/update', protect, updateQuantity);       // Update item quantity
router.delete('/', protect, clearCart);               // Clear entire cart

export default router;