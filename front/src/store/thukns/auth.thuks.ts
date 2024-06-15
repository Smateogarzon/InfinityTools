import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCart } from '../graphql/query';
import { client } from '../../main';
const back = import.meta.env.VITE_BACKEND_URL;

export const logOut = createAsyncThunk('auth/logout', async () => {
  localStorage.clear();
  await axios.post(
    `${back}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return;
});

export const cartUser = createAsyncThunk('auth/cartUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.query({ query: getCart });
    return data?.FindCart;
  } catch (error) {
    return rejectWithValue(error);
  }
});
