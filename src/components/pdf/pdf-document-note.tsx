import React, { useState } from "react";
import { View, Pressable, Text, Alert, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import api from "../../interceptor/axios-config";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useUser } from "../../context/user.context";
import ToastComponent from "../toast/component";
import BasicLoading from "../loading/basic-loading";
import colors from "../../../colors-app/colors";

export default function UploadPdfComponent() {
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      uploadPdf(file);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao selecionar o arquivo.");
    }
  };

  const uploadPdf = async (file: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: "application/pdf",
        name: file.name || "document.pdf",
      } as any);
      formData.append("uuidUserProfile", userData.ps);

      const result = await api.post("/notification/document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.code === 200) {
        setFileName(file.name);
        ToastComponent({ type: "success", text1: "Sucesso!", text2: result.data.message });
      } else {
        ToastComponent({ type: "warning", text1: "Falha!", text2: result.data.message });
      }
    } catch (error) {
      console.error(error);
      ToastComponent({ type: "error", text1: "Erro!", text2: "Erro ao enviar o PDF" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {loading ? (
        <BasicLoading />
      ) : (
        <>
          <TouchableOpacity
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
          </TouchableOpacity>

          {fileName && (
            <Text style={{ color: "#333" }}>📄 {fileName}</Text>
          )}
        </>
      )}
    </View>
  );
}
