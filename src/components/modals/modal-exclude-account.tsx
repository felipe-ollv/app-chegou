import colors from "@/colors-app/colors";
import { Modal, Pressable, View, TouchableOpacity, Text } from "react-native";
import ToastComponent from "../toast/component";
import BasicLoading from '../loading/basic-loading';
import { useState } from "react";
import { useUser } from "../../context/user.context";
import { useLogout } from '../../hooks/user-logout';
import api from "../../interceptor/axios-config";

export default function ModalExcludeAccount({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
}) {
	const { userData } = useUser();
	const [loading, setLoading] = useState(false);
	const { logout } = useLogout();

	const handleExcludeAccount = async () => {
		try {
			const result: any = await api.post('/user-profile/exclude-account', { up: userData.ps })
			if (result.data.code === 200) {
				ToastComponent({ type: 'success', text1: 'Sucesso!', text2: result.data.message })
				onClose();
				logout();
			} else {
				ToastComponent({ type: 'error', text1: 'Falha!', text2: result.data.message })
			}
		} catch (error) {
				ToastComponent({ type: 'error', text1: 'Erro!', text2: 'Aguarde alguns instantes' })
		}

	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={onClose}
		>
			<Pressable
				onPress={() => {
					onClose();
				}}
				style={{
					flex: 1,
					backgroundColor: "rgba(0,0,0,0.35)",
					justifyContent: "flex-end",
				}}
			>
				<Pressable
					onPress={() => { }}
					style={{
						backgroundColor: "#fff",
						borderTopLeftRadius: 16,
						borderTopRightRadius: 16,
						paddingHorizontal: 16,
						paddingTop: 12,
						paddingBottom: 24,
						maxHeight: "85%",
					}}
				>
					<View style={{ alignItems: "center", marginBottom: 8 }}>
						<View
							style={{
								width: 40,
								height: 4,
								borderRadius: 2,
								backgroundColor: "#D0D5DD",
							}} />
					</View>

					<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20, textAlign: 'center' }}>
						Certeza que quer excluir seu cadastro ?
					</Text>

					<View style={{ gap: 12 }}>
						<Text style={{ fontSize: 18, textAlign: 'center' }}>Atenção!</Text>
						<Text style={{ textAlign: 'center' }}>Todos os dados do seu perfil serão apagados.</Text>
					</View>

					<View
						style={{
							flexDirection: 'column',
							justifyContent: "flex-end",
							gap: 12,
							marginTop: 36,
						}}
					>
						{loading ? 
							<View style={{ height: 100}}>
								<BasicLoading />
							</View>
							 :
							<>
								<TouchableOpacity
									onPress={onClose}
									style={{
										paddingHorizontal: 14,
										height: 44,
										borderRadius: 8,
										borderWidth: 1,
										borderColor: "#E5E7EB",
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: "#fff",
									}}
								>
									<Text style={{ color: "#111" }}>Cancelar</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										setLoading(true),
											handleExcludeAccount()
									}}
									style={{
										paddingHorizontal: 16,
										height: 44,
										borderRadius: 8,
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: colors.green,
									}}
								>
									<Text style={{ color: "#fff", fontWeight: "600" }}>Confirmar</Text>
								</TouchableOpacity>
							</>
						}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}