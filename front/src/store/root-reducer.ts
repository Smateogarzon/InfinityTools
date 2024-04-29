import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authSlic from './slices/auth.slice';
import filtersUserAdmin from './slices/filterUserAdmin.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'filtersUserAdmin'],
};

const combinedReducers = combineReducers({
  auth: authSlic,
  filtersUserAdmin: filtersUserAdmin,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
