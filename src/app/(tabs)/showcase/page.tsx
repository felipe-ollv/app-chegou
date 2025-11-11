import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";

import api from "../../../interceptor/axios-config";
import HeaderComponent from "../../../components/header/component";
import InfoCardComponent from "../../../components/card/component";
import BasicLoading from "../../../components/loading/basic-loading";
import ToastComponent from "../../../components/toast/component";
import ModalConfirmationCode from "../../../components/modals/modal-confirmation-code";
import ModalInformCode from "../../../components/modals/modal-inform-code";
import ModalRegisterReceiving from "../../../components/modals/modal-register-receiving";

import usePushNotifications from "../../../hooks/push-notification";
import formatDateTime from "../../../utils/formatDateTime";
import { useUser } from "../../../context/user.context";

import { showcaseStyles } from "../../../styles/showcase-styles";
import colors from "../../../../colors-app/colors";

const listPackage = { pickup: [], deliver: [], ordinance: false };

export default function ShowcaseScreen() {
  const { userData } = useUser();
  const [loading, setLoading] = useState(true);
  const [receivedView, setReceivedView] = useState(0);
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [cardsData, setCardsData] = useState(listPackage);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [visibleModalConfirmationCode, setVisibleModalConfirmationCode] = useState(false);
  const [visibleModalInformCode, setVisibleModalInformCode] = useState(false);
  const { expoPushToken } = usePushNotifications();

  const fetchPackageList = async () => {
    try {
      setLoading(true);
      const res: any = await api.get(`/received-package/find-received-package/${userData.ps}`);
      setCardsData(res.data);
    } catch (error) {
      ToastComponent({
        type: "error",
        text1: "Erro!",
        text2: "Erro interno, aguarde alguns instantes",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPackageList();
    }, [])
  );

  useEffect(() => {
    if (!expoPushToken) return;
    const registerTokenPush = async () => {
      await api.post("/push-notification/register-token-notification", {
        token: expoPushToken,
        uuidUserProfile: userData.ps,
      });
      console.log("Token registrado com sucesso!");
    };
    registerTokenPush();
  }, [expoPushToken]);

  const handleRegisterModal = () => {
    fetchPackageList();
  };

  return (
    <View style={showcaseStyles.container}>
      <HeaderComponent logoText="Chegou" slogan="" />

      {loading ? (
        <BasicLoading />
      ) : (
        <>
          <View style={showcaseStyles.form}>
            <View style={showcaseStyles.tabContainer}>
              {!cardsData.ordinance ? (
                <>
                  <TouchableOpacity
                    style={[
                      showcaseStyles.tabButton,
                      { backgroundColor: receivedView === 0 ? colors.green : "#e0e0e0", marginRight: 2 },
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
                      { backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0", marginLeft: 2 },
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
                </>
              ) : (
                <TouchableOpacity
                  style={[
                    showcaseStyles.tabButton,
                    { backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0" },
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
              )}
            </View>

            <ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 1 }}>
              {receivedView === 0
                ? cardsData.pickup.length > 0
                  ? cardsData.pickup.map((item: any) => (
                      <React.Fragment key={item.uuid_package}>
                        <TouchableOpacity
                          onPress={() => {
                            setVisibleModalInformCode(true);
                            setSelectedItem(item.confirmation_code);
                          }}
                          disabled={item.status_package === "DELIVERED"}
                        >
                          <InfoCardComponent
                            title={`Condomínio: ${item.condominium_name} ${item.blockReceiver} ${item.apartmentReceiver}`}
                            receivedBy={`Recebido por: ${item.receiverName}`}
                            receivedDate={`Data: ${formatDateTime(item.created_at)}`}
                            note={item.note}
                            status_package={item.status_package}
                          />
                        </TouchableOpacity>

                        <ModalInformCode
                          visible={visibleModalInformCode}
                          onClose={() => setVisibleModalInformCode(false)}
                          selected={selectedItem}
                        />
                      </React.Fragment>
                    ))
                  : (
                    <View style={showcaseStyles.emptyContainer}>
                      <Text>Nenhuma encomenda registrada!</Text>
                    </View>
                  )
                : cardsData.deliver.length > 0
                ? cardsData.deliver.map((item: any) => (
                    <React.Fragment key={item.uuid_package}>
                      <TouchableOpacity
                        onPress={() => {
                          setVisibleModalConfirmationCode(true);
                          setSelectedItem(item.uuid_package);
                        }}
                        disabled={item.status_package === "DELIVERED"}
                      >
                        <InfoCardComponent
                          title={`Condomínio: ${item.condominium_name} ${item.blockOwner} ${item.apartmentOwner}`}
                          receivedBy={`Para: ${item.ownerName}`}
                          receivedDate={`Recebido: ${formatDateTime(item.created_at)}`}
                          note={item.note}
                          status_package={item.status_package}
                        />
                      </TouchableOpacity>

                      <ModalConfirmationCode
                        visible={visibleModalConfirmationCode}
                        onClose={() => setVisibleModalConfirmationCode(false)}
                        selected={selectedItem}
                        onConfirmCode={handleRegisterModal}
                      />
                    </React.Fragment>
                  ))
                : (
                  <View style={showcaseStyles.emptyContainer}>
                    <Text>Nenhuma encomenda registrada!</Text>
                  </View>
                )}
            </ScrollView>
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
        </>
      )}
    </View>
  );
}
