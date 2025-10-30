import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useRouter } from "expo-router";
import api from '../../../interceptor/axios-config';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useForm, Controller } from "react-hook-form";
import SelectDropdown from "react-native-select-dropdown";
import BasicLoading from "@/src/components/loading/basic-loading";
import formatPhoneNumber from '../../../utils/formatPhoneNumber';
import ToastComponent from '../../../components/toast/component';
import styles from "./styles";
import HeaderComponent from "../../../components/header/component";
import ModalInform from "../../../components/modals/modal-inform";
import colors from "../../../../colors-app/colors";

type FormData = {
  name: string;
  // lastName: string;
  condominium: string;
  apartment: string;
  apartment_block: string;

  phone_number: string;
  type_profile: string;
  status: string;
  password: string;
};

const profileList = [
  "MORADOR(A)",
  "FUNCIONARIO(A)"
]

export default function SignUpScreen() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [condominiumList, setCondominiumList] = useState([]);
  const [modalInformVisible, setModalInformVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const findCondominium = async () => {
      const conds: any = await api.get(`/condominium/find-condominium/${'e860e23c-fab2-4f8d-8078-38a96ba956d3'}`);
      if (conds.data.code === 204) {
        setModalInformVisible(true)
      } else {
        setCondominiumList(conds.data);
      }
    }

    findCondominium();
  }, [])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      // lastName: "",
      apartment: "",
      apartment_block: "",
      condominium: "",
      phone_number: "",
      type_profile: "",
      status: "",
      password: "",
    },
  });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onSubmit = async (form: FormData) => {
    try {
      setLoading(true)
      const data = await api.post("/user/register-user", {
        ...form,
        birthdate: date.toISOString().split("T")[0],
        status: 'ACTIVE'
      });

      console.log(data.data)

      if (data) {
        ToastComponent({ type: 'success', text1: 'Sucesso!', text2: 'Perfil registrado!'});
        router.push('/');
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      ToastComponent({ type: 'error', text1: 'Erro!', text2: 'Aguarde alguns instantes'});
    } finally {
      setLoading(false)
    }
  };

  return (

    <View style={styles.container}>
      <HeaderComponent logoText="Chegou" slogan="Criando sua conta!" />
      {
        loading ? <BasicLoading />
          :
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 24}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.form}>
                <View>
                  <Text style={styles.label}>Nome</Text>
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: "Nome obrigatório" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Seu nome..."
                        placeholderTextColor={colors.blacklight}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.name && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.name.message}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Condomínio</Text>
                  <Controller
                    control={control}
                    name="condominium"
                    rules={{ required: "Condomínio obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                      <SelectDropdown
                        data={condominiumList}
                        onSelect={(selectedItem) => {
                          onChange(selectedItem.uuid_condominium);
                        }}
                        defaultValue={value}
                        renderButton={(selectedItem) => (
                          <View style={styles.input}>
                            <Text style={{ color: selectedItem ? "#000" : "#999" }}>
                              {selectedItem?.condominium_name ?? "Selecione seu condomínio"}
                            </Text>
                          </View>
                        )}
                        renderItem={(item, index, isSelected) => (
                          <View
                            style={{
                              padding: 10,
                              backgroundColor: isSelected ? "#edf4ff" : "#fff",
                            }}
                          >
                            <Text style={{ color: "#333" }}>{item.condominium_name}</Text>
                          </View>
                        )}
                        dropdownStyle={{
                          borderRadius: 8,
                        }}
                      />
                    )}
                  />
                  {errors.condominium && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.condominium.message}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Apartamento</Text>
                  <Controller
                    control={control}
                    name="apartment"
                    rules={{ required: "Apartamento obrigatório" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Seu apartamento..."
                        placeholderTextColor={colors.blacklight}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.apartment && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.apartment.message}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Bloco/Torre</Text>
                  <Controller
                    control={control}
                    name="apartment_block"
                    rules={{ required: "Bloco/Torre obrigatório" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Seu bloco/Torre..."
                        placeholderTextColor={colors.blacklight}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.name && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.name.message}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Perfil</Text>
                  <Controller
                    control={control}
                    name="type_profile"
                    rules={{ required: "Perfil obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                      <SelectDropdown
                        data={profileList}
                        onSelect={(selectedItem) => {
                          onChange(selectedItem);
                        }}
                        defaultValue={value}
                        renderButton={(selectedItem) => (
                          <View style={styles.input}>
                            <Text style={{ color: selectedItem ? "#000" : "#999" }}>
                              {selectedItem ?? "Selecione seu perfil"}
                            </Text>
                          </View>
                        )}
                        renderItem={(item, index, isSelected) => (
                          <View
                            style={{
                              padding: 10,
                              backgroundColor: isSelected ? "#edf4ff" : "#fff",
                            }}
                          >
                            <Text style={{ color: "#333" }}>{item}</Text>
                          </View>
                        )}
                        dropdownStyle={{
                          borderRadius: 8,
                        }}
                      />
                    )}
                  />
                  {errors.type_profile && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.type_profile.message}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Data de Nascimento</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                      style={styles.input}
                      placeholder="Seu Aniversário..."
                      editable={false}
                      pointerEvents="none"
                      value={date.toLocaleDateString("pt-BR")}
                    />
                  </TouchableOpacity>
                  {showPicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      locale="pt-BR"
                      maximumDate={new Date()}
                      onChange={onChangeDate}
                    />
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Telefone</Text>
                  <Controller
                    control={control}
                    name="phone_number"
                    rules={{
                      required: "Telefone obrigatório",
                      minLength: {
                        value: 8,
                        message: "Telefone inválido (mín. 10 dígitos)",
                      },
                      pattern: {
                        value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                        message: 'Formato: (99) 99999-9999'
                      },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Digite seu telefone..."
                        placeholderTextColor={colors.blacklight}
                        keyboardType="numeric"
                        value={formatPhoneNumber(value)}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.phone_number && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.phone_number.message}</Text>
                  )}
                </View>

                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>Senha</Text>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: "Senha obrigatória",
                      minLength: {
                        value: 6,
                        message: "Senha deve ter pelo menos 6 caracteres",
                      },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha..."
                        placeholderTextColor={colors.blacklight}
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.password && (
                    <Text style={{ color: "red", marginBottom: 12 }}>{errors.password.message}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
      }
      <ModalInform 
        visible={modalInformVisible}
        onClose={() => setModalInformVisible(false)}
      />
    </View>
  );
}
