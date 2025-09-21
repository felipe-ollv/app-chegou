import HeaderComponent from '../../../components/header/component';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { settingsStyles } from '../../../styles/settings-styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../../../colors-app/colors';
import ModalTermsAndPrivacy from '../../../components/modals/modal-terms-privacy';
import ModalSuport from '../../../components/modals/modal-suport';
import ModalChangePassword from '../../../components/modals/modal-change-password';

export default function SettingsScreen() {
	const [modalTermsVisible, setModalTermsVisible] = useState(false);
	const [modalSuportVisible, setModalSuportVisible] = useState(false);
	const [modalChangePasswordVisible, setModalChangePasswordVisible] = useState(false);
	
	return (
		<View style={settingsStyles.container}>
			<HeaderComponent logoText='Chegou' slogan='Recebidos!' />
			<View style={settingsStyles.form}>
				<View style={settingsStyles.card}>
					<View style={{ width: '100%' }}>
						<TouchableOpacity onPress={() => setModalChangePasswordVisible(true)}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<MaterialIcons name="password" size={22} color={colors.zinc} />
									<Text style={{ fontSize: 16, marginLeft: 22 }}>Alterar Senha</Text>
								</View>
								<MaterialIcons name="arrow-forward-ios" size={14} color={colors.zinc} />
							</View>
						</TouchableOpacity>
						<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 20, marginTop: 20 }} />
						<TouchableOpacity onPress={() => setModalSuportVisible(true)}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<AntDesign name="customerservice" size={22} color={colors.zinc} />
								<Text style={{ fontSize: 16, marginLeft: 22 }}>Suporte/Atendimento</Text>
								</View>
								<MaterialIcons name="arrow-forward-ios" size={14} color={colors.zinc} />
							</View>
						</TouchableOpacity>
						<View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 20, marginTop: 20 }} />
						<TouchableOpacity onPress={() => setModalTermsVisible(true)}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<MaterialCommunityIcons name="information-outline" size={22} color={colors.zinc} />
								<Text style={{ fontSize: 16, marginLeft: 22 }}>Sobre o App</Text>
								</View>
								<MaterialIcons name="arrow-forward-ios" size={14} color={colors.zinc} />
							</View>
							
						</TouchableOpacity>
						<ModalTermsAndPrivacy
							visible={modalTermsVisible}
							onClose={() => setModalTermsVisible(false)}
						/>
						<ModalSuport 
							visible={modalSuportVisible}
							onClose={() => setModalSuportVisible(false)}
						/>
						<ModalChangePassword 
							visible={modalChangePasswordVisible}
							onClose={() => setModalChangePasswordVisible(false)}
						/>
					</View>
				</View>
			</View>
		</View>
	)
}