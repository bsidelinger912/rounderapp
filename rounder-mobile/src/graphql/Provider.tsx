/**
 * @class GraphQlProvider
 * @description a provider for apollo client
 */

import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { AuthContext } from '../auth/AuthProvider';
import { serviceBase } from '../config';

const GraphQlProvider: React.FC = ({ children }) => {
  const auth = useContext(AuthContext);

  const client = new ApolloClient({
    uri: `${serviceBase}/graphql`,
    // TODO: conditional render, or what?
    headers: !auth.loading ? {
      Authorization: `Bearer ${auth.getToken()}`,
    } : {},
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default GraphQlProvider;
