import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";
import userName from "./name";

// initialize redux 'the global store'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    authSlice: authReducer,
    name: userName,
  },
});

export default store;
