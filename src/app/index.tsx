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

import SigninScreen from "./(auth)/signin/page";

export default function InitScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setUserData } = useUser();

  useEffect(() => {
    handleBiometricLogin();
  }, [])

  const handleBiometricLogin = async () => {
    const supported = await checkDeviceSupport();

    if (!supported) {
      setLoading(false);
      router.replace('./(auth)/signin/page');
      return;
    }  

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para entrar',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
    });

    if (result.success) {
      handleExistToken();
    } else {
      ToastComponent({ type: 'warning', text1: 'Atenção!', text2: 'A autenticação falhou!'});
      setLoading(false)
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
      {!loading ? (
        <LoadingComponent />
      ) : (
        <SigninScreen />
      )}
    </View>
  );
}
