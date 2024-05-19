import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user : string | null
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signup: (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
      },
    },
  });
  
  export const { signup, logout } = authSlice.actions;
  export default authSlice.reducer;
  