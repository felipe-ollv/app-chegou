import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import api from '../../../interceptor/axios-config';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import HeaderComponent from '../../../components/header/component';
import InfoCardComponent from "../../../components/card/component";
import BasicLoading from '../../../components/loading/basic-loading';
import formatDateTime from '../../../utils/formatDateTime';
import ToastComponent from '../../../components/toast/component';
import colors from "../../../../colors-app/colors";
import { showcaseStyles } from "../../../styles/showcase-styles";
import { useUser } from "../../../context/user.context";
import ModalConfirmationCode from '../../../components/modals/modal-confirmation-code';
import ModalInformCode from "../../../components/modals/modal-inform-code";
import ModalRegisterReceiving from "../../../components/modals/modal-register-receiving";
import usePushNotifications from "../../../hooks/push-notification";

const listPackage = {
  pickup: [],
  deliver: [],
  ordinance: false
}

export default function ShowcaseScreen() {
  const { userData } = useUser();
  const [loading, setLoading] = useState(true);
  const [receivedView, setLadoSelecionado] = useState(0);
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [cardsData, setCardsData] = useState(listPackage);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [visibleModalConfirmationCode, setVisibleModalConfirmationCode] = useState(false);
  const [visibleModalInformCode, setVisibleModalInformCode] = useState(false);
  const expoPushToken = usePushNotifications();

  useEffect(() => {
    fetchPackageList();
  }, []);

  useEffect(() => {
    if (expoPushToken && userData?.ps) {
      registerTokenPush();
    }
  }, [expoPushToken, userData]);

  const registerTokenPush = async () => {
    if (expoPushToken) {
      const result = await api.post('/push-notification/register-token-notification', {
        token: expoPushToken,
        uuidUserProfile: userData.ps
      })
    }
  }

  const fetchPackageList = async () => {
    try {
      setLoading(true)
      const res: any = await api.get(`/received-package/find-received-package/${userData.ps}`)
      setCardsData(res.data);
    } catch (error) {
      ToastComponent({ type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={showcaseStyles.container}>
      <HeaderComponent logoText="Chegou" slogan="" />

      {loading ?
        <BasicLoading />
        :
        <><View style={showcaseStyles.form}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              marginTop: 16,
              borderBottomWidth: 2,
              borderBottomColor: colors.green,
              paddingBottom: 8,
            }}
          >

            {!cardsData.ordinance ?
              <><TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: receivedView === 0 ? colors.green : "#e0e0e0",
                  borderRadius: 8,
                  paddingVertical: 3,
                  marginRight: 2,
                }}
                onPress={() => setLadoSelecionado(0)}
              >
                <Text
                  style={{
                    color: receivedView === 0 ? "#fff" : "#222",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Retirar
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0",
                    borderRadius: 8,
                    paddingVertical: 3,
                    marginLeft: 2,
                  }}
                  onPress={() => setLadoSelecionado(1)}
                >
                  <Text
                    style={{
                      color: receivedView === 1 ? "#fff" : "#222",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Entregar
                  </Text>
                </TouchableOpacity></>
              :
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: receivedView === 1 ? colors.green : "#e0e0e0",
                  borderRadius: 8,
                  paddingVertical: 3,
                  marginLeft: 2,
                }}
                onPress={() => setLadoSelecionado(1)}
              >
                <Text
                  style={{
                    color: receivedView === 1 ? "#fff" : "#222",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Entregar
                </Text>
              </TouchableOpacity>}

          </View>

          <ScrollView style={{ flex: 1, width: '100%', paddingHorizontal: 1 }}>
            {receivedView === 0 ?
              cardsData.pickup.length > 0 ?
                cardsData.pickup.map((item: any) => (
                  <>
                    <TouchableOpacity
                      key={item.uuid_package}
                      onPress={() => {
                        setVisibleModalInformCode(true)
                        setSelectedItem(item.confirmation_code)
                      }}
                      disabled={item.status_package === 'DELIVERED'}
                    >
                      <InfoCardComponent
                        title={`Condomínio: ${item.condominium_name} ${item.blockOwner} ${item.apartmentOwner}`}
                        receivedBy={`Recebido por: ${item.ownerName}`}
                        receivedDate={`Data: ${formatDateTime(item.created_at)}`}
                        status_package={item.status_package}
                      />
                    </TouchableOpacity>

                    <ModalInformCode
                      visible={visibleModalInformCode}
                      onClose={() => setVisibleModalInformCode(false)}
                      selected={selectedItem}
                    />
                  </>
                ))
                :
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text>Nenhuma encomenda registrada!</Text>
                </View>
              :
              cardsData.deliver.length > 0 ?
                cardsData.deliver.map((item: any) => (
                  <>
                    <TouchableOpacity
                      key={item.uuid_package}
                      onPress={() => {
                        setVisibleModalConfirmationCode(true)
                        setSelectedItem(item.uuid_package)
                      }}
                      disabled={item.status_package === 'DELIVERED'}
                    >
                      <InfoCardComponent
                        title={`Condomínio: ${item.condominium_name} ${item.blockOwner} ${item.apartmentOwner}`}
                        receivedBy={`Para: ${item.ownerName}`}
                        receivedDate={`Recebido: ${formatDateTime(item.created_at)}`}
                        status_package={item.status_package}
                      />

                    </TouchableOpacity>

                    <ModalConfirmationCode
                      visible={visibleModalConfirmationCode}
                      onClose={() => setVisibleModalConfirmationCode(false)}
                      selected={selectedItem}
                    />
                  </>
                ))
                :
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text>Nenhuma encomenda registrada!</Text>
                </View>}
          </ScrollView>

        </View>
          <TouchableOpacity
            onPress={() => setModalRegisterVisible(true)}
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
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>

          <ModalRegisterReceiving
            visible={modalRegisterVisible}
            onClose={() => setModalRegisterVisible(false)}
            selected=''
          />
        </>
      }
    </View>
  );
}
