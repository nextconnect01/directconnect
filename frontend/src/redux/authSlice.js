import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial user state
    loading : false,
    suggestedFreelancers : null,
    selectedUser : null,
    userContacts : [],
    messagingClients : [],
  },
  reducers: {
    setUser :(state, action) =>{
      state.user = action.payload; // Update the user state
    },
    setLoading : (state,action) => {
      state.loading =  action.payload
    },
    setSuggestedFreelancers : (state,action) => {
      state.suggestedFreelancers = action.payload
    },
    setSelectedUser : (state,action) => {
      state.selectedUser = action.payload
    },
    setUserContacts : (state,action) => {
      state.userContacts = action.payload
    },
    clearUserContacts : (state) => {
      state.userContacts = []
    },
    removeUserContact : (state,action) => {
      state.userContacts = state.userContacts.filter((contact) => contact._id !== action.payload)
    },
    setMessagingClients : (state,action) => {
      state.messagingClients = action.payload
    },
    removeMessagingClients : (state,action) => {
      state.messagingClients = state.messagingClients.filter((client) => client._id !== action.payload)
    }

  },
});

export const { setUser,setLoading,setSuggestedFreelancers,setSelectedUser,setUserContacts,clearUserContacts,removeUserContact,setMessagingClients,removeMessagingClients } = authSlice.actions;
export default authSlice.reducer;
