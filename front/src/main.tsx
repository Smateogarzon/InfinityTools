import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import CustomStore from '@/store/StoreProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/styled-engine';
const back = import.meta.env.VITE_BACKEND_URL;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${back}/api/graphql` }),
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
