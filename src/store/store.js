import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    // Add your reducers here
    cart: cartReducer,
    user: userReducer,
  },
})
