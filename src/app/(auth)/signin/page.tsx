import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import api, { setToken } from '../../../interceptor/axios-config';
import { styles } from '../../../styles/index-styles';
import HeaderComponent from '../../../components/header/component';
import LoadingComponent from '../../../components/loading/component';
import ToastComponent from '../../../components/toast/component';
import formatPhoneNumber from '../../../utils/formatPhoneNumber';
import ActionStorage from '../midleware/authStorage';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../../context/user.context';
import colors from '../../../../colors-app/colors';
import PasswordInput from '../../../components/input/passwrod.input';
import AnimatedField from '../../../components/animations/fade.component';

import { Text, TextInput } from "@/src/components/ui/typography";
export default function SigninScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();
  const [blockAutoLogin, setBlockAutoLogin] = useState(false);
  const [condominiumId, setValidateCode] = useState('');
  const params = useLocalSearchParams();
  const [showInput, setShowInput] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const fromSignup = useMemo(() => params?.fromSignup === 'true', [params]);

  useEffect(() => {
    if (showInput) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [showInput]);

  const handleValidateCode = async () => {
    if (condominiumId.length < 8) return;

    try {
      setLoading(true);

      const resp: any = await api.get('/condominium/find-condominium', { params: { condominiumId } });
      const data = resp.data;

      if (!data) {
        ToastComponent({ type: 'error', text1: 'Código inválido', text2: 'Condomínio não encontrado' });
        return;
      }

      router.push({ pathname: '/(auth)/signup/page', params: { condominium: JSON.stringify(data) } });
    } catch (error) {
      ToastComponent({ type: 'error', text1: 'Erro', text2: 'Não foi possível validar o código' });
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
    if (blockAutoLogin && !hasHandledSignupRef) return;

    hasHandledSignupRef.current = false;

    if (!phone || !password) {
      ToastComponent({ type: 'warning', text1: 'Atenção!', text2: 'Preencha telefone e senha' });
      return;
    }

    try {
      setLoading(true);

      const res: any = await api.post('/login/user', { phone_number: phone, password });
      const secret = res.data;

      await ActionStorage.saveToken(secret.token);
      setToken(secret.token);

      const decoded = jwtDecode(secret.token);
      setUserData(decoded);

      router.replace('/showcase/page');
    } catch (err: any) {
      ToastComponent({ type: 'error', text1: 'Erro!', text2: 'Usuário ou senha inválidos' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!loading && <HeaderComponent logoText='Chegou' slogan='Descomplicando encomendas!' />}

          {loading ? <LoadingComponent /> : (
            <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <View>
                  <Text style={styles.label}>Telefone</Text>
                  <TextInput placeholder='Seu telefone...' placeholderTextColor={colors.blacklight} style={styles.input} keyboardType='numeric' value={phone} onChangeText={t => setPhone(formatPhoneNumber(t))} maxLength={15} />
                </View>

                <View>
                  <Text style={styles.label}>Senha</Text>
                  <View style={{ position: 'relative', justifyContent: 'center' }}>
                    <PasswordInput value={password} onChangeText={setPassword} style='' />
                  </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => {
                  hasHandledSignupRef.current = true;
                  handleLogin();
                }}>
                  <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                {fromSignup ? null : (
                  <View style={{ marginTop: 56 }}>
                    <TouchableOpacity style={styles.buttonCode} onPress={() => setShowInput(!showInput)}>
                      <Text style={styles.buttonText}>Código do condomínio!</Text>
                    </TouchableOpacity>

                    {showInput && (
                      <AnimatedField visible={showInput}>
                        <View style={{ marginTop: 16 }}>
                          <TextInput textAlign='center' maxLength={8} placeholder='Digite o código fornecido ...' value={condominiumId} onChangeText={setValidateCode} placeholderTextColor={colors.blacklight} autoCorrect={false} autoCapitalize='characters' style={{ borderWidth: 1, borderColor: colors.gray, borderRadius: 8, paddingHorizontal: 12, height: 44, fontSize: 16, color: '#000', marginBottom: 4 }} />

                          <Pressable style={{ marginTop: 14, paddingHorizontal: 16, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: condominiumId.length < 8 ? colors.gray : colors.green }} disabled={condominiumId.length < 8} onPress={handleValidateCode}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                          </Pressable>
                        </View>
                      </AnimatedField>
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
