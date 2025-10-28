import HeaderComponent from "../../../components/header/component";
import { Text, View } from "react-native";
import { notificationStyles } from "../../../styles/notification-styles";
import UploadPdfComponent from "../../../components/pdf/pdf-document-note";
import { useUser } from "../../../context/user.context";

export default function NotificationScreen() {

	const userData = useUser();
	console.log('userdata', userData)

	return (
		<View style={notificationStyles.container}>
			<HeaderComponent logoText="Chegou" slogan="Avisos do condominio!" />
			<View style={notificationStyles.form}>
				<View style={notificationStyles.card}>
					<Text style={{fontWeight: 500, fontSize: 16, marginBottom: 2}}>Chegou!</Text>
					<Text>Abre aqui pra ver!</Text>
				</View>
				<View style={notificationStyles.card}>
					<Text style={{fontWeight: 500, fontSize: 16, marginBottom: 2}}>Chegou!</Text>
					<Text>Recebido pago!</Text>
				</View>
				{
					userData.ts === 'TRUSTEE' ?
					<View
						style={{
							position: "absolute",
							right: 1,
							bottom: 1,
							width: 1,
							height: 1,
							borderRadius: 28,
							justifyContent: "center",
						}}
					>
						<UploadPdfComponent />
					</View>
					: 
					null
				}
			</View>
		</View>
	)
}
