import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial user state
  },
  reducers: {
    setUser :(state, action) =>{
      state.user = action.payload; // Update the user state
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
