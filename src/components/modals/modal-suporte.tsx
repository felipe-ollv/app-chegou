import colors from "@/colors-app/colors";
import { Modal, View, Platform, TouchableOpacity, Pressable, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

export default function ModalSuport({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
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
                onPress={() => { }}
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

                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                  Contatos para suporte
                </Text>

                <ScrollView
                  style={{ height: "40%" }}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 8 }}
                >
                  <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                    <Text>WhatsApp</Text>
                    <Text>Email</Text>
                  </View>
                  
                </ScrollView>

                <View
                  style={{
                    flexDirection: "row",
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
                    style={{
                      paddingHorizontal: 16,
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