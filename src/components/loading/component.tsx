import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../../../constants/colors';
import styles from './styles';

export default function LoadingComponent() {

  return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={colors.green} />
		</View>
  );
}