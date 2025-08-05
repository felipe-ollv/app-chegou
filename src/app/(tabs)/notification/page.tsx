import HeaderComponent from "@/src/components/header/component";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function NotificationScreen() {
	return (
		<View style={styles.container}>
				<HeaderComponent logoText="Chegou" slogan="Aviso do condominio!" />
				<View style={styles.form}>
						<Text>AVISOS</Text>
			</View>
		</View>
	)
}
