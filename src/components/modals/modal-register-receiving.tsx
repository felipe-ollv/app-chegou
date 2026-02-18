import colors from "@/colors-app/colors";
import { Controller, useForm } from "react-hook-form";
import {
  Modal, Pressable, View, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import ToastComponent from "../toast/component";
import BasicLoading from "../loading/basic-loading";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../context/user.context";
import api from "../../interceptor/axios-config";
import SelectDropdown from "react-native-select-dropdown";

import { Text, TextInput } from "@/src/components/ui/typography";
type Resident = {
  name: string;
  apartment_block: string;
  apartment: number;
  blocks: [];
};

type RegisterForm = {
  recipient: string;
  block: string;
  apartment: string;
  note: string;
  received: string;
};

export default function ModalRegisterReceiving({
  visible,
  onClose,
  onSuccessRegister,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccessRegister: () => void;
}) {
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [blockKey, setBlockKey] = useState(0);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [selectedApartment, setSelectedApartment] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      recipient: "",
      block: "",
      apartment: "",
      note: "",
    },
  });

  useEffect(() => {
    chargeDataCondominium();
  }, []);

  const chargeDataCondominium = async () => {
    try {
      const dataCondominium: any = await api.get(`/user-profile/find-residents/${userData.cs}`);
      setResidents(dataCondominium.data);
      return dataCondominium.data;
    } catch (error) {
      console.log(error);
      return [];
    } 
  }

  const residentsByBlock = useMemo(
    () =>
      selectedBlock
        ? residents.filter(r => r.apartment_block === selectedBlock)
        : [],
    [selectedBlock, residents]
  );

  const apartmentsByBlock = useMemo(
    () => Array.from(new Set(residentsByBlock.map(r => r.apartment))),
    [residentsByBlock]
  );

  const blocks = useMemo(
    () =>
      Array.from(
        new Set(residents.map(r => r.apartment_block))
      ),
    [residents]
  );

  const residentsByBlockAndApartment = useMemo(
    () =>
      selectedBlock && selectedApartment !== null
        ? residents.filter(
            r =>
              r.apartment_block === selectedBlock &&
              r.apartment === selectedApartment
          )
        : [],
    [selectedBlock, selectedApartment, residents]
  );

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      data.received = userData.ps;

      const res: any = await api.post(
        "/received-package/create-received-package",
        data
      );

      if (res.data?.error === 400) {
        ToastComponent({
          type: "warning",
          text1: "Falha!",
          text2: res.data.message,
        });
      } else {
        onClose();
        reset();
        setSelectedBlock(null);
        setBlockKey(prev => prev +1)
        onSuccessRegister();
        ToastComponent({
          type: "success",
          text1: "Sucesso!",
          text2: "Recebimento registrado",
        });
      }
    } catch {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Erro interno, aguarde alguns instantes",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "flex-end",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
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
              maxHeight: "95%",
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

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
              Registrar encomenda recebida
            </Text>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              <View style={{ gap: 12 }}>
                {loading ? (
                  <View style={{ height: 100 }}>
                    <BasicLoading />
                  </View>
                ) : (
                  <>
                    <View>
                      <Text style={{ fontSize: 14, marginBottom: 6 }}>
                        Bloco/Torre
                      </Text>

                      <Controller
                        control={control}
                        name="block"
                        rules={{ required: "Torre obrigatória" }}
                        render={({ field: { onChange, value } }) => (
                          <SelectDropdown
                            key={blockKey}
                            data={blocks}
                            disabled={blocks.length === 0}
                            onSelect={(item) => {
                              setSelectedBlock(item);
                              onChange(item);
                              reset((prev) => ({
                                ...prev,
                                apartment: "",
                                recipient: "",
                              }));
                            }}
                            renderButton={(selectedItem) => (
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderColor: errors.block ? "#ef4444" : "#E5E7EB",
                                  borderRadius: 8,
                                  height: 44,
                                  paddingHorizontal: 12,
                                  justifyContent: "center",
                                  backgroundColor: "#fff",
                                }}
                              >
                                <Text style={{ color: selectedItem ? "#000" : "#999" }}>
                                  {value || "Selecione o Bloco/Torre"}
                                </Text>
                              </View>
                            )}
                            renderItem={(item, _, isSelected) => (
                              <View
                                style={{
                                  padding: 12,
                                  backgroundColor: isSelected ? "#edf4ff" : "#fff",
                                }}
                              >
                                <Text style={{ color: "#333" }}>{item}</Text>
                              </View>
                            )}
                            dropdownStyle={{ borderRadius: 8 }}
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text style={{ fontSize: 14, marginBottom: 6 }}>
                        Apartamento
                      </Text>

                      <Controller
                        control={control}
                        name="apartment"
                        rules={{ required: "Apartamento obrigatório" }}
                        render={({ field: { onChange, value } }) => (
                          <SelectDropdown
                            data={apartmentsByBlock}
                            disabled={!selectedBlock}
                            onSelect={(item) => {
                              setSelectedApartment(item);
                              onChange(String(item))
                              reset(prev => ({
                                ...prev,
                                recipient: "",
                              }));
                            }}
                            
                            renderButton={(selectedItem) => (
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderColor: errors.apartment ? "#ef4444" : "#E5E7EB",
                                  borderRadius: 8,
                                  height: 44,
                                  paddingHorizontal: 12,
                                  justifyContent: "center",
                                  backgroundColor: selectedBlock ? "#fff" : "#F3F4F6",
                                }}
                              >
                                <Text style={{ color: value ? "#000" : "#999" }}>
                                  {value || "Selecione o apartamento"}
                                </Text>
                              </View>
                            )}
                            renderItem={(item, _, isSelected) => (
                              <View
                                style={{
                                  padding: 12,
                                  backgroundColor: isSelected ? "#edf4ff" : "#fff",
                                }}
                              >
                                <Text>{item}</Text>
                              </View>
                            )}
                            dropdownStyle={{ borderRadius: 8 }}
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text style={{ fontSize: 14, marginBottom: 6 }}>
                        Destinatário
                      </Text>

                      <Controller
                        control={control}
                        name="recipient"
                        rules={{ required: "Destinatário obrigatório" }}
                        render={({ field: { onChange, value } }) => (
                          <SelectDropdown
                            data={residentsByBlockAndApartment}
                            disabled={!selectedBlock || selectedApartment === null}
                            onSelect={(item) => onChange(item.name)}
                            renderButton={(selectedItem) => (
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderColor: errors.recipient ? "#ef4444" : "#E5E7EB",
                                  borderRadius: 8,
                                  height: 44,
                                  paddingHorizontal: 12,
                                  justifyContent: "center",
                                  backgroundColor: selectedBlock ? "#fff" : "#F3F4F6",
                                }}
                              >
                                <Text style={{ color: value ? "#000" : "#999" }}>
                                  {value || "Selecione o destinatário"}
                                </Text>
                              </View>
                            )}
                            renderItem={(item, _, isSelected) => (
                              <View
                                style={{
                                  padding: 12,
                                  backgroundColor: isSelected ? "#edf4ff" : "#fff",
                                }}
                              >
                                <Text>
                                  {item.name} — Apto {item.apartment}
                                </Text>
                              </View>
                            )}
                            dropdownStyle={{ borderRadius: 8 }}
                          />
                        )}
                      />
                    </View>

                    <View>
                      <Text style={{ fontSize: 14, marginBottom: 6 }}>
                        Observações
                      </Text>

                      <Controller
                        control={control}
                        name="note"
                        render={({ field: { onChange, value } }) => (
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
                          />
                        )}
                      />
                    </View>
                  </>
                )}
              </View>
            </ScrollView>

            <View
              style={{
                flexDirection: "column",
                gap: 12,
                marginTop: 36,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  reset();
                  setSelectedBlock(null);
                  setBlockKey(prev => prev + 1)
                  onClose();
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
                disabled={!isValid || isSubmitting}
                style={{
                  height: 44,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isValid ? colors.green : colors.gray2,
                  opacity: !isValid || isSubmitting ? 0.5 : 1,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}