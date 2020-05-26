/**
 * @class Dashboard
 * @description Main landing for user when they log in
 */

import React from 'react';
import {
  Text, StyleSheet, View, Button,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks'; import { gql } from 'apollo-boost';
import { User } from 'rounder-shared';


interface Props {
  logout(): void;
}

const USER = gql`
  {
    user {
      email
      trips {
        name
      }
    }
  }
`;

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Dashboard: React.FC<Props> = ({ logout }) => {
  const { loading, error, data } = useQuery<User>(USER);

  let content;

  if (loading) {
    content = <Text>Loading dashboard...</Text>;
  } else if (error) {
    content = <Text>Error loading dashboard</Text>;
  } else if (data) {
    content = (
      <View>
        <Text>{data.email}</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      {content}
      <Button onPress={logout} title="Log out" />
    </View>
  );
};

export default Dashboard;
