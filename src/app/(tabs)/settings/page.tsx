import HeaderComponent from '../../../components/header/component';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles';

export default function SettingsScreen() {
    return (
			<View style={styles.container}>
				<HeaderComponent logoText='Chegou' slogan='Recebidos!'/>
				<View style={styles.form}>
						<Text>Settings</Text>
				</View>
			</View>
    )
}