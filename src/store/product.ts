import { createSlice } from "@reduxjs/toolkit";


// get data from localStorage
const defaultItem = localStorage.getItem("ass3_listCart");
const initialState = {
  products: [],
  listCart: defaultItem ? JSON.parse(defaultItem) : [],
};

const slice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    updateProduct(state, action) {
      state.products = action.payload;
    },
    addToCard(state, action) {
      const listCart = state.listCart;
      const newList: any = [...listCart, action.payload];
      state.listCart = newList;
      localStorage.setItem("ass3_listCart", JSON.stringify(newList));
    },
    updateCard(state, action) {
      state.listCart = action.payload;
      localStorage.setItem("ass3_listCart", JSON.stringify(action.payload));
    },
    deleteFromCard(state, action) {
      const listCart = state.listCart;
      const newList = listCart.filter(
        (item: any) => item?._id?.$oid !== action.payload
      );
      state.listCart = newList;
      localStorage.setItem("ass3_listCart", JSON.stringify(newList));
    },
  },
});

export const productActions = slice.actions;

export default slice.reducer;
