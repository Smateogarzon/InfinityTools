import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logOut = createAsyncThunk('auth/logout', async () => {
  localStorage.clear();
  await axios.post(
    'http://localhost:3000/auth/logout',
    {},
    {
      withCredentials: true,
    }
  );
  return;
});
