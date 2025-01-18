import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial user state
    token : null
  },
  reducers: {
    setUser :(state, action) =>{
      state.user = action.payload; // Update the user state
      state.token = action.payload.token; // Store token
    },
    clearUser: (state) => {
      state.user = null; // Clear user details on logout
      state.token = null; // Clear token on logout
    },
  },
});

export const { setUser,clearUser } = authSlice.actions;
export default authSlice.reducer;
