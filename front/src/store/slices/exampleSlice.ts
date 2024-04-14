import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  array: [],
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    unaFuncion: () => {
      console.log('Función del reducer');
    },
  },
});

export default exampleSlice.reducer;
