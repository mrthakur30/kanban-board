import { auth } from "@/utils/firebase";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Asynchronous thunk for signing up a user
export const signupAsync = createAsyncThunk<string | null, { email: string; password: string }, { rejectValue: string }>(
  "auth/signup",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user?.email || null; // return the user's email or null
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Asynchronous thunk for logging out a user
export const logoutAsync = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action: PayloadAction<string | null>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export default authSlice.reducer;
