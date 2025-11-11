import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, ScrollView, TextInput } from 'react-native';
import { profileStyles, modalStyles } from '../../../styles/profile-styles';
import HeaderComponent from '../../../components/header/component';
import BasicLoading from '../../../components/loading/basic-loading';
import api from '../../../interceptor/axios-config';
import { useUser } from '../../../context/user.context';
import colors from '../../../../colors-app/colors';
import { Controller, useForm } from 'react-hook-form';
import ToastComponent from '../../../components/toast/component';
import ProfileImageComponent from '../../../components/image/image-profile';
import { useFocusEffect } from 'expo-router';

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
      "profile_image": "",
      "phone_number": "",
      "type_profile": "",
      "total_received": "",
      "total_delivered": "",
      "total_pending": ""
    }
  ]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res: any = await api.get(`/user-profile/find-user-profile/${userData.ps}`);
      setUserProfile(res.data);
    } catch (error) {
      ToastComponent({ type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes" });
    } finally {
      setLoading(false);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<userProfileForm>({
    defaultValues: {
      name: '',
      block: '',
      apartment: '',
      phone: '',
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
    try {
      setLoading(true);
      const res = await api.post('/user-profile/refresh-user-profile', data);
      if (res.data) fetchUserProfile();
      closeRegisterModal();
      ToastComponent({ type: 'success', text1: "Sucesso!", text2: "Seu perfil foi atualizado" });
    } catch (e) {
      ToastComponent({ type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={profileStyles.container}>
      <HeaderComponent logoText='Chegou' slogan='Seu perfil!' />

      {loading ? (
        <BasicLoading />
      ) : (
        <>
          <View style={profileStyles.form}>
            <View style={profileStyles.profileHeader}>
              <ProfileImageComponent uri={userProfile[0].profile_image} />
              <Text style={profileStyles.name}>{userProfile[0].name}</Text>
            </View>

            <View style={profileStyles.divider} />
            <Text style={profileStyles.condo}>
              {userProfile[0].condominium_name} {userProfile[0].apartment_block} {userProfile[0].apartment}
            </Text>

            <View style={profileStyles.statsRow}>
              <View style={profileStyles.card}>
                <Text style={profileStyles.cardValue}>{userProfile[0].total_received}</Text>
                <Text style={profileStyles.cardLabel}>Recebidos</Text>
              </View>
              <View style={profileStyles.card}>
                <Text style={profileStyles.cardValue}>{userProfile[0].total_pending}</Text>
                <Text style={profileStyles.cardLabel}>Pendentes</Text>
              </View>
              <View style={profileStyles.card}>
                <Text style={profileStyles.cardValue}>{userProfile[0].total_delivered}</Text>
                <Text style={profileStyles.cardLabel}>Entregues</Text>
              </View>
            </View>

            <TouchableOpacity style={profileStyles.button} onPress={openRegisterModal}>
              <Text style={profileStyles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={registerVisible} animationType="slide" transparent onRequestClose={closeRegisterModal}>
            <Pressable onPress={closeRegisterModal} style={modalStyles.overlay}>
              <Pressable onPress={() => {}} style={modalStyles.modalContainer}>
                <View style={modalStyles.dragIndicatorContainer}>
                  <View style={modalStyles.dragIndicator} />
                </View>

                <Text style={modalStyles.modalTitle}>Editar perfil</Text>

                <ScrollView
                  style={modalStyles.scrollArea}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={modalStyles.scrollContent}
                >
                  <View style={modalStyles.formFields}>
                    {/* Nome */}
                    <View>
                      <Text style={modalStyles.label}>Nome</Text>
                      <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Nome" }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            style={[modalStyles.input, errors.name && modalStyles.inputError]}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize="words"
                          />
                        )}
                      />
                      {errors.name && <Text style={modalStyles.errorText}>{errors.name.message}</Text>}
                    </View>

                    {/* Bloco */}
                    <View>
                      <Text style={modalStyles.label}>Torre/Bloco</Text>
                      <Controller
                        control={control}
                        name="block"
                        rules={{ required: "Torre/Bloco" }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            placeholder="Torre/Bloco"
                            style={[modalStyles.input, errors.block && modalStyles.inputError]}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize="characters"
                          />
                        )}
                      />
                      {errors.block && <Text style={modalStyles.errorText}>{errors.block.message}</Text>}
                    </View>

                    {/* Apartamento */}
                    <View>
                      <Text style={modalStyles.label}>Apartamento</Text>
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
                            style={[modalStyles.input, errors.apartment && modalStyles.inputError]}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="numeric"
                          />
                        )}
                      />
                      {errors.apartment && <Text style={modalStyles.errorText}>{errors.apartment.message}</Text>}
                    </View>

                    {/* Telefone */}
                    <View>
                      <Text style={modalStyles.label}>Telefone</Text>
                      <Controller
                        control={control}
                        name="phone"
                        rules={{
                          required: "Telefone",
                          minLength: { value: 1, message: "Informe o seu número" },
                        }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <TextInput
                            style={[modalStyles.input, errors.phone && modalStyles.inputError]}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />
                      {errors.phone && <Text style={modalStyles.errorText}>{errors.phone.message}</Text>}
                    </View>
                  </View>
                </ScrollView>

                <View style={modalStyles.footer}>
                  <TouchableOpacity
                    onPress={closeRegisterModal}
                    disabled={isSubmitting}
                    style={[modalStyles.cancelButton, isSubmitting && modalStyles.disabled]}
                  >
                    <Text style={modalStyles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    style={[modalStyles.confirmButton, isSubmitting && modalStyles.disabled]}
                  >
                    <Text style={modalStyles.confirmText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </>
      )}
    </View>
  );
}
