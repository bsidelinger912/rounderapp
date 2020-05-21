/**
 * @class Dashboard
 * @description Main landing for user when they log in
 */

import React from 'react';
import {
  Text, StyleSheet, View, Button,
} from 'react-native';

interface Props {
  logout(): void;
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Dashboard: React.FC<Props> = ({ logout }) => (
  <View style={styles.main}>
    <Text>Dashboard</Text>
    <Button onPress={logout} title="Log out" />
  </View>
);

export default Dashboard;
