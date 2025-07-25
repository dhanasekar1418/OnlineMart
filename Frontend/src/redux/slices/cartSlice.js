import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// --- Async Thunks ---
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/api/cart/add', { productId, quantity });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Add to cart failed'
      );
    }
  }
);

export const getCart = createAsyncThunk(
  'cart/getCart', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/api/cart');
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Fetch cart failed'
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/api/cart/${productId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Remove failed'
      );
    }
  }
);

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put('/api/cart/update', { productId, quantity });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Update quantity failed'
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete('/api/cart');
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Clear cart failed'
      );
    }
  }
);

// --- Slice ---
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  },
  extraReducers: builder => {
    builder
      // ADD TO CART
      .addCase(addToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CART
      .addCase(getCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE FROM CART
      .addCase(removeFromCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE QUANTITY
      .addCase(updateQuantity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLEAR CART
      .addCase(clearCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;

export const cartActions = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
};

export default cartSlice.reducer;