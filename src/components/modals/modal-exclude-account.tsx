import colors from "@/colors-app/colors";
import { Modal, Pressable, View, TouchableOpacity, Text } from "react-native";
import ToastComponent from "../toast/component";
import BasicLoading from '../loading/basic-loading';
import { useState } from "react";
import { useUser } from "../../context/user.context";
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

  const handleExcludeAccount = async () => {
    //chama endpoint para excluir conta 
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

					<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
						Certeza que quer excluir seu cadastro ?
					</Text>

					<View style={{ gap: 12 }}>

						
						</View>

					<View
						style={{
							flexDirection: 'column',
							justifyContent: "flex-end",
							gap: 12,
							marginTop: 36,
						}}
					>
						<TouchableOpacity
							onPress={() => handleExcludeAccount()}
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
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}