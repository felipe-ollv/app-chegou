import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

import api from "../../../interceptor/axios-config";
import HeaderComponent from "../../../components/header/component";
import InfoCardComponent from "../../../components/card/component";
import BasicLoading from "../../../components/loading/basic-loading";
import ToastComponent from "../../../components/toast/component";
import ModalConfirmationCode from "../../../components/modals/modal-confirmation-code";
import ModalInformCode from "../../../components/modals/modal-inform-code";
import ModalRegisterReceiving from "../../../components/modals/modal-register-receiving";

import formatDateTime from "../../../utils/formatDateTime";
import { useUser } from "../../../context/user.context";
import usePushNotifications from "../../../hooks/push-notification";

import { showcaseStyles } from "../../../styles/showcase-styles";
import colors from "../../../../colors-app/colors";

const groupByDate = (list: any[]) => {
  const grouped: Record<string, any[]> = {};
  list.forEach((item) => {
    const date = new Date(item.created_at);
    const key = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });
  return grouped;
};

export default function ShowcaseScreen() {
  const { userData } = useUser();
  const [loading, setLoading] = useState(true);
  const [receivedView, setReceivedView] = useState(0); // 0 = Retirar, 1 = Entregar
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [visibleModalConfirmationCode, setVisibleModalConfirmationCode] = useState(false);
  const [visibleModalInformCode, setVisibleModalInformCode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { expoPushToken } = usePushNotifications();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const PAGE_SIZE = 10;

  const fetchPackageList = async (pageNumber = 1, replace = false) => {
    try {
      if (pageNumber === 1) setLoading(true);

      const res: any = await api.get(
        `/received-package/find-received-package/${userData.ps}?page=${pageNumber}&limit=${PAGE_SIZE}`
      );

      const payload = res.data || {};
      const list =
        receivedView === 0
          ? payload.pickup || []
          : payload.deliver || [];

      setItems((prev) => (replace ? list : [...prev, ...list]));
      setHasMore(payload.pagination?.hasMore ?? false);
    } catch (error) {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Erro ao carregar as encomendas.",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchPackageList(1, true);
    }, [])
  );

  useEffect(() => {
    setPage(1);
    fetchPackageList(1, true);
  }, [receivedView]);

  useEffect(() => {
    if (!expoPushToken) return;
    const registerTokenPush = async () => {
      await api.post("/push-notification/register-token-notification", {
        token: expoPushToken,
        uuidUserProfile: userData.ps,
      });
    };
    registerTokenPush();
  }, [expoPushToken]);

  const handleRegisterModal = () => {
    setPage(1);
    fetchPackageList(1, true);
  };

  const groupedItems = groupByDate(items);
  const dates = Object.keys(groupedItems).sort(
    (a, b) =>
      new Date(b.split("/").reverse().join("-")).getTime() -
      new Date(a.split("/").reverse().join("-")).getTime()
  );

  const renderGroup = ({ item: date }: { item: string }) => (
    <View
      key={date}
      style={{
        marginBottom: 16,
        backgroundColor: "#fafafa",
        borderRadius: 8,
        padding: 8,
      }}
    >
      <Text
        style={{
          fontWeight: "700",
          fontSize: 16,
          color: colors.zinc3,
          marginBottom: 8,
        }}
      >
        {date}
      </Text>

      {groupedItems[date].map((item: any) => (
        <TouchableOpacity
          key={item.uuid_package}
          onPress={() => {
            if (receivedView === 0) {
              setVisibleModalInformCode(true);
              setSelectedItem(item.confirmation_code);
            } else {
              setVisibleModalConfirmationCode(true);
              setSelectedItem(item.uuid_package);
            }
          }}
          disabled={item.status_package === "DELIVERED"}
        >
          <InfoCardComponent
            title={`Condomínio: ${item.condominium_name} ${
              receivedView === 0 ? item.blockReceiver : item.blockOwner
            } ${receivedView === 0 ? item.apartmentReceiver : item.apartmentOwner}`}
            receivedBy={
              receivedView === 0
                ? `Recebido por: ${item.receiverName}`
                : `Para: ${item.ownerName}`
            }
            receivedDate={`Data: ${formatDateTime(item.created_at)}`}
            note={item.note}
            status_package={item.status_package}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={showcaseStyles.container}>
      <HeaderComponent logoText="Chegou" slogan="" />

      {loading && page === 1 ? (
        <BasicLoading />
      ) : (
        <>
          <View style={showcaseStyles.form}>
            <View style={showcaseStyles.tabContainer}>
              <TouchableOpacity
                style={[
                  showcaseStyles.tabButton,
                  {
                    backgroundColor: receivedView === 0 ? colors.green : "#e0e0e0",
                    marginRight: 2,
                  },
                ]}
                onPress={() => setReceivedView(0)}
              >
                <Text
                  style={{
                    color: receivedView === 0 ? "#fff" : "#222",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Retirar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  showcaseStyles.tabButton,
                  {
                    backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0",
                    marginLeft: 2,
                  },
                ]}
                onPress={() => setReceivedView(1)}
              >
                <Text
                  style={{
                    color: receivedView === 1 ? "#fff" : "#222",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Entregar
                </Text>
              </TouchableOpacity>
            </View>

            {/* Lista com paginação e agrupamento */}
            <FlatList
              data={dates}
              keyExtractor={(item) => item}
              renderItem={renderGroup}
              ListEmptyComponent={
                !loading ? (
                  <Text style={{ textAlign: "center", marginTop: 20 }}>
                    Nenhuma encomenda encontrada
                  </Text>
                ) : null
              }
              onEndReached={() => {
                if (hasMore && !loading) {
                  const next = page + 1;
                  setPage(next);
                  fetchPackageList(next);
                }
              }}
              onEndReachedThreshold={0.2}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setPage(1);
                fetchPackageList(1, true);
              }}
              ListFooterComponent={
                loading && hasMore ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.green}
                    style={{ marginVertical: 10 }}
                  />
                ) : null
              }
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </View>

          {/* Botão flutuante */}
          <TouchableOpacity
            onPress={() => setModalRegisterVisible(true)}
            style={showcaseStyles.fab}
          >
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>

          <ModalRegisterReceiving
            visible={modalRegisterVisible}
            onClose={() => setModalRegisterVisible(false)}
            onSuccessRegister={handleRegisterModal}
          />

          <ModalInformCode
            visible={visibleModalInformCode}
            onClose={() => setVisibleModalInformCode(false)}
            selected={selectedItem}
          />

          <ModalConfirmationCode
            visible={visibleModalConfirmationCode}
            onClose={() => setVisibleModalConfirmationCode(false)}
            selected={selectedItem}
            onConfirmCode={handleRegisterModal}
          />
        </>
      )}
    </View>
  );
}
