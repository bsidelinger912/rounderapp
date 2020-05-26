import React from 'react';

import AuthProvider from './src/auth/AuthProvider';
import GraphQlProvider from './src/graphql/Provider';
import Main from './src/Main';


const App: React.FC = () => (
  <AuthProvider>
    <GraphQlProvider>
      <Main />
    </GraphQlProvider>
  </AuthProvider>
);

export default App;
