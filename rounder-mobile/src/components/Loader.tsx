/**
 * @class Loader
 * @description a full screen loader
 */

import React from 'react';
import {
  Modal, Text, StyleSheet, View, ActivityIndicator,
} from 'react-native';

export interface Props {
  visible: boolean;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const Loader: React.FC<Props> = ({ visible }) => (
  <Modal
    transparent
    animationType="none"
    visible={visible}
  >
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        animating={visible}
      />
    </View>
  </Modal>
);

export default Loader;
