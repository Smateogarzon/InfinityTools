import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ArrayProducts: {},
};

const filtersUserAdmin = createSlice({
  name: 'filterUserAdmin',
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      state.ArrayProducts = action.payload;
    },
  },
});

export const { filterProducts } = filtersUserAdmin.actions;

export default filtersUserAdmin.reducer;
