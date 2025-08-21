import HeaderComponent from "@/src/components/header/component";
import { Text, View } from "react-native";
import { notificationStyles } from "./styles";

export default function NotificationScreen() {
	return (
		<View style={notificationStyles.container}>
			<HeaderComponent logoText="Chegou" slogan="Aviso do condominio!" />
			<View style={notificationStyles.form}>
				<Text>AVISOS</Text>
			</View>
		</View>
	)
}
