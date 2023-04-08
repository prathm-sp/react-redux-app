import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  email: string;
  password: string;
}

const initialState: CounterState = {
  email: "",
  password: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setPassword } = counterSlice.actions;

export default counterSlice.reducer;
