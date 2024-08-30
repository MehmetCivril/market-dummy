import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartNumber: 0,
  products: [],
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment: (state, action) => {
    //   state.cartNumber += 1;
    //   let product = state.products.find(
    //     (item) => item._id === action.payload._id
    //   );

    //   if (product) {
    //     // Eğer ürün zaten mevcutsa, sadece miktarı artır
    //     product.cartQuantity += 1;
    //   } else {
    //     // Eğer ürün mevcut değilse, miktarı 1 olarak ayarlayıp ekle
    //     state.products.push({ ...action.payload, cartQuantity: 1 });
    //   }
    // },

    increment: (state, action) => {
      state.cartNumber += 1
      let product = state.products.find(
        (item) => item._id === action.payload._id
      )
      if (product) {
        let newProducts = state.products.map((item) => {
          if (action.payload._id === item._id) {
            return { ...item, cartQuantity: item.cartQuantity + 1 }
          }
          return item
        })
        state.products = newProducts
      } else {
        state.products.push(action.payload)
      }
    },
    clearCart: (state) => {
      state.cartNumber = 0
      state.products = []
    },
    removeItem: (state, action) => {
      let newProduct = state.products.filter(
        (product) => product._id !== action.payload
      )
      state.cartNumber -= 1
      state.products = newProduct
      // state.cartNumber -= 1
      // state.products = state.products.filter(
      //   (product) => product._id !== action.payload._id) //action.payload'ın id'sine sahip ürünü silmek için filter metodunu kullanacağız.
    },
  },
})
export const { increment, clearCart, removeItem } = counterSlice.actions
export default counterSlice.reducer
