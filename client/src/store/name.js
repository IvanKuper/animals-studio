import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Hello",
};

const userNameSlice = createSlice({
  name: "userName",
  initialState: initialState,
  reducers: {
    userName(state, action) {
      state.name += `, ${action.payload}`;
    },
  },
});

export const nameActions = userNameSlice.actions;
export default userNameSlice.reducer;
