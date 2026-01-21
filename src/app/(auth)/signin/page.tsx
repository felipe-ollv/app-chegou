import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
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
import PasswordInput from "../../../components/input/passwrod.input";
import AnimatedField from "../../../components/animations/fade.component";

export default function SigninScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();
  const [blockAutoLogin, setBlockAutoLogin] = useState(false);
  const [condominiumId, setValidateCode] = useState('');
  const params = useLocalSearchParams();
  const [showInput, setShowInput] = useState(false)

  const fromSignup = useMemo(
    () => params?.fromSignup === 'true',
    [params]
  );

  const handleValidateCode = async () => {
    if (condominiumId.length < 8) return;

    try {
      setLoading(true);

      const resp: any = await api.get("/condominium/find-condominium", { params: { condominiumId }});
      const data = resp.data;

      if (!data) {
        ToastComponent({
          type: "error",
          text1: "Código inválido",
          text2: "Condomínio não encontrado",
        });
        return;
      }

      router.push({
        pathname: "/(auth)/signup/page",
        params: {
          condominium: JSON.stringify(data),
        },
      });

    } catch (error) {
      ToastComponent({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível validar o código",
      });
    } finally {
      setLoading(false);
    }
  };

const hasHandledSignupRef = useRef(false);

useFocusEffect(
  useCallback(() => {
    if (fromSignup && !hasHandledSignupRef.current) {
      hasHandledSignupRef.current = true;

      setBlockAutoLogin(true);
      setPhone('');
      setPassword('');

    }
  }, [fromSignup])
);

  const handleLogin = async () => {

    if (blockAutoLogin) {
      return;
    }

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

  // const handleNavigate = (data?: any) => {
  //   router.push('./(auth)/signup/page');
  // };

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
              <PasswordInput value={password} onChangeText={setPassword} style=''/>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
          {/* <Text style={styles.link} onPress={handleNavigate}>
            Ainda não tem uma conta? Cadastre-se!
          </Text> */}

          {
            fromSignup ? null :
            <View style={{ marginTop: 56}}>
              <TouchableOpacity style={styles.buttonCode} onPress={() => setShowInput(!showInput)}>
                <Text style={styles.buttonText}>Código do condomínio!</Text>
              </TouchableOpacity>
              {
                showInput ?
                  <AnimatedField visible={showInput}>
                    <View style={{ marginTop: 16}}>
                    <TextInput
                      textAlign="center"
                      maxLength={8}
                      placeholder={'Digite o código fornecido ...'}
                      value={condominiumId}
                      onChangeText={(v) => setValidateCode(v)}
                      placeholderTextColor={colors.blacklight}
                      autoCorrect={false}
                      autoCapitalize="characters"
                      
                      style={{
                        borderWidth: 1,
                        borderColor: colors.gray,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingRight: 40,
                        height: 44,
                        fontSize: 16,
                        color: "#000",
                        marginBottom: 4
                      }}
                    >
                    </TextInput>
                    <Pressable 
                      style={{
                        marginTop: 14,
                        paddingHorizontal: 16,
                        height: 44,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: condominiumId.length < 8
                          ? colors.gray
                          : colors.green, 
                      }}
                      disabled={condominiumId.length < 8}
                      onPress={handleValidateCode}
                      
                    >
                      <Text style={styles.buttonText}>Confirmar</Text>
                    </Pressable>
                  </View> 
                  </AnimatedField>
                  :
                  null
                }
            </View>
          }
        </View>
      )}
    </View>
  );
}
