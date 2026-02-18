import React, { useState } from "react";
import { View, Pressable, Alert, Modal, KeyboardAvoidingView, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import api from "../../interceptor/axios-config";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useUser } from "../../context/user.context";
import ToastComponent from "../toast/component";
import colors from "../../../colors-app/colors";
import { Text, TextInput } from "@/src/components/ui/typography";
import SelectDropdown from "react-native-select-dropdown";

export default function UploadPdfComponent() {
  const { userData } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      setSelectedFile(file);
      setModalVisible(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao selecionar o arquivo.");
    }
  };

  const uploadPdf = async () => {
    if (!selectedFile || !category) {
      ToastComponent({
        type: "warning",
        text1: "Atenção",
        text2: "Selecione a categoria"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        type: "application/pdf",
        name: selectedFile.name || "document.pdf",
      } as any);

      formData.append("uuidUserProfile", userData.ps);
      formData.append("uuidCondominium", userData.cs);
      formData.append("category", category);
      formData.append("description", description);

      const result = await api.post("/note-data/document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.code === 200) {
        ToastComponent({ type: "success", text1: "Sucesso!", text2: result.data.message });
        setModalVisible(false);
        setSelectedFile(null);
        setCategory(null);
        setDescription("");
      }
    } catch {
      ToastComponent({ type: "error", text1: "Erro!", text2: "Erro ao enviar o PDF" });
    }
  };

  const cleanForm = () => {
    setSelectedFile(null);
    setCategory(null);
    setDescription("");
    setModalVisible(false);
  }


  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Pressable
        onPress={pickPdf}
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
        <FontAwesome6 name="file-pdf" size={24} color={colors.white} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "flex-end",
          }}
          onPress={() => setModalVisible(false)}
        >

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={20}
        >
          <Pressable
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            onPress={() => {}}
          >

            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 12,
            }}>Adicione as Informações</Text>

            <Text style={{ marginBottom: 5 }}>Categoria</Text>
            <SelectDropdown
              data={["Comunicado", "Aviso", "Informativo", "Urgente"]}
              onSelect={(item) => setCategory(item)}
              renderButton={(selectedItem) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 8,
                    height: 44,
                    paddingHorizontal: 12,
                    justifyContent: "center",
                    marginBottom: 15,
                    backgroundColor: "#fff",
                  }}
                >
                  <Text>
                    {selectedItem || category || "Selecione a categoria"}
                  </Text>
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View
                  key={index}
                  style={{
                    padding: 14,
                    backgroundColor: isSelected ? "#edf4ff" : "#fff",
                  }}
                >
                  <Text style={{ color: "#333" }}>
                    {item}
                  </Text>
                </View>
              )}
              dropdownStyle={{
                borderRadius: 8,
              }}
            />


            <Text style={{ marginBottom: 5 }}>Descrição</Text>
            <TextInput
              maxLength={40}
              value={description}
              onChangeText={setDescription}
              placeholder="Digite uma breve descrição"
              style={{
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
              }}
            />

            <Text style={{ fontSize: 12, color: "#999", marginBottom: 15 }}>
              {description.length}/40 caracteres
            </Text>

            <Text style={{ marginBottom: 20, color: colors.zinc2}}>
              Arquivo selecionado: {selectedFile?.name}
            </Text>

            <Pressable
              onPress={uploadPdf}
              style={{
                backgroundColor: category ? colors.green : "#D1D5DB",
                height: 46,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Enviar
              </Text>
            </Pressable>
            
            <Pressable
              onPress={cleanForm}
              style={{
                  paddingHorizontal: 14,
                  height: 44,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  marginBottom: 26,
                  marginTop: 12
                }}
            >
              <Text>Cancelar</Text>
            </Pressable>

          </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

    </View>
  );
}
