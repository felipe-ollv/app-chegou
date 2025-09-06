import HeaderComponent from '../../../components/header/component';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { settingsStyles } from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '@/constants/colors';

export default function SettingsScreen() {
	return (
		<View style={settingsStyles.container}>
			<HeaderComponent logoText='Chegou' slogan='Recebidos!' />
			<View style={settingsStyles.form}>
				<View style={{ width: '100%' }}>
					<TouchableOpacity>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<MaterialIcons name="password" size={24} color={colors.zinc} />
							<Text style={{ fontSize: 18, fontWeight: 500 }}>Alterar Senha</Text>
							<MaterialIcons name="arrow-forward-ios" size={16} color={colors.zinc} />
						</View>
					</TouchableOpacity>
					<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 40, marginTop: 2 }} />
					<TouchableOpacity>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<AntDesign name="customerservice" size={24} color={colors.zinc} />
							<Text style={{ fontSize: 18, fontWeight: 500 }}>Suporte/FAQ</Text>
							<MaterialIcons name="arrow-forward-ios" size={16} color={colors.zinc} />
						</View>
					</TouchableOpacity>
					<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 40, marginTop: 2 }} />
					<TouchableOpacity>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<MaterialCommunityIcons name="information-outline" size={24} color={colors.zinc} />
							<Text style={{ fontSize: 18, fontWeight: 500 }}>Sobre o App</Text>
							<MaterialIcons name="arrow-forward-ios" size={18} color={colors.zinc} />
						</View>
					</TouchableOpacity>
					<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 40, marginTop: 2 }} />
				</View>
			</View>
		</View>
	)
}