import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
