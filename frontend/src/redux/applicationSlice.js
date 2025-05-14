import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name : "application",
    initialState : {
        allApplications : [],
        allApplicants : [],
        selectedApplication : null,
        allProposals : [],
        selectedProposals : null
    },
    reducers : {
        setAllApplications : (state,action) => {
            state.allApplications = action.payload
        },
        setAllApplicants : (state,action) => {
            state.allApplicants = action.payload
        },
        setSelectedApplication : (state,action) => {
            state.selectedApplication = action.payload
        },
        setAllProposals : (state,action) => {
            state.allProposals = action.payload
        },
        setSelectedProposals : (state,action)=> {
            state.selectedProposals = action.payload
        }
    }
})

export const {setAllApplications,setAllApplicants,setSelectedApplication,setSelectedProposals,setAllProposals} = applicationSlice.actions
export default applicationSlice.reducer