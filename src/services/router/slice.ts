import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "react-router-dom";

const initialState: { location: Location } = {
  location: {
    pathname: "",
    search: "",
    hash: "",
    state: {},
    key: "",
  },
};

const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = routerSlice.actions;
export default routerSlice.reducer;
