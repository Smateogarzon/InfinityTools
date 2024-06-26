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
export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      ProductsCart: {
        fields: {
          products: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: httpLink,
  connectToDevTools: true,
  credentials: 'include',
});

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
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
