/**
 * @class Tabs
 * @description A tabs component
 */

import React, { useState, useContext, useCallback } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';

interface Tab {
  label: string;
  render(): JSX.Element;
}

export interface Props {
  tabs: Tab[];
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  tabsWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    padding: 10,
    borderColor: '#333',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: '#eee',
    marginRight: 5,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#fff',
    top: 1,
  },
  tabsContent: {
    paddingTop: 20,
  },
});

const Tabs: React.FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const bindTouch = useCallback((index: number): () => void => (): void => {
    setActiveTab(index);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabsWrapper}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            onPress={bindTouch(index)}
            style={index === activeTab ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            key={tab.label}
          >
            <Text>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tabsContent}>
        {tabs[activeTab].render()}
      </View>
    </View>
  );
};

export default Tabs;
