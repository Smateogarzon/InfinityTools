import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reloading: false,
};

const filtersUserAdmin = createSlice({
  name: 'filterUserAdmin',
  initialState,
  reducers: {
    reoading: (state) => {
      state.reloading = !state.reloading;
    },
  },
});

export const { reoading } = filtersUserAdmin.actions;

export default filtersUserAdmin.reducer;
