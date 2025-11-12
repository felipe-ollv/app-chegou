import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Pdf from "react-native-pdf";

export default function ModalPdfView({
  visible,
  onClose,
  pdfUrl,
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
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Aviso do Condomínio!</Text>
        </View>

        <View style={styles.content}>
          {/* <Pdf
            source={source}
            renderActivityIndicator={() => (
              <ActivityIndicator size="large" color="#000" />
            )}
            onLoadComplete={(pages) =>
              console.log(`PDF carregado com ${pages} páginas`)
            }
            onError={(error) => console.log("Erro ao abrir PDF:", error)}
            style={styles.pdf}
          /> */}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  closeButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  closeText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "500",
  },
});
