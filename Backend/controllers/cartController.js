import Cart from '../models/cartModel.js';

// Helper function to format cart response consistently
const formatCartResponse = (cart) => {
  if (!cart || !cart.items) return [];
  return cart.items.map(item => ({
    _id: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity,
  }));
};

// Add or update cart
export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    // Validate input
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid productId and quantity are required' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json(formatCartResponse(updatedCart));
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};

// Update quantity (set specific quantity, not add to existing)
export const updateQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    // Validate input
    if (!productId || quantity < 0) {
      return res.status(400).json({ message: 'Valid productId and non-negative quantity are required' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    
    if (itemIndex > -1) {
      if (quantity === 0) {
        // Remove item if quantity is 0
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json(formatCartResponse(updatedCart));
  } catch (error) {
    console.error('Update quantity error:', error);
    res.status(500).json({ message: 'Error updating quantity', error: error.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.status(200).json(formatCartResponse(cart));
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Remove item
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  
  try {
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { items: { productId } } },
      { new: true }
    ).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(formatCartResponse(cart));
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Error removing item', error: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { items: [] } },
      { new: true }
    );
    
    res.status(200).json([]);
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};