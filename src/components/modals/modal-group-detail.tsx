import colors from "@/colors-app/colors";
import formatDateTime from "../../utils/formatDateTime";
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { PackageItem } from "../types/package-item";

export type GroupDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  groupKey: string | null;
  items: PackageItem[];
  receivedView: number;
  onPressItem: (item: PackageItem) => void;
};

export default function GroupDetailsModal({
  visible,
  onClose,
  groupKey,
  items,
  receivedView,
  onPressItem,
}: GroupDetailsModalProps) {

  if (!groupKey) return null;

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const [dateLabel, blocoPart, aptPart] = groupKey.split(" - ");

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 16,
            maxHeight: "80%",
          }}
        >
          {/* Cabeçalho do modal */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#111",
              marginBottom: 4,
            }}
          >
            Encomendas recebidas
          </Text>

          <Text style={{ fontSize: 14, color: "#444", marginBottom: 2 }}>
            {dateLabel}
          </Text>
          <Text style={{ fontSize: 14, color: "#444", marginBottom: 2 }}>
            {blocoPart} - {aptPart}
          </Text>
          <Text style={{ fontSize: 14, color: colors.green, marginBottom: 12 }}>
            {items.length} encomenda{items.length > 1 ? "s" : ""} neste dia
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {sortedItems.map((item, index) => {
              const numbering = index + 1;
              const isRetirar = receivedView === 0;

              const receivedByText = isRetirar
                ? `Recebido por: ${item.receiverName}`
                : `Para: ${item.ownerName}`;

              const codeText = isRetirar
                ? `Código: ${item.confirmation_code}`
                : `Toque para confirmar o código`;

              const isDelivered = item.status_package === "DELIVERED";

              const badgeBackground = isDelivered
                ? colors.ligthgreen
                : colors.orangeBackgournd;

              const badgeColor = isDelivered
                ? colors.green
                : colors.orange;

              return (
                <TouchableOpacity
                  key={item.uuid_package}
                  onPress={() => !isDelivered && onPressItem(item)}
                  disabled={isDelivered}
                  style={{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    padding: 12,
                    marginBottom: 12,
                    backgroundColor: "#fff",
                    opacity: isDelivered ? 0.8 : 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      marginBottom: 4,
                      color: "#111",
                    }}
                  >
                    {numbering} - {formatDateTime(item.created_at)}
                  </Text>

                  <Text style={{ fontSize: 14, color: "#333", marginBottom: 2 }}>
                    {receivedByText}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      color: "#333",
                      marginBottom: item.note ? 4 : 2,
                    }}
                  >
                    {codeText}
                  </Text>

                  {item.note ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#555",
                        marginBottom: 6,
                      }}
                    >
                      Observação: {item.note}
                    </Text>
                  ) : null}

                  <View
                    style={{
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                      backgroundColor: badgeBackground,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: badgeColor,
                      }}
                    >
                      {isDelivered ? "Entregue" : "Pendente"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 8,
              alignSelf: "flex-end",
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: colors.green, fontWeight: "600" }}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}