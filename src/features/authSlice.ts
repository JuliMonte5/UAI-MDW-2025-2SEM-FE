import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  type Dispatch,
} from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import type { RootState } from "../store/store";

// Define the shape of our user data
export interface AuthUser {
  uid: string;
  email: string | null;
  token: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

// Register new user
export const registerUser = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return {
      uid: user.uid,
      email: user.email,
      token: await user.getIdToken(),
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Login existing user
export const loginUser = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string; dispatch: Dispatch }
>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", JSON.stringify(userToken));

      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        token: await user.getIdToken(),
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Observe Firebase user state
export const observeUser = createAsyncThunk<void, void, { dispatch: Dispatch }>(
  "auth/observeUser",
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, async (user: User | null) => {
      dispatch(setLoading(true));
      if (user) {
        const token = await user.getIdToken();
        dispatch(setUser({ uid: user.uid, email: user.email, token }));
      } else {
        dispatch(clearUser());
      }
      dispatch(setLoading(false));
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const getAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
