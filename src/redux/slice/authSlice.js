import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: {},
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: () => {},
});

// Export the reducer
export default authSlice;

export const {setAuthInfo} = authSlice.actions
