import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product";
import authReducer from "./auth";


const store = configureStore({
  reducer: { product: productReducer , auth: authReducer },
  
});

export default store;
