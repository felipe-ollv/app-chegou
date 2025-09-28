import colors from "../../../colors-app/colors";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ToastComponent from "../toast/component";
import api from "../../interceptor/axios-config";
import BasicLoading from "../loading/basic-loading";

type ConfirmCodeReceiving = {
  code: string;
};

export default function ModalConfirmationCode({
  visible,
  onClose,
  selected,
}: {
  visible: boolean;
  onClose: () => void;
  selected: any;
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ConfirmCodeReceiving>({
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 300);
    }
  }, [visible]);

  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const confirmation_code = otp.join("");
			const uuid_package = selected;
      const data = { confirmation_code,  uuid_package};

      const confirm: any = await api.put('/received-package/update-received-package', data);
      if (confirm.data.code === 400) {
        ToastComponent({ type: 'warning', text1: "Falha!", text2: confirm.data.message })
      } else {
        ToastComponent({ type: 'success', text1: "Sucesso!", text2: confirm.data.message })
      }

    } catch (e) {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Erro interno, aguarde alguns instantes",
      });
    } finally {
      setLoading(false);
			onClose();
      setOtp(["", "", "", "", "", ""]);
      reset();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={() => {}}
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
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
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
                Confirmar código de recebimento
              </Text>

              {/* Inputs OTP */}
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                {
                  loading ? <BasicLoading /> :

                  <View style={{ flexDirection: "row", gap: 15 }}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(el) => {
                          inputsRef.current[index] = el;
                        }}
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        style={{
                          width: 40,
                          height: 50,
                          textAlign: "center",
                          fontSize: 24,
                          borderWidth: 1,
                          borderColor: colors.green,
                          borderRadius: 8,
                        }}
                      />
                    ))}
                  </View>
                }

              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    paddingHorizontal: 14,
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
                  disabled={isSubmitting || otp.some((d) => d === "")}
                  style={{
                    paddingHorizontal: 16,
                    height: 44,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (isSubmitting || otp.some((d) => d === "")) 
                      ? colors.gray
                      : colors.green, 
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
