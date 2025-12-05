import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

const { width } = Dimensions.get("window");
const scanBoxSize = width * 0.65;

export default function ModalQrScanner({
  visible,
  onClose,
  onResult,
}: {
  visible: boolean;
  onClose: () => void;
  onResult: (data: string) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  const handleQrcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    onResult(data);

    setTimeout(() => {
      setScanned(false);
      onClose();
    }, 300);
  };

  if (!permission?.granted) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleQrcodeScanned}
        />

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Aponte para o QR Code</Text>
        </View>

        <View style={styles.overlayContainer}>
          <View style={[styles.overlay, { flex: 1 }]} />

          <View style={{ flexDirection: "row" }}>
            <View style={styles.overlay} />

            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>

            <View style={styles.overlay} />
          </View>

          <View style={[styles.overlay, { flex: 1 }]} />
        </View>

        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const colors = {
  dark: "#0c0c1b",
  green: "#00C853",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  scanArea: {
    width: scanBoxSize,
    height: scanBoxSize,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
    position: "relative",
  },

  scanLine: {
    position: "absolute",
    width: "100%",
    height: 3,
    backgroundColor: colors.green,
    opacity: 0.9,
  },

  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: colors.green,
    borderWidth: 3,
  },

  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },

  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },

  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  instructionContainer: {
    position: "absolute",
    top: 80,
    width: "100%",
    alignItems: "center",
  },

  instructionText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },

  closeContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },

  closeButton: {
    backgroundColor: colors.dark,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },

  closeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});