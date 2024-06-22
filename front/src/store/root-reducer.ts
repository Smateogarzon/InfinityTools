import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import sessionStorage from 'redux-persist/lib/storage/session';
import authSlic from './slices/auth.slice';
import filtersUserAdmin from './slices/filterUserAdmin.slice';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['auth'],
};

const combinedReducers = combineReducers({
  auth: authSlic,
  filtersUserAdmin: filtersUserAdmin,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
