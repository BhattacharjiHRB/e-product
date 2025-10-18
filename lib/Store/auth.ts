import { AuthState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredential(
      state,
      action: PayloadAction<{
        email: string;
        token: string;
        isLoggedIn: boolean;
      }>,
    ) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;
