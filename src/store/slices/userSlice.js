import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    user: false
  },
  reducers: {
    handleLogin: (state, action) => {
      state.email = action.payload.email
      state.username = action.payload.username
    },
    handleLogout: (state) => {
        state.email = ""
        state.username = ""
    },
  },
})

export const { handleLogin, handleLogout } = userSlice.actions
export default userSlice.reducer
