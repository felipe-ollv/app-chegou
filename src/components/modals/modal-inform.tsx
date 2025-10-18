import colors from "@/colors-app/colors";
import { Modal, Pressable, View, TouchableOpacity, Text, Linking } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import ToastComponent from "../toast/component";

const phoneNumber = '+5511941076151';
const email = 'falipe@app-chegou.com.br';

export default function ModalInform({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
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
						Apenas para condomínios credenciados!
					</Text>

					<View style={{ width: '100%', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
						<Ionicons name="information-circle-outline" size={24} color="black" />
						<Text>Indique/Solicite no seu condomínio!</Text>
					</View>

          <View style={{ flexDirection: 'row', width: '100%', height: 140, justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                const url = `https://wa.me/${phoneNumber}`;
                Linking.openURL(url).catch(() =>
                  ToastComponent({ type: 'error', text1: 'Erro', text2: 'Não foi possível abrir o Whatsapp' })
                );
              }}
              style={{
                paddingHorizontal: 16,
                height: 44,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor: colors.green,
                opacity: 1,
              }}
            >
              <Ionicons name="logo-whatsapp" size={20} color="white" />
              <Text style={{ color: "#fff", fontWeight: "600" }}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const url = `mailto:${email}`;
                Linking.openURL(url).catch(() =>
                  ToastComponent({ type: 'error', text1: 'Erro', text2: 'Não foi possível abrir o app de Email' })
                );
              }}
              style={{
                paddingHorizontal: 16,
                height: 44,
                width: 126,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor: colors.green,
                opacity: 1,
              }}
            >
              <Ionicons name="mail-outline" size={20} color="white" />
              <Text style={{ color: "#fff", fontWeight: "600" }}>Email</Text>
            </TouchableOpacity>
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