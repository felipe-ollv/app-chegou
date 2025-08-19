import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import api from '../../interceptor/axios-config';
import { View, Text, TouchableOpacity, ScrollView, Pressable, Modal, TextInput } from "react-native";
import HeaderComponent from '../../../components/header/component';
import InfoCardComponent from "../../../components/card/component";
import formatDateTime from '../../utils/formatDateTime';

import colors from "@/constants/colors";
import { styles } from "./styles";
import { getItem } from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";

type RegisterForm = {
  recipient: string;
  block: string;
  apartment: string;
  notes: string;
};

export default function ShowcaseScreen() {
  const [receivedView, setLadoSelecionado] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [cardsData, setCardsData] = useState<any[]>([]);

  useEffect(() => {
    const t = getItem('secret');
    console.log('TOKEN', t)

    const fetchPackageList = async () => {
      const res: any = await api.get('/received-package/find-received-package/2ec65ee0-708e-499c-8268-ef1679cccea5')
      console.log('RES', res.data);
      setCardsData(res.data);
    }

    fetchPackageList();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    defaultValues: {
      recipient: "",
      block: "",
      apartment: "",
      notes: "",
    },
  });

  const openRegisterModal = () => {
    setRegisterVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterVisible(false);
    reset();
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      const inform: any = await api.post('/received-package/create-received-package', data);
      console.log("resp:", inform.data);
      closeRegisterModal();
    } catch (e) {
      console.log("Erro ao registrar:", e);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent logoText="Chegou" slogan="" />
      <View style={styles.form}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginTop: 16,
            marginBottom: receivedView ? 5 : 10,
            borderBottomWidth: 2,
            borderBottomColor: colors.green,
            paddingBottom: 8,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: receivedView ? colors.green : "#e0e0e0",
              borderRadius: 8,
              paddingVertical: 3,
              marginRight: 2,
            }}
            onPress={() => setLadoSelecionado(!receivedView)}
          >
            <Text
              style={{
                color: receivedView ? "#fff" : "#222",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Recebi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: !receivedView ? colors.green : "#e0e0e0",
              borderRadius: 8,
              paddingVertical: 3,
              marginLeft: 2,
            }}
            onPress={() => setLadoSelecionado(!receivedView)}
          >
            <Text
              style={{
                color: !receivedView ? "#fff" : "#222",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Receberam
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, width: '100%', paddingHorizontal: 1 }}>
          {cardsData.map((item) => (
            <InfoCardComponent
              key={item.uuid_package}
              title={`${item.condominium_name} ${item.apartment_block} ${item.apartment}`}
              receivedBy={`${item.name}`}
              receivedDate={formatDateTime(item.created_at)}
              extra={item.status_package === "RECEIVED" ? "PENDENTE" : "RECEBIDO"}
            />
          ))}
        </ScrollView>

      </View>
      <TouchableOpacity
        onPress={openRegisterModal}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.green,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 6,
        }}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={registerVisible}
        animationType="slide"
        transparent
        onRequestClose={closeRegisterModal}
      >
        <Pressable
          onPress={closeRegisterModal}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={() => { }}
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 24,
              maxHeight: "85%",
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 8 }}>
              <View
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "#D0D5DD",
                }}
              />
            </View>

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
              Registrar recebimento
            </Text>

            <ScrollView
              style={{ maxHeight: "80%" }}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              <View style={{ gap: 12 }}>
                <View>
                  <Text style={{ fontSize: 14, marginBottom: 6 }}>Destinatário</Text>
                  <Controller
                    control={control}
                    name="recipient"
                    rules={{ required: "Destinatário" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Nome de quem fez a compra"
                        style={{
                          borderWidth: 1,
                          borderColor: errors.recipient ? "#ef4444" : "#E5E7EB",
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          height: 44,
                        }}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="words"
                      />
                    )}
                  />
                  {errors.recipient && (
                    <Text style={{ color: "red", marginTop: 6 }}>
                      {errors.recipient.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text style={{ fontSize: 14, marginBottom: 6 }}>Torre/Bloco</Text>
                  <Controller
                    control={control}
                    name="block"
                    rules={{ required: "Torre/Bloco" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Torre/Bloco"
                        style={{
                          borderWidth: 1,
                          borderColor: errors.block ? "#ef4444" : "#E5E7EB",
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          height: 44,
                        }}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="characters"
                      />
                    )}
                  />
                  {errors.block && (
                    <Text style={{ color: "red", marginTop: 6 }}>
                      {errors.block.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text style={{ fontSize: 14, marginBottom: 6 }}>Apartamento</Text>
                  <Controller
                    control={control}
                    name="apartment"
                    rules={{
                      required: "Apartamento",
                      minLength: { value: 1, message: "Informe o apartamento" },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Número do apartamento"
                        style={{
                          borderWidth: 1,
                          borderColor: errors.apartment ? "#ef4444" : "#E5E7EB",
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          height: 44,
                        }}
                        value={value}
                        onChangeText={(t) => onChange(t)}
                        onBlur={onBlur}
                        keyboardType="numeric"
                      />
                    )}
                  />
                  {errors.apartment && (
                    <Text style={{ color: "red", marginTop: 6 }}>
                      {errors.apartment.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text style={{ fontSize: 14, marginBottom: 6 }}>Observações</Text>
                  <Controller
                    control={control}
                    name="notes"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Ex: Retirar até as 21h"
                        multiline
                        style={{
                          borderWidth: 1,
                          borderColor: "#E5E7EB",
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          paddingTop: 10,
                          minHeight: 80,
                          textAlignVertical: "top",
                        }}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
              </View>
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                onPress={closeRegisterModal}
                disabled={isSubmitting}
                style={{
                  paddingHorizontal: 14,
                  height: 44,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                <Text style={{ color: "#111" }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                style={{
                  paddingHorizontal: 16,
                  height: 44,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.green,
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
