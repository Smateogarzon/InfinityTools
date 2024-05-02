import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reloading: false,
};

const filtersUserAdmin = createSlice({
  name: 'filterUserAdmin',
  initialState,
  reducers: {
    reoading: (state, action) => {
      state.reloading = action.payload;
    },
  },
});

export const { reoading } = filtersUserAdmin.actions;

export default filtersUserAdmin.reducer;
