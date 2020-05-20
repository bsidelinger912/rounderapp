/**
 * @class Main
 * @description main entry point for app
 */

import React, { useContext } from 'react';
import { AuthContext } from './auth/AuthProvider';

import Loader from './components/Loader';
import LoginOrSignup from './pages/LoginOrSignup';
import Dashboard from './pages/Dashboard';

// import { StyleSheet, View } from 'react-native';
// import MapView from 'react-native-maps';

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: '100%',
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// const Main: React.FC = () => (
//   <View style={styles.container}>
//     <MapView
//       style={styles.map}
//       region={{
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}
//     />
//   </View>
// );


const Main: React.FC = () => {
  const auth = useContext(AuthContext);
  if (auth.loading) {
    return <Loader visible />;
  }

  if (!auth.isAuthenticated) {
    return <LoginOrSignup />;
  }

  return <Dashboard />;
};

export default Main;
