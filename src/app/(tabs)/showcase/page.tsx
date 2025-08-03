import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import HeaderComponent from '../../../components/header/component';
import InfoCardComponent from '../../../components/card/component';
import { Link } from 'expo-router';

export default function ShowCaseScreen() {
  
  return (
    <View style={styles.container}>
      <HeaderComponent logoText='Chegou' slogan='Recebidos!'/>

      <View style={styles.form}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: "100%", backgroundColor: "#008080", marginBottom: 10, borderRadius: 10, height: 26 }}>
          <Text style={{ color: "#fff" }}>Por voce</Text>
          <Text style={{ color: "#fff" }}>|</Text>
          <Text style={{ color: "#fff" }}>Do seu Apê</Text>
        </View>
        <InfoCardComponent title="Amaná B 107" description="Aqui vai os dados de quem recebeu" extra="PENDENTE" />
        <Link href='(panel)/notification/page' style={{ marginTop: 20}}>
          <Text>Só para ir para a tela de avisos</Text>
        </Link>
      </View>
    </View>
  )
}