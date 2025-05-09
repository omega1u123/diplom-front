import { removeFromLocalStorage } from "@/utils/localStorageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
  userId: string;
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem("accessToken"),
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setAuthState(state, action: PayloadAction<{ isAuth: boolean }>) {
      state.isAuth = action.payload.isAuth;
    },
    clearAuthState(state) {
      state.isAuth = false;
      state.userId = "";
      removeFromLocalStorage(["accessToken", "refreshToken"]);
    },
  },
});

export const { setAuthState, clearAuthState, setAuthId } = authSlice.actions;
export default authSlice.reducer;
