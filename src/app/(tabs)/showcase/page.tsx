import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

import api from "../../../interceptor/axios-config";
import HeaderComponent from "../../../components/header/component";
import BasicLoading from "../../../components/loading/basic-loading";
import ToastComponent from "../../../components/toast/component";
import ModalConfirmationCode from "../../../components/modals/modal-confirmation-code";
import ModalInformCode from "../../../components/modals/modal-inform-code";
import ModalRegisterReceiving from "../../../components/modals/modal-register-receiving";

import { useUser } from "../../../context/user.context";
import usePushNotifications from "../../../hooks/push-notification";

import { showcaseStyles } from "../../../styles/showcase-styles";
import colors from "../../../../colors-app/colors";
import { PackageItem } from "../../../components/types/package-item";
import GroupDetailsModal from "../../../components/modals/modal-group-detail";


/* 🔥 AGRUPAR POR DATA → BLOCO + APTO */
const groupByDateBlockApt = (
  list: PackageItem[],
  receivedView: number
): Record<string, PackageItem[]> => {
  const grouped: Record<string, PackageItem[]> = {};

  list.forEach((item) => {
    const date = new Date(item.created_at);
    const dateKey = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const block = receivedView === 0 ? item.blockReceiver : item.blockOwner;
    const apt = receivedView === 0 ? item.apartmentReceiver : item.apartmentOwner;

    const key = `${dateKey} - Bloco ${block} - Apto ${apt}`;

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  return grouped;
};

export default function ShowcaseScreen() {
  const { userData } = useUser();
  const { expoPushToken } = usePushNotifications();

  const [loading, setLoading] = useState(true);
  const [receivedView, setReceivedView] = useState(0);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<PackageItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [visibleModalConfirmationCode, setVisibleModalConfirmationCode] = useState(false);
  const [visibleModalInformCode, setVisibleModalInformCode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [selectedGroupKey, setSelectedGroupKey] = useState<string | null>(null);
  const [selectedGroupItems, setSelectedGroupItems] = useState<PackageItem[]>([]);

  const PAGE_SIZE = 10;

  const fetchPackageList = async (pageNumber = 1, replace = false) => {
    try {
      if (pageNumber === 1) setLoading(true);

      const res: any = await api.get(
        `/received-package/find-received-package/${userData.ps}?page=${pageNumber}&limit=${PAGE_SIZE}`
      );

      const payload = res.data || {};
      const list =
        receivedView === 0 ? payload.pickup || [] : payload.deliver || [];

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
    api.post("/push-notification/register-token-notification", {
      token: expoPushToken,
      uuidUserProfile: userData.ps,
    });
  }, [expoPushToken]);

  const handleRegisterModal = () => {
    setPage(1);
    fetchPackageList(1, true);
  };

  const groupedItems = groupByDateBlockApt(items, receivedView);

  const groupKeys = Object.keys(groupedItems).sort((a, b) => {
    const dateA = a.split(" - ")[0].split("/").reverse().join("-");
    const dateB = b.split(" - ")[0].split("/").reverse().join("-");
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const groupedByDate: Array<{ date: string; groups: string[] }> = [];
  const dateMap: Record<string, string[]> = {};

  groupKeys.forEach((fullKey) => {
    const datePart = fullKey.split(" - ")[0];

    if (!dateMap[datePart]) dateMap[datePart] = [];
    dateMap[datePart].push(fullKey);
  });

  const todayStr = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  Object.keys(dateMap)
    .sort((a, b) => {
      const da = a.split("/").reverse().join("-");
      const db = b.split("/").reverse().join("-");
      return new Date(db).getTime() - new Date(da).getTime();
    })
    .forEach((dateStr) => {
      groupedByDate.push({
        date: dateStr === todayStr ? `${dateStr} — Hoje` : dateStr,
        groups: dateMap[dateStr],
      });
    });

  const openGroupModal = (groupKey: string) => {
    setSelectedGroupKey(groupKey);
    setSelectedGroupItems(groupedItems[groupKey] || []);
    setGroupModalVisible(true);
  };

  const handlePressItemFromGroup = (item: PackageItem) => {
    setGroupModalVisible(false);

    if (receivedView === 0) {
      setVisibleModalInformCode(true);
      setSelectedItem(item.confirmation_code);
    } else {
      setVisibleModalConfirmationCode(true);
      setSelectedItem(item.uuid_package);
    }
  };

  const renderGroup = (groupKey: string) => {
    const itemsInGroup = groupedItems[groupKey];
    if (!itemsInGroup?.length) return null;

    const first = itemsInGroup[0];
    const [dateLabel, blocoPart, aptPart] = groupKey.split(" - ");

    const isRetirar = receivedView === 0;
    const labelQtd = `${itemsInGroup.length} encomenda${
      itemsInGroup.length > 1 ? "s" : ""
    } recebida${itemsInGroup.length > 1 ? "s" : ""}`;

    return (
      <TouchableOpacity
        key={groupKey}
        onPress={() => openGroupModal(groupKey)}
        style={{ marginBottom: 16 }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            padding: 16,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>
            {first.condominium_name}
          </Text>

          <Text style={{ fontSize: 14, color: "#4a4a4a", marginBottom: 4 }}>
            {blocoPart} - {aptPart}
          </Text>

          <Text style={{ fontSize: 13, color: colors.green, marginBottom: 6 }}>
            {labelQtd}
          </Text>

          <Text style={{ fontSize: 12, color: "#555" }}>
            Toque para ver os detalhes ({isRetirar ? "retirada" : "entrega"})
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
                  { backgroundColor: receivedView === 0 ? colors.green : "#e0e0e0" },
                ]}
                onPress={() => setReceivedView(0)}
              >
                <Text style={{ color: receivedView === 0 ? "#fff" : "#222" }}>
                  Retirar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  showcaseStyles.tabButton,
                  { backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0" },
                ]}
                onPress={() => setReceivedView(1)}
              >
                <Text style={{ color: receivedView === 1 ? "#fff" : "#222" }}>
                  Entregar
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={groupedByDate}
              keyExtractor={(item) => item.date}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 24 }}>
                  
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#333",
                      marginBottom: 10,
                    }}
                  >
                    {item.date}
                  </Text>

                  {item.groups.map((groupKey) => (
                    <View key={groupKey}>{renderGroup(groupKey)}</View>
                  ))}
                </View>
              )}
            />
          </View>

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

          <GroupDetailsModal
            visible={groupModalVisible}
            onClose={() => setGroupModalVisible(false)}
            groupKey={selectedGroupKey}
            items={selectedGroupItems}
            receivedView={receivedView}
            onPressItem={handlePressItemFromGroup}
          />
        </>
      )}
    </View>
  );
}