// store/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    addProduct: (state, action) => {

      const existingProduct = state.products.find(
        (item) => item.id === action.payload.id
      );

      // SI YA EXISTE
      if (existingProduct) {

        existingProduct.quantity += action.payload.quantity;

        existingProduct.totalPrice =
          existingProduct.quantity *
          existingProduct.unitPrice;

      } else {

        // SI NO EXISTE
        state.products.push(action.payload);

      }
    },

    removeProduct: (state, action) => {

      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );

    },

    clearCart: (state) => {

      state.products = [];

    },

  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;