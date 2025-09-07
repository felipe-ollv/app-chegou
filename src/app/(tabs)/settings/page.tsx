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
				<View style={settingsStyles.card}>
					<View style={{ width: '100%', marginTop: 26 }}>
						<TouchableOpacity>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<MaterialIcons name="password" size={24} color={colors.zinc} />
									<Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 8 }}>Alterar Senha</Text>
								</View>
								<MaterialIcons name="arrow-forward-ios" size={16} color={colors.zinc} />
							</View>
						</TouchableOpacity>
						<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 40, marginTop: 2 }} />
						<TouchableOpacity>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<AntDesign name="customerservice" size={24} color={colors.zinc} />
								<Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 8 }}>Suporte/FAQ</Text>
								</View>
								<MaterialIcons name="arrow-forward-ios" size={16} color={colors.zinc} />
							</View>
						</TouchableOpacity>
						<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 40, marginTop: 2 }} />
						<TouchableOpacity>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<MaterialCommunityIcons name="information-outline" size={24} color={colors.zinc} />
								<Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 8 }}>Sobre o App</Text>
								</View>
								<MaterialIcons name="arrow-forward-ios" size={18} color={colors.zinc} />
							</View>
						</TouchableOpacity>
						<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 40, marginTop: 2 }} />
					</View>
				</View>
				
			</View>
			<Text style={{ backgroundColor: '#fff', textAlign: 'center' }}>Versāo 1.0.0</Text>
		</View>
	)
}