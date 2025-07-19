import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ILoginResponse, IUserSlice } from '../../interface/IAuth';
import type { UserProfileResponse } from '../../interface/IUser';

const initialState: IUserSlice = {
  data: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginResponse>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<UserProfileResponse>) => {
      if (state.data) {
        // Update the user data with profile information
        state.data.data = {
          ...state.data.data,
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
      }
    },
  },
});

export const { login, logout, setLoading, setError, updateUserProfile } = userSlice.actions;
export default userSlice.reducer; 