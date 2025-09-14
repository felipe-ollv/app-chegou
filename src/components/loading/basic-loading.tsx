import colors from '../../../colors-app/colors';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function BasicLoading() {
  const size = 'large' 
  const color = colors.green 

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});