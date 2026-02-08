import colors from "@/colors-app/colors";
import { Modal, Pressable, View, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Text } from "@/src/components/ui/typography";
export default function ModalInformCode({
	visible,
	onClose,
	selected
}: {
	visible: boolean;
	onClose: () => void;
	selected: any
}) {

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
						Informar código de recebimento
					</Text>

					<View style={{ width: '100%', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
						<Ionicons name="information-circle-outline" size={24} color="black" />
						<Text>Código único para cada recebimento!</Text>
					</View>

					<View style={{ width: '100%', height: 160, justifyContent: 'center', alignItems: 'center' }}>

						<View style={{ alignItems: "center", marginVertical: 20, width: '100%', }}>
							<View
								style={{
									width: '50%',
									borderWidth: 2,
									borderColor: colors.green,
									padding: 8,
									borderRadius: 8,
								}}
							>
								<Text style={{ fontSize: 26, letterSpacing: 6, color: colors.zinc, textAlign: 'center' }}>
									{selected}
								</Text>
							</View>
						</View>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							gap: 12,
							marginTop: 16,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								onClose();
							}}
							style={{
								paddingHorizontal: 14,
								width: '100%',
								height: 44,
								borderRadius: 8,
								borderWidth: 1,
								borderColor: "#E5E7EB",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#fff",
							}}
						>
							<Text style={{ color: "#111" }}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}