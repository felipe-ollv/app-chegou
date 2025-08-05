import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import HeaderComponent from '../../../components/header/component';

export default function ProfileScreen() {
  return (
        <View style={styles.container}>

          <HeaderComponent logoText='Chegou' slogan='Seu perfil!'/>

          <View style={styles.form}>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/images/11539820.png')}
                style={styles.profileImageCss}
              />

              <Text style={styles.name}>Felipe Oliveira</Text>
            </View>

            <Text style={styles.bio}>Amaná B 107</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>

          </View>
        </View>
  )
}