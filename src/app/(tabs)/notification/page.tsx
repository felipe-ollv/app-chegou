import HeaderComponent from "@/src/components/header/component";
import { Text, View } from "react-native";
import { notificationStyles } from "./styles";

export default function NotificationScreen() {
	return (
		<View style={notificationStyles.container}>
			<HeaderComponent logoText="Chegou" slogan="Aviso do condominio!" />
			<View style={notificationStyles.form}>
				<View style={notificationStyles.card}>
					<Text style={{fontWeight: 500, fontSize: 16, marginBottom: 2}}>Chegou!</Text>
					<Text>Abre aqui pra ver!</Text>
				</View>
				<View style={notificationStyles.card}>
					<Text style={{fontWeight: 500, fontSize: 16, marginBottom: 2}}>Chegou!</Text>
					<Text>Recebido pago!</Text>
				</View>
			</View>
		</View>
	)
}
