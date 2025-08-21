import HeaderComponent from '../../../components/header/component';
import React from 'react';
import { View, Text } from 'react-native';
import { settingsStyles } from './styles';

export default function SettingsScreen() {
    return (
			<View style={settingsStyles.container}>
				<HeaderComponent logoText='Chegou' slogan='Recebidos!'/>
				<View style={settingsStyles.form}>
						<Text>Settings</Text>
				</View>
			</View>
    )
}