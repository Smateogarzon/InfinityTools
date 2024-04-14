import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { exampleReducer } from './slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const combinedReducers = combineReducers({
  reducer: exampleReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
