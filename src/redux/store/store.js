import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import customerSlice from "../slice/customerSlice";
import searchSlice from "../slice/searchSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    customer: customerSlice.reducer,
    search: searchSlice.reducer,
  },
});
export default store;
