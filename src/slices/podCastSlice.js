import { createSlice } from "@reduxjs/toolkit";

const initialState={
    podcasts:[],
}

const podcastSlice =createSlice({
    name:"podcasts",
    initialState,
    reducers:{
        setPodCasts:(state, action)=>{
            state.podcasts=action.payload;
        },
    },
});

export const { setPodCasts }=podcastSlice.actions;
export default podcastSlice.reducer;