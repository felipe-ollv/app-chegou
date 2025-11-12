import HeaderComponent from "../../../components/header/component";
import { Buffer } from "buffer";
import { Pressable, Text, View, ScrollView } from "react-native";
import { notificationStyles } from "../../../styles/notification-styles";
import UploadPdfComponent from "../../../components/pdf/pdf-document-note";
import { useUser } from "../../../context/user.context";
import { useEffect, useState } from "react";
import ToastComponent from "../../../components/toast/component";
import api from "../../../interceptor/axios-config";
import ModalPdfView from "../../../components/modals/modal-view-pdf";

export default function NotificationScreen() {
  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState<any>([]);
  const [noteSelected, setNoteSelected] = useState("");
  const { userData } = useUser();


  useEffect(() => {
    fetchNoteCondominium();
  }, []);

  const fetchNoteCondominium = async () => {
    try {
      const res: any = await api.get(`/note-data/find-note-data/${userData.cs}`);
      if (res.data) {
        setNotes(res.data);
      }
    } catch (error) {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Erro interno, aguarde alguns instantes",
      });
    }
  };

  const getPdfBase64 = async (path: string) => {
    try {
      const response = await api.get(path, { responseType: "arraybuffer" });
      const base64 = `data:application/pdf;base64,${Buffer.from(
        response.data,
        "binary"
      ).toString("base64")}`;
      return base64;
    } catch (error) {
      console.log("Erro ao carregar arquivo:", error);
      return null;
    }
  };

  const handleOpenPdf = async (path: string) => {
    const base64 = await getPdfBase64(path);
    if (base64) {
      setNoteSelected(base64);
      setTimeout(() => setVisible(true), 50);
    } else {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Não foi possível carregar o arquivo PDF.",
      });
    }
  };

  return (
    <View style={[notificationStyles.container, { flex: 1 }]}>
      <HeaderComponent logoText="Chegou" slogan="Avisos do condomínio!" />

      <ScrollView
        style={{ flex: 1 }}
        // contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={notificationStyles.form}>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <Pressable
                key={index}
                style={notificationStyles.card}
                onPress={() => handleOpenPdf(note.content)}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                    marginBottom: 2,
                  }}
                >
                  {note.title || "Novo aviso!"}
                </Text>
                <Text numberOfLines={2}>
                  {note.description || "Clique para abrir"}
                </Text>
              </Pressable>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum aviso disponível
            </Text>
          )}
        </View>
      </ScrollView>

      <ModalPdfView
        key={noteSelected} 
        visible={visible}
        onClose={() => setVisible(false)}
        pdfUrl={noteSelected}
      />

      {userData.ts === "TRUSTEE" && (
        <View
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
            borderRadius: 28,
            justifyContent: "center",
          }}
        >
          <UploadPdfComponent />
        </View>
      )}
    </View>
  );
}
