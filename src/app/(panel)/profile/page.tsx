import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Link } from 'expo-router';
import HeaderComponent from '../../../components/header/component';

export default function ProfileScreen() {
  return (
        <View style={styles.container}>

          <HeaderComponent logoText='Chegou' slogan='Seu perfil!'/>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Nome</Text>

            </View>
            <View>
              <Text style={styles.label}>Sobrenome</Text>
    
            </View>
            <View>
              <Text style={styles.label}>Condomínio</Text>
  
            </View>
            <View>
              <Text style={styles.label}>Data de Nascimento</Text>
        
            </View>
            <View>
              <Text style={styles.label}>Telefone</Text>
    
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Editar perfil</Text>
            </TouchableOpacity>
            <Link href='(panel)/showcase/page'>
              <Text>Só para ir para a tela de showcase</Text>
            </Link>
          </View>
        </View>
  )
}