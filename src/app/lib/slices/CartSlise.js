import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    clearFromCart: (state, action) => {},
  },
});

export const { addToCart, deleteFromCart, clearFromCart } = cartSlice.actions;
export default cartSlice.reducer;
