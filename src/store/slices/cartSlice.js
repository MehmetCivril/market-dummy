import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartNumber: 0,
  products: [],
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.cartNumber += 1
      state.products.push(action.payload) //benim ürünüm action.payload içerisinde. Benim products'ım state.products içerisinde bu array'a eleman push ile action.payloaddan eklerim.
    },
    clearCart: (state) => {
      state.cartNumber = 0
      state.products = []
    },
    removeItem: (state) => {
      state.cartNumber -= 1
    }
  },
})
export const { increment, clearCart } = counterSlice.actions
export default counterSlice.reducer
