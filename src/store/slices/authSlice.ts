import { removeFromLocalStorage } from "@/utils/localStorageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<{ isAuth: boolean }>) {
      state.isAuth = action.payload.isAuth;
    },
    clearAuthState(state) {
      state.isAuth = false;
      removeFromLocalStorage(["login", "accessToken", "refreshToken"]);
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
