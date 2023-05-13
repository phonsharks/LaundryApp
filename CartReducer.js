import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "Cart",

  initialState: {
    cart: [],
  },

  reducers: {

    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id == action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCart: (state, action) => {
      const removePresent = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removePresent;
    },

    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id == action.payload.id
      );
      itemPresent.quantity++;
    },
    
    decrementQuantity: (state, action) => {
      const decrementQty = state.cart.find(
        (item) => item.id == action.payload.id
      );
      if (decrementQty == 1) {
        decrementQty = 0;
        const removePresent = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removePresent;
      } else {
        decrementQty.quantity--;
      }
    },

  },
});

export const { addToCart, removeCart, incrementQuantity, decrementQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
