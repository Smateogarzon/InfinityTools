import { createSlice } from '@reduxjs/toolkit';
import { cartUser, logOut } from '../thukns/auth.thuks';
const back = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  rol: '',
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null as string | null,
  idCart: '' as string | undefined,
  infoCart: {
    total: 0,
    products: [],
    totalItems: 0,
  },
  loadCard: false,
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
    addItemsCart: (state, action) => {
      state.idCart = action.payload._id;
      state.infoCart.products = action.payload.products;
      state.infoCart.total = action.payload.total;
      state.infoCart.totalItems = action.payload.totalItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.rol = '';
        state.status = 'idle';
        state.idCart = '';
        state.infoCart.products = [];
        state.infoCart.total = 0;
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Error';
      })
      .addCase(logOut.pending, (state) => {
        state.status = 'loading';
      });
    builder
      .addCase(cartUser.fulfilled, (state, action) => {
        state.idCart = action.payload._id;
        state.infoCart.products = action.payload.products;
        state.infoCart.total = action.payload.total;
        state.infoCart.totalItems = action.payload.totalItems;
      })
      .addCase(cartUser.rejected, (state) => {
        state.idCart = '';
      })
      .addCase(cartUser.pending, (state) => {
        state.loadCard = true;
      });
  },
});

export const { googleLogin, getGoogleAccess, facebookLogin, getFacebookAccess, addItemsCart } =
  authSlic.actions;

export default authSlic.reducer;
