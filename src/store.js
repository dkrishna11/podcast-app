import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./slices/userSlices";

export default configureStore({
    reducer:{
        user:useReducer,
    },
});