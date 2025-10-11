import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import api, { setToken } from '../../../interceptor/axios-config';
import { styles } from "../../../styles/index-styles";
import HeaderComponent from "../../../components/header/component";
import LoadingComponent from '../../../components/loading/component';
import ToastComponent from '../../../components/toast/component';
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import ActionStorage from "../midleware/authStorage";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../../context/user.context";
import colors from "../../../../colors-app/colors";


export default function SigninScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();

  const handleLogin = async () => {
    if (!phone || !password) {
      ToastComponent({ type: 'warning', text1: 'Atenção!', text2: 'Preencha telefone e senha'});
      return;
    }

    try {
      setLoading(true);

      const res: any = await api.post("/login/user", {
        phone_number: phone,
        password: password
      });

      const secret = res.data;

      await ActionStorage.saveToken(secret.token);

      setToken(secret.token);

      const decoded = jwtDecode(secret.token);
      setUserData(decoded);

      router.replace("/showcase/page");

    } catch (err: any) {
      ToastComponent({ type: 'error', text1: "Erro!", text2: 'Usuário ou senha inválidos' });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    router.push('./(auth)/signup/page');
  };

  return (
    <View style={styles.container}>
      {!loading && <HeaderComponent logoText='Chegou' slogan='Descomplicando encomendas!' />}

      {loading ? (
        <LoadingComponent />
      ) : (
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              placeholder="Seu telefone..."
              placeholderTextColor={colors.blacklight}
              style={styles.input}
              keyboardType='numeric'
              value={phone}
              onChangeText={t => setPhone(formatPhoneNumber(t))}
              maxLength={15}
            />
          </View>
          <View>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Sua senha..."
              placeholderTextColor={colors.blacklight}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
          <Text style={styles.link} onPress={handleNavigate}>
            Ainda não tem uma conta? Cadastre-se!
          </Text>
        </View>
      )}
    </View>
  );
}
