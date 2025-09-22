import colors from "@/colors-app/colors";
import { useState } from "react";
import { Modal, Pressable, View, TouchableOpacity, Text, TextInput } from "react-native";

export default function ModalConfirmationCode({
	visible,
	onClose,
	selected
}: {
	visible: boolean;
	onClose: () => void;
	selected: any
}) {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);

	const handleChange = (value: any, index: any) => {
		if (/^\d$/.test(value) || value === "") {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
		}
	};

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
						Confirmar código de recebimento
					</Text>

					<View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								padding: 20,
								backgroundColor: "#fff",
							}}
						>

							{/* Inputs OTP */}
							<View style={{ flexDirection: "row", gap: 15 }}>
								{otp.map((digit, index) => (
									<TextInput
										key={index}
										value={digit}
										onChangeText={(value) => handleChange(value, index)}
										keyboardType="number-pad"
										maxLength={1}
										style={{
											width: 35,
											height: 40,
											textAlign: "center",
											fontSize: 24,
											borderWidth: 1,
											borderColor: colors.green,
											borderRadius: 8,
										}}
									/>
								))}
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

						<TouchableOpacity
							// onPress={handleSubmit(onSubmit)}
							// disabled={isSubmitting}
							style={{
								paddingHorizontal: 16,
								height: 44,
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: colors.green,
								// opacity: isSubmitting ? 0.6 : 1,
							}}
						>
							<Text style={{ color: "#fff", fontWeight: "600" }}>Confirmar</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}