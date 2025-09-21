import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import api from '../../../interceptor/axios-config';
import { View, Text, TouchableOpacity, ScrollView, Pressable, Modal, TextInput } from "react-native";
import HeaderComponent from '../../../components/header/component';
import InfoCardComponent from "../../../components/card/component";
import BasicLoading from '../../../components/loading/basic-loading';
import formatDateTime from '../../../utils/formatDateTime';
import ToastComponent from '../../../components/toast/component';
import colors from "../../../../colors-app/colors";
import { showcaseStyles } from "../../../styles/showcase-styles";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "../../../context/user.context";

type RegisterForm = {
  recipient: string;
  block: string;
  apartment: string;
  note: string;
  received: string;
};

const listPackage = {
  sameUser: [],
  ownerLogged: [],
  loggedReceiverUser: [],
  ordinance: false
}

export default function ShowcaseScreen() {
  const [loading, setLoading] = useState(true);
  const [receivedView, setLadoSelecionado] = useState(0);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [awaiting, setAwaiting] = useState(false);
  const [cardsData, setCardsData] = useState(listPackage);
  const { userData } = useUser();

  useEffect(() => {
    fetchPackageList();
  }, []);

  const fetchPackageList = async () => {
    try {
      setLoading(true)
      const res: any = await api.get(`/received-package/find-received-package/${userData.ps}`)
      console.log(res.data)
      setCardsData(res.data);
    } catch (error) {
      ToastComponent({ type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes" })
    } finally {
      setLoading(false)
    }
  }

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
      note: "",
    },
  });

  const openAwaitingModal = () => {
    setAwaiting(true);
  };

  const closeAwaitingModal = () => {
    setAwaiting(false);
    reset();
  };

  const openRegisterModal = () => {
    setRegisterVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterVisible(false);
    reset();
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: any, index: any) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      data.received = userData.ps;
      const inform: any = await api.post('/received-package/create-received-package', data);
      if (inform.data.error === 400) {
        closeRegisterModal();
        ToastComponent({ type: 'warning', text1: "Falha!", text2: inform.data.message })
      } else {
        fetchPackageList();
        closeRegisterModal();
        ToastComponent({ type: 'success', text1: "Sucesso!", text2: "Recebimento registrado" })
      }

    } catch (e) {
      ToastComponent({ type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes" })
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={showcaseStyles.container}>
      <HeaderComponent logoText="Chegou" slogan="" />

      {loading ?
        <BasicLoading />
        :
        <><View style={showcaseStyles.form}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              marginTop: 16,
              borderBottomWidth: 2,
              borderBottomColor: colors.green,
              paddingBottom: 8,
            }}
          >

            {!cardsData.ordinance ?
              <><TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: receivedView === 0 ? colors.green : "#e0e0e0",
                  borderRadius: 8,
                  paddingVertical: 3,
                  marginRight: 2,
                }}
                onPress={() => setLadoSelecionado(0)}
              >
                <Text
                  style={{
                    color: receivedView === 0 ? "#fff" : "#222",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Retirar
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0",
                    borderRadius: 8,
                    paddingVertical: 3,
                    marginLeft: 2,
                  }}
                  onPress={() => setLadoSelecionado(1)}
                >
                  <Text
                    style={{
                      color: receivedView === 1 ? "#fff" : "#222",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Entregar
                  </Text>
                </TouchableOpacity></>
              :
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0",
                  borderRadius: 8,
                  paddingVertical: 3,
                  marginLeft: 2,
                }}
                onPress={() => setLadoSelecionado(1)}
              >
                <Text
                  style={{
                    color: receivedView === 1 ? "#fff" : "#222",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Entregar
                </Text>
              </TouchableOpacity>}

          </View>

          <ScrollView style={{ flex: 1, width: '100%', paddingHorizontal: 1 }}>
            {receivedView === 0 ?
              cardsData.loggedReceiverUser.length > 0 ?
                cardsData.loggedReceiverUser.map((item: any) => (
                  <><TouchableOpacity onPress={openAwaitingModal}>
                    <InfoCardComponent
                      key={item.uuid_package}
                      title={`Condomínio: ${item.condominium_name} ${item.blockOwner} ${item.apartmentOwner}`}
                      receivedBy={`Recebido por: ${item.ownerName}`}
                      receivedDate={`Data: ${formatDateTime(item.created_at)}`}
                      status_package={item.status_package} />
                  </TouchableOpacity><Modal
                    visible={awaiting}
                    animationType="slide"
                    transparent
                    onRequestClose={closeAwaitingModal}
                  >
                      <Pressable
                        onPress={closeAwaitingModal}
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
                              }} />
                          </View>

                          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                            Informar código de entrega
                          </Text>

                          <ScrollView
                            style={{ height: "30%" }}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{ paddingBottom: 8 }}
                          >
                            <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                              <View
                                style={{
                                  borderWidth: 2,
                                  borderColor: colors.green,
                                  padding: 4,
                                  borderRadius: 8
                                }}
                              >
                                <Text style={{ fontSize: 26, letterSpacing: 6, color: colors.zinc }}>987426</Text>
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
                              onPress={closeAwaitingModal}
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
                    </Modal></>
                ))
                :
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text>Nenhuma encomenda registrada!</Text>
                </View>
              :
              cardsData.ownerLogged.length > 0 ?
                cardsData.ownerLogged.map((item: any) => (
                  <><TouchableOpacity onPress={openAwaitingModal}>
                    <InfoCardComponent
                      key={item.uuid_package}
                      title={`Condomínio: ${item.condominium_name} ${item.blockOwner} ${item.apartmentOwner}`}
                      receivedBy={`Para: ${item.ownerName}`}
                      receivedDate={`Recebido: ${formatDateTime(item.created_at)}`}
                      status_package={item.status_package}
                    />

                  </TouchableOpacity>
                    <Modal
                      visible={awaiting}
                      animationType="slide"
                      transparent
                      onRequestClose={closeAwaitingModal}
                    >
                      <Pressable
                        onPress={closeAwaitingModal}
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
                              }} />
                          </View>

                          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                            Informar código de entrega
                          </Text>

                          <ScrollView
                            style={{ height: "30%" }}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{ paddingBottom: 8 }}
                          >
                            <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: 20,
                                  backgroundColor: "#fff",
                                }}
                              >

                                {/* Inputs OTP */}
                                <View style={{ flexDirection: "row", gap: 15 }}>
                                  {otp.map((digit, index) => (
                                    <TextInput
                                      key={index}
                                      value={digit}
                                      onChangeText={(value) => handleChange(value, index)}
                                      keyboardType="number-pad"
                                      maxLength={1}
                                      style={{
                                        width: 35,
                                        height: 40,
                                        textAlign: "center",
                                        fontSize: 24,
                                        borderWidth: 1,
                                        borderColor: colors.green,
                                        borderRadius: 8,
                                      }}
                                    />
                                  ))}
                                </View>
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
                              onPress={closeAwaitingModal}
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
                    </Modal></>
                ))
                :
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text>Nenhuma encomenda registrada!</Text>
                </View>}
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
                    }} />
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
                            placeholderTextColor={colors.blacklight}
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
                            autoCapitalize="words" />
                        )} />
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
                            placeholderTextColor={colors.blacklight}
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
                            autoCapitalize="characters" />
                        )} />
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
                            placeholderTextColor={colors.blacklight}
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
                            keyboardType="numeric" />
                        )} />
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
                        name="note"
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            placeholder="Ex: Retirar até as 21h"
                            placeholderTextColor={colors.blacklight}
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
                            onBlur={onBlur} />
                        )} />
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
          </Modal></>
      }
    </View>
  );
}
