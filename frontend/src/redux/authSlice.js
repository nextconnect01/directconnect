import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial user state
    loading : false
  },
  reducers: {
    setUser :(state, action) =>{
      state.user = action.payload; // Update the user state
    },
    setLoading : (state,action) => {
      state.loading =  action.payload
    }
  },
});

export const { setUser,setLoading } = authSlice.actions;
export default authSlice.reducer;
