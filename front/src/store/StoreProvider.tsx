import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './index';
import React from 'react';

interface CustomStoreProps {
  children: React.ReactElement | typeof React.Fragment | string; // Example types
}

const CustomStore: React.FC<CustomStoreProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <>{children}</>
      </PersistGate>
    </Provider>
  );
};

export default CustomStore;
