import colors from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoCardComponent({ title, receivedBy, receivedDate, extra }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>
        <Text style={{ fontWeight: 600}}></Text>{receivedBy}
      </Text>
      <Text style={styles.desc}>
        <Text style={{ fontWeight: 600}}></Text>{receivedDate}
      </Text>
      
      {extra ? <Text style={styles.extra}>{extra}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    padding: 16,
    width: '100%',
    marginTop: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#222',
  },
  desc: {
    fontSize: 15,
    color: '#4a4a4a',
    marginBottom: 4
  },
  extra: {
    marginTop: 12,
    fontSize: 14,
    color: '#99CF1D',
    fontWeight: '500',
    backgroundColor: 'rgba(153, 207, 29, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  }
});
