import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import CustomStore from '@/store/StoreProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/styled-engine';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <CustomStore>
      <React.StrictMode>
        <BrowserRouter>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </BrowserRouter>
      </React.StrictMode>
    </CustomStore>
  );
} else {
  console.error('Element with id "root" not found.');
}
