import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import HeaderComponent from '../../../components/header/component';
import InfoCardComponent from "@/src/components/card/component";

import colors from "@/constants/colors";
import { styles } from "./styles";

export default function ShowcaseScreen() {
  const [receivedView, setLadoSelecionado] = useState(true);

  return (
    <View style={styles.container}>
      <HeaderComponent logoText="Chegou" slogan=""/>
      <View style={styles.form}>
              <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          marginTop: 16,
          marginBottom: receivedView ? 5 : 10,
          borderBottomWidth: 2,
          borderBottomColor: colors.green,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: receivedView ? colors.green : "#e0e0e0",
            borderRadius: 8,
            paddingVertical: 3,
            marginRight: 2,
          }}
          onPress={() => setLadoSelecionado(!receivedView)}
        >
          <Text
            style={{
              color: receivedView ? "#fff" : "#222",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Recebi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: !receivedView ? colors.green : "#e0e0e0",
            borderRadius: 8,
            paddingVertical: 3,
            marginLeft: 2,
          }}
          onPress={() => setLadoSelecionado(!receivedView)}
        >
          <Text
            style={{
              color: !receivedView ? "#fff" : "#222",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Receberam
          </Text>
        </TouchableOpacity>
      </View>
      {/* Os cards abaixo permanecem */}
      <InfoCardComponent title="Amaná B 107" description="Aqui vai os dados de quem recebeu" extra="PENDENTE" />
      <InfoCardComponent title="Amaná B 107" description="Aqui vai os dados de quem recebeu" extra="PENDENTE" />
      </View>
    </View>
  );
}
