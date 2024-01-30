import { createSlice } from "@reduxjs/toolkit";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  sessions: string[];
  gifts: string[];
};
type AuthState = {
  isAuthenticed: boolean;
  user: User;
  token: string;
};

const initialState: AuthState = {
  isAuthenticed: false,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    sessions: [],
    gifts: [],
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticed = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
