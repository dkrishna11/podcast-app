import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./slices/userSlices";
import podcastReducer from "./slices/podCastSlice";

export default configureStore({
    reducer:{
        user:useReducer,
        podcasts:podcastReducer,
    },
});