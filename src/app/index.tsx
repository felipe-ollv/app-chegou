import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import api, { setToken } from './interceptor/axios-config';
import { styles } from "./styles";
import HeaderComponent from "../components/header/component";
import LoadingComponent from '../components/loading/component';
import ActionStorage from "./(auth)/midleware/authStorage";
import { jwtDecode } from "jwt-decode";
import { useUser } from "./context/user.context";

function formatPhoneNumber(value: any) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    .slice(0, 15);
}

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userData, setUserData } = useUser();

  useEffect(() => {
    if (userData) {
      router.push("/showcase/page");
    }
  }, [userData]);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Atenção!", "Preencha telefone e senha");
      return;
    }
    try {
      setLoading(true);
      let res: any
      res = await api.post("/login/user", {
        phone_number: phone,
        password: password
      });

      const secret = res.data as string;
      await ActionStorage.saveToken(secret);
      setToken(secret);

      if (secret) {
        const decoded = jwtDecode(secret);
        setUserData(decoded);
      }

      if (res.data.code === 'NOK') {
        Alert.alert('Atenção!', `${res.data.message}`, [
          {
            text: "OK",
          }
        ]);
        setLoading(false);
      } else if (secret) {
        router.push("/showcase/page");
        setLoading(false);
      }

    } catch (err) {
      Alert.alert(
         "Falha ao fazer login"
      );
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    router.push('./(auth)/signup/page');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent logoText='Chegou' slogan='Descomplicando encomendas!' />

      {
        loading ? <LoadingComponent /> :
          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                placeholder="Seu telefone..."
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
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
              <Text 
                style={styles.link}
                onPress={handleNavigate}
              >
                Ainda não tem uma conta? Cadastre-se!
              </Text>
          </View>
      }
    </View>
  );
}

