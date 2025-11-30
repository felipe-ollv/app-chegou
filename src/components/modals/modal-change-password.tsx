import colors from "@/colors-app/colors";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ToastComponent from "../toast/component";
import { useState } from "react";
import { useUser } from "../../context/user.context";
import api from "../../interceptor/axios-config";
import PasswordInput from "../input/passwrod.input";

type ChangePassword = {
  uuid_profile: string;
  password: string;
};

export default function ModalChangePassword({ visible, onClose }) {
  const [loading, setLoading] = useState(false);
  const { userData } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePassword>({
    defaultValues: {
      uuid_profile: "",
      password: "",
    },
  });

  const onSubmit = async (data: ChangePassword) => {
    try {
      setLoading(true);
      data.uuid_profile = userData.ps;
      const inform: any = await api.post("/user-access/update-user-access", data);

      if (inform.data.error === 400) {
        onClose();
        ToastComponent({
          type: "warning",
          text1: "Falha!",
          text2: inform.data.message,
        });
      } else {
        onClose();
        ToastComponent({
          type: "success",
          text1: "Sucesso!",
          text2: "Sua senha foi alterada!",
        });
      }
    } catch (e) {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Erro interno, aguarde alguns instantes",
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      {/* BACKDROP */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "flex-end",
        }}
      >
        {/* CONTEÚDO DO MODAL */}
        <View
          style={{
            minHeight: "50%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 24,
          }}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
          >
            <ScrollView
              contentContainerStyle={{ paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
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

              <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
                Alterar Senha
              </Text>

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, marginBottom: 6 }}>Digite a nova senha</Text>

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
                  render={({ field: { onChange, value } }) => (
                    <PasswordInput value={value} onChangeText={onChange} style={undefined} />
                  )}
                />

                {errors.password && (
                  <Text style={{ color: "red", marginTop: 6 }}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View style={{ gap: 12, marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                  disabled={isSubmitting}
                  style={{
                    height: 44,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <Text style={{ color: "#111" }}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  style={{
                    height: 44,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.green,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}