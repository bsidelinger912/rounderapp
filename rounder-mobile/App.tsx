import React from 'react';

import AuthProvider from './src/auth/AuthProvider';
import Main from './src/Main';

const App: React.FC = () => (
  <AuthProvider>
    <Main />
  </AuthProvider>
);

export default App;
