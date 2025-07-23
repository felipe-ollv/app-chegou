import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import colors from "../../constants/colors";
import HeaderComponent from "../components/header/component";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent logoText='Chegou' slogan='Descomplicando suas encomendas!'/>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            placeholder="Seu telefone..."
            style={styles.input}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Sua senha..."
            secureTextEntry
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <Link href='./(auth)/signup/page' style={styles.link}>
          <Text>Ainda não tem uma conta? Cadastre-se!</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc
  },
  header: {
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14
  }, 
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8
  },
  slogan: {
    fontSize: 28,
    color: colors.white,
    marginBottom: 34
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14
  }, 
  label: {
    color: colors.zinc,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14
  },
  button: {
    backgroundColor: colors.green,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 16,
    textAlign: 'center'
  }
});