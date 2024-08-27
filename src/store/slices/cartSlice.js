import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartNumber: 0
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.cartNumber += 1
    },
  },
})
export const { increment } = counterSlice.actions
export default counterSlice.reducer

// store.js
