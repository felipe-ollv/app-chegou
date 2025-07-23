import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import HeaderComponent from '../../../components/header/component';
import { Link } from 'expo-router';

export default function ShowCaseScreen() {
  return (
        <View style={styles.container}>
          <HeaderComponent logoText='Chegou' slogan='Recebidos!'/>

          <View style={styles.form}>
            <Text>SHOWCASE</Text>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Editar perfil</Text>
            </TouchableOpacity> */}
            <Link href='(panel)/notification/page'>
              <Text>Só para ir para a tela de avisos</Text>
            </Link>
          </View>
        </View>
  )
}