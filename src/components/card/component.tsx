import colors from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoCardComponent({ title, description, extra }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>
        <Text style={{ fontWeight: 600}}>Recebido por:</Text> Felipe</Text>
      <Text style={styles.desc}>
        <Text style={{ fontWeight: 600}}>Dia:</Text> 01/08/2025 às 17:37h</Text>
      <Text style={styles.desc}>
        <Text style={{ fontWeight: 600}}>Retirar no:</Text> Amaná A 205</Text>
      {extra ? <Text style={styles.extra}>{extra}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 16,
    width: '100%',
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
    marginTop: 10,
    fontSize: 13,
    color: colors.orange,
  }
});
