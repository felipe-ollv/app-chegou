import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, TextInput } from 'react-native';
import { profileStyles } from './styles';
import HeaderComponent from '../../../components/header/component';
import LoadingComponent from '../../../components/loading/component';
import api from '../../interceptor/axios-config';
import { useUser } from '../../context/user.context';
import colors from '@/constants/colors';
import { Controller, useForm } from 'react-hook-form';

type userProfileForm = {
  name: string;
  block: string;
  apartment: string;
  phone: string;
  uuid: string;
};

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();
  const [registerVisible, setRegisterVisible] = useState(false);
  const [userProfile, setUserProfile] = useState([
    {
      "apartment": 0,
      "apartment_block": "",
      "condominium_name": "",
      "name": "",
      "phone_number": "",
      "type_profile": ""
    }
  ]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const res: any = await api.get(`/user-profile/find-user-profile/${userData.ps}`);
    setUserProfile(res.data);
    setLoading(false);
  }

  const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<userProfileForm>({
      defaultValues: {
        name: userProfile[0].name,
        block: userProfile[0].apartment_block,
        apartment: userProfile[0].apartment.toString(),
        phone: userProfile[0].phone_number,
        uuid: userData.ps
      },
    });

  const openRegisterModal = () => {
    reset({
      name: userProfile[0].name ?? "",
      block: userProfile[0].apartment_block ?? "",
      apartment: userProfile[0].apartment?.toString() ?? "",
      phone: userProfile[0].phone_number ?? "",
      uuid: userData.ps
    });
    setRegisterVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterVisible(false);
    reset();
  };

  const onSubmit = async (data: userProfileForm) => {
    console.log('dados update', data);
    try {
      const res = await api.post('/user-profile/refresh-user-profile', data);
      setLoading(true);
      console.log("resp:", res.data);
      setLoading(false);
      closeRegisterModal();
    } catch (e) {
      setLoading(false);
      console.log("Erro ao atualizar perfil:", e);
    }
  };

const handleProfileType = (data: string): string => {
  const map: Record<string, string> = {
    RESIDENT: 'MORADOR',
    ADMIN: 'ADMINISTRAÇÃO',
    EMPLOYEE: 'FUNCIONÁRIO',
    TRUSTEE: 'SÍNDICO',
  };

  return map[data]
};

  return (
    <View style={profileStyles.container}>

      <HeaderComponent logoText='Chegou' slogan='Seu perfil!' />

      {loading ?
        <LoadingComponent />
        :
        <><View style={profileStyles.form}>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../../assets/images/11539820.png')}
              style={profileStyles.profileImageCss} />

            <Text style={profileStyles.name}>{userProfile[0].name}</Text>
          </View>

          <View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 10 }} />
          <Text style={profileStyles.condo}>{userProfile[0].condominium_name} {userProfile[0].apartment_block} {userProfile[0].apartment}</Text>
          <View style={{ width: '100%', height: 1, backgroundColor: colors.green, marginBottom: 10 }} />
          <Text style={profileStyles.bio}>{userProfile[0].phone_number}</Text>
          {/* <Text style={profileStyles.bio}>{userProfile[0].type_profile}</Text> */}

          <TouchableOpacity style={profileStyles.button}
            onPress={openRegisterModal}
          >
            <Text style={profileStyles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>

        </View>

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
                onPress={() => { } }
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
                  Editar perfil
                </Text>

                <ScrollView
                  style={{ maxHeight: "80%" }}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 8 }}
                >
                  <View style={{ gap: 12 }}>
                    <View>
                      <Text style={{ fontSize: 14, marginBottom: 6 }}>Nome</Text>
                      <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Nome" }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            placeholder=""
                            style={{
                              borderWidth: 1,
                              borderColor: errors.name ? "#ef4444" : "#E5E7EB",
                              borderRadius: 8,
                              paddingHorizontal: 12,
                              height: 44,
                            }}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize="words" />
                        )} />
                      {errors.name && (
                        <Text style={{ color: "red", marginTop: 6 }}>
                          {errors.name.message}
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
                      <Text style={{ fontSize: 14, marginBottom: 6 }}>Telefone</Text>
                      <Controller
                        control={control}
                        name="phone"
                        rules={{
                          required: "Telefone",
                          minLength: { value: 1, message: "Informe o seu número" },
                        }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            placeholder=""
                            style={{
                              borderWidth: 1,
                              borderColor: "#E5E7EB",
                              borderRadius: 8,
                              paddingHorizontal: 12,
                              paddingTop: 10,
                              height: 44,
                              textAlignVertical: "top",
                            }}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur} />
                        )} />
                      {errors.phone && (
                        <Text style={{ color: "red", marginTop: 6 }}>
                          {errors.phone.message}
                        </Text>
                      )}
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
  )
}