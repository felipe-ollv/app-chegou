import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import styles from "./styles";
import HeaderComponent from "../components/header/component";
import LoadingComponent from '../components/loading/component';

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


  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Erro", "Preencha telefone e senha");
      return;
    }
    try {
      setLoading(true);
      let res: any
        res = await axios.post("http://localhost:3006/api/login/user", {
        phone_number: phone,
        password: password
      });

      console.log('res', res.data);

      setTimeout(() => {
        if (res.data.code === 'NOK') {
        Alert.alert('Atenção!', `${res.data.message}`, [
          {
            text: "OK",
          }
        ]); 
        setLoading(false);
      } else {
        router.push("/(panel)/showcase/page");
        setLoading(false);
      }
      }, 2000)
    } catch (err) {
      Alert.alert(
        "Erro",
        err.response?.data?.message || "Falha ao fazer login"
      );
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent logoText='Chegou' slogan='Descomplicando encomendas!'/>

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
          <Link href='./(auth)/signup/page' style={styles.link}>
            <Text>Ainda não tem uma conta? Cadastre-se!</Text>
          </Link>
        </View>
      }
    </View>
  );
}