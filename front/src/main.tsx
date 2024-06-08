import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import CustomStore from '@/store/StoreProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/styled-engine';
const back = import.meta.env.VITE_BACKEND_URL;
const httpLink = createUploadLink({
  uri: `${back}/api/graphql`,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
  credentials: 'include',
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  connectToDevTools: true,
  credentials: 'include',
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <CustomStore>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </BrowserRouter>
      </ApolloProvider>
    </CustomStore>
  );
} else {
  console.error('Element with id "root" not found.');
}
