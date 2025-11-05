import { Modal, View, Platform, TouchableOpacity, Pressable, Text, Dimensions, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import Pdf from "react-native-pdf";

export default function ModalPdfView({
  visible,
  onClose,
  pdfUrl
}: {
  visible: boolean;
  onClose: () => void;
  pdfUrl: string;
}) {

  const source = { uri: pdfUrl, cache: true };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
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

          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center" }}>
            Aviso do Condomínio!
          </Text>

          <View style={{ flexDirection: 'row', width: '100%', height: 250, justifyContent: 'space-around', alignItems: 'center' }}>
            <Pdf
              source={source}
              renderActivityIndicator={() => (
                <ActivityIndicator size="large" color="#000" />
              )}
              onLoadComplete={(pages) => console.log(`PDF carregado com ${pages} páginas`)}
              onError={(error) => console.log("Erro ao abrir PDF:", error)}
              style={{
                flex: 1,
                width: '100%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
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
              <Text style={{ color: "#111" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    height: "50%", // ocupa metade da tela
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  grabberWrap: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 12 : 8,
    paddingBottom: 4,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D0D5DD",
  },
});