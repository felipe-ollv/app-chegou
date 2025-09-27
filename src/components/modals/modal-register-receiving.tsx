import colors from "@/colors-app/colors";
import { Controller, useForm } from "react-hook-form";
import { Modal, Pressable, View, TouchableOpacity, Text, TextInput } from "react-native";
import ToastComponent from "../toast/component";
import BasicLoading from '../loading/basic-loading';
import { useState } from "react";
import { useUser } from "../../context/user.context";
import api from "../../interceptor/axios-config";

type RegisterForm = {
	recipient: string;
	block: string;
	apartment: string;
	note: string;
	received: string;
};

export default function ModalRegisterReceiving({
	visible,
	onClose,
	onSuccessRegister
}: {
	visible: boolean;
	onClose: () => void;
	onSuccessRegister: () => void;
}) {

	const { userData } = useUser();
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<RegisterForm>({
		defaultValues: {
			recipient: "",
			block: "",
			apartment: "",
			note: "",
		},
	});

	const onSubmit = async (data: RegisterForm) => {
		try {
			setLoading(true);
			data.received = userData.ps;
			const inform: any = await api.post('/received-package/create-received-package', data);
			if (inform.data.error === 400) {
				ToastComponent({ type: 'warning', text1: "Falha!", text2: inform.data.message })
			} else {
				onClose();
				reset();
				setLoading(false)
				onSuccessRegister();
				ToastComponent({ type: 'success', text1: "Sucesso!", text2: "Recebimento registrado" })
			}

		} catch (e) {
			onClose();
			reset();
			setLoading(false)
			ToastComponent({ type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes" })
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
						Registrar encomenda recebida
					</Text>

					<View style={{ gap: 12 }}>

						{
							loading ? 
								<View style={{height: 100}}>
									<BasicLoading />
								</View> :
								<>
								<View>
									<Text style={{ fontSize: 14, marginBottom: 6 }}>Destinatário</Text>
									<Controller
										control={control}
										name="recipient"
										rules={{ required: "Destinatário" }}
										render={({ field: { onChange, value, onBlur } }) => (
											<TextInput
												placeholder="Nome de quem fez a compra"
												placeholderTextColor={colors.blacklight}
												style={{
													borderWidth: 1,
													borderColor: errors.recipient ? "#ef4444" : "#E5E7EB",
													borderRadius: 8,
													paddingHorizontal: 12,
													height: 44,
												}}
												value={value}
												onChangeText={onChange}
												onBlur={onBlur}
												autoCapitalize="words" />
										)} />
									{errors.recipient && (
										<Text style={{ color: "red", marginTop: 6 }}>
											{errors.recipient.message}
										</Text>
									)}
								</View>
								<View>
										<Text style={{ fontSize: 14, marginBottom: 6 }}>Torre/Bloco</Text>
										<Controller
											control={control}
											name="block"
											rules={{ required: "Torre/Bloco" }}
											render={({ field: { onChange, value, onBlur } }) => (
												<TextInput
													placeholder="Torre/Bloco"
													placeholderTextColor={colors.blacklight}
													style={{
														borderWidth: 1,
														borderColor: errors.block ? "#ef4444" : "#E5E7EB",
														borderRadius: 8,
														paddingHorizontal: 12,
														height: 44,
													}}
													value={value}
													onChangeText={onChange}
													onBlur={onBlur}
													autoCapitalize="characters" />
											)} />
										{errors.block && (
											<Text style={{ color: "red", marginTop: 6 }}>
												{errors.block.message}
											</Text>
										)}
									</View>
									<View>
										<Text style={{ fontSize: 14, marginBottom: 6 }}>Apartamento</Text>
										<Controller
											control={control}
											name="apartment"
											rules={{
												required: "Apartamento",
												minLength: { value: 1, message: "Informe o apartamento" },
											}}
											render={({ field: { onChange, value, onBlur } }) => (
												<TextInput
													placeholder="Número do apartamento"
													placeholderTextColor={colors.blacklight}
													style={{
														borderWidth: 1,
														borderColor: errors.apartment ? "#ef4444" : "#E5E7EB",
														borderRadius: 8,
														paddingHorizontal: 12,
														height: 44,
													}}
													value={value}
													onChangeText={(t) => onChange(t)}
													onBlur={onBlur}
													keyboardType="numeric" />
											)} />
										{errors.apartment && (
											<Text style={{ color: "red", marginTop: 6 }}>
												{errors.apartment.message}
											</Text>
										)}
									</View>
									<View>
										<Text style={{ fontSize: 14, marginBottom: 6 }}>Observações</Text>
										<Controller
											control={control}
											name="note"
											render={({ field: { onChange, value, onBlur } }) => (
												<TextInput
													placeholder="Ex: Retirar até as 21h"
													placeholderTextColor={colors.blacklight}
													multiline
													style={{
														borderWidth: 1,
														borderColor: "#E5E7EB",
														borderRadius: 8,
														paddingHorizontal: 12,
														paddingTop: 10,
														minHeight: 80,
														textAlignVertical: "top",
													}}
													value={value}
													onChangeText={onChange}
													onBlur={onBlur} />
											)} />
									</View>
								</>
						}
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
							onPress={onClose}
							disabled={isSubmitting}
							style={{
								paddingHorizontal: 14,
								height: 44,
								borderRadius: 8,
								borderWidth: 1,
								borderColor: "#E5E7EB",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#fff",
								opacity: isSubmitting ? 0.6 : 1,
							}}
						>
							<Text style={{ color: "#111" }}>Cancelar</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleSubmit(onSubmit)}
							style={{
								paddingHorizontal: 16,
								height: 44,
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: colors.green,
								opacity: isSubmitting ? 0.6 : 1,
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