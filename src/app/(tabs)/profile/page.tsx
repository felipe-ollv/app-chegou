import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { profileStyles } from './styles';
import HeaderComponent from '../../../components/header/component';
import LoadingComponent from '../../../components/loading/component';
import api from '../../interceptor/axios-config';
import { useUser } from '../../context/user.context';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();
  const [userProfile, setUserProfile] = useState([
    {
      "apartment": 0,
      "apartment_block": "",
      "condominium_name": "",
      "name": "",
      "phone_number": "",
      "type_profile": ""
    }
  ]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const res: any = await api.get(`/user-profile/find-user-profile/${userData.ps}`);
    console.log(res.data)
    setUserProfile(res.data);
    setLoading(false);
  }

  return (
    <View style={profileStyles.container}>

      <HeaderComponent logoText='Chegou' slogan='Seu perfil!' />

      {loading ?
        <LoadingComponent />
        :
        <View style={profileStyles.form}>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../../assets/images/11539820.png')}
              style={profileStyles.profileImageCss}
            />

            <Text style={profileStyles.name}>{userProfile[0].name}</Text>
          </View>

          <Text style={profileStyles.bio}>{userProfile[0].condominium_name} {userProfile[0].apartment_block} {userProfile[0].apartment}</Text>
          <Text style={profileStyles.bio}>{userProfile[0].phone_number}</Text>
          <Text style={profileStyles.bio}>{userProfile[0].type_profile}</Text>

          <TouchableOpacity style={profileStyles.button}>
            <Text style={profileStyles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>

        </View>

        // MODAL PARA EDITAR PERFIL 
        
      }
    </View>
  )
}