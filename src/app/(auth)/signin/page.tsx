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
import { Ionicons } from "@expo/vector-icons";


export default function SigninScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();
  const [showPassword, setShowPassword] = useState(false);


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
            <View style={{ position: "relative", justifyContent: "center" }}>
              <TextInput
                placeholder="Sua senha..."
                placeholderTextColor={colors.blacklight}
                secureTextEntry={!showPassword}
                style={[
                  styles.input,
                  { 
                    paddingRight: 40,
                    fontFamily: undefined // <-- fix no Android
                  }
                ]}
                value={password}
                onChangeText={setPassword}
                textContentType="password"
                autoComplete="password"
                autoCorrect={false}
                autoCapitalize="none"
                importantForAutofill="no"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={{
                  position: "absolute",
                  right: 10,
                  padding: 6,
                  top: 8,
                }}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={colors.blacklight}
                />
              </TouchableOpacity>
            </View>
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
