import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../thukns/auth.thuks';
const back = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  rol: '',
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null as string | null,
};

const authSlic = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleLogin: (state) => {
      const url = `${back}/auth/google/login`;
      window.location.href = url;
      state.status = 'loading';
    },
    getGoogleAccess: (state) => {
      state.status = 'succeeded';
      state.rol = 'user';
    },
    facebookLogin: (state) => {
      const url = `${back}/auth/facebook`;
      window.location.href = url;
      state.status = 'loading';
    },
    getFacebookAccess: (state) => {
      state.status = 'succeeded';
      state.rol = 'user';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.rol = '';
        state.status = 'idle';
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Error';
      })
      .addCase(logOut.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export const { googleLogin, getGoogleAccess, facebookLogin, getFacebookAccess } = authSlic.actions;

export default authSlic.reducer;
