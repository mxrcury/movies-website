import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from "./App"
import { IntlProvider } from './providers/i18n';
import { Provider } from './providers/context';


const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider>
          <IntlProvider>
            <App />
          </IntlProvider>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

