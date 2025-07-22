import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import HeaderComponent from '../../../components/header/component';

export default function ShowCaseScreen() {
  return (
        <View style={styles.container}>
          <HeaderComponent logoText='Chegou' slogan='Recebidos!'/>

          <View style={styles.form}>
            <Text>SHOWCASE</Text>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Editar perfil</Text>
            </TouchableOpacity> */}
            {/* <Link href='(panel)/profile/page'>
              <Text>Só para ir para a tela de profile</Text>
            </Link> */}
          </View>
        </View>
  )
}