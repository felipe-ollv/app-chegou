import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { profileStyles } from './styles';
import HeaderComponent from '../../../components/header/component';

export default function ProfileScreen() {
  return (
    <View style={profileStyles.container}>

      <HeaderComponent logoText='Chegou' slogan='Seu perfil!' />

      <View style={profileStyles.form}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/images/11539820.png')}
            style={profileStyles.profileImageCss}
          />

          <Text style={profileStyles.name}>Felipe Oliveira</Text>
        </View>

        <Text style={profileStyles.bio}>Amaná B 107</Text>
        <Text style={profileStyles.bio}>(11) 97764-8119</Text>
        <Text style={profileStyles.bio}>Morador</Text>

        <TouchableOpacity style={profileStyles.button}>
          <Text style={profileStyles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}