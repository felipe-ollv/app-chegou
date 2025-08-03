import HeaderComponent from "@/src/components/header/component";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";

export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <HeaderComponent logoText="Chegou" slogan="Aviso do condominio!" />
            <View style={styles.form}>
                <Text>AVISOS</Text>
                <Link href="(panel)/showcase/page">
                    <Text style={{ marginTop: 20 }}>Ir para notificaçoes</Text>
                </Link>
          </View>
        </View>
    )
}
