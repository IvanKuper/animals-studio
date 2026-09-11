import { createSlice } from "@reduxjs/toolkit";

//create variable that we want redux to store
const initialState = {
  counter: 10,
};

const counterSlice = createSlice({
  //redux use it, like key in react
  name: "counter",
  //initial state
  initialState: initialState,
  //functions to munipulate the state
  //the functions inside the reducers called actions
  reducers: {
    add1(state) {
      state.counter++;
    },
    sub1(state) {
      state.counter--;
    },
    add5(state) {
      state.counter += 5;
    },
    sub5(state) {
      state.counter -= 5;
    },
    addNumber(state, action) {
      state.counter += +action.payload;
    },
    reduceNumber(state, action) {
      state.counter -= +action.payload;
    },
  },
});

//export the actions so we can use them inside other components
//to update the slice "counter state"
export const counterActions = counterSlice.actions;

//export the configuration to index.js of redux
//so redux can configure the "big state"
export default counterSlice.reducer;
