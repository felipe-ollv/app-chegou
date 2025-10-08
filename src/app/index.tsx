import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import api, { setToken } from '../interceptor/axios-config';
import { styles } from "../styles/index-styles";
import HeaderComponent from "../components/header/component";
import LoadingComponent from '../components/loading/component';
import ToastComponent from '../components/toast/component';
import formatPhoneNumber from "../utils/formatPhoneNumber";
import ActionStorage from "./(auth)/midleware/authStorage";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/user.context";
import colors from "../../colors-app/colors";
import { checkDeviceSupport } from "./service/check-identity-capability";
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();

  useEffect(() => {
    handleBiometricLogin();
  }, [])

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

  const handleBiometricLogin = async () => {
    const supported = await checkDeviceSupport();
    if (!supported) return;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para entrar',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
    });

    if (result.success) {
      handleExistToken();
    } else {
      ToastComponent({ type: 'warning', text1: 'Atenção!', text2: 'A autenticação falhou!'});
    }
  }

  const handleExistToken = async () => {
    setLoading(true);
    ActionStorage.getToken().then(token => {
      if (token) {
        setToken(token);
        const decoded = jwtDecode(token);
        setUserData(decoded);
        router.replace("/showcase/page");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }

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
