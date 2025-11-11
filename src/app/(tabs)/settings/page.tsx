import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../../components/header/component';
import { settingsStyles } from '../../../styles/settings-styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../../../colors-app/colors';
import ModalTermsAndPrivacy from '../../../components/modals/modal-terms-privacy';
import ModalSuport from '../../../components/modals/modal-suport';
import ModalChangePassword from '../../../components/modals/modal-change-password';
import ModalExcludeAccount from '../../../components/modals/modal-exclude-account';

export default function SettingsScreen() {
  const [modalTermsVisible, setModalTermsVisible] = useState(false);
  const [modalSuportVisible, setModalSuportVisible] = useState(false);
  const [modalChangePasswordVisible, setModalChangePasswordVisible] = useState(false);
  const [modalExcludeAccountVisible, setModalExcludeAccountVisible] = useState(false);

  const renderOption = (icon, label, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={settingsStyles.optionRow}>
        <View style={settingsStyles.optionLabelContainer}>
          {icon}
          <Text style={settingsStyles.optionLabel}>{label}</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={14} color={colors.zinc} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={settingsStyles.container}>
      <HeaderComponent logoText="Chegou" slogan="Recebidos!" />
      <View style={settingsStyles.form}>
        <View style={settingsStyles.card}>
          {renderOption(<MaterialIcons name="password" size={22} color={colors.zinc} />, "Alterar Senha", () => setModalChangePasswordVisible(true))}
          <View style={settingsStyles.separator} />

          {renderOption(<AntDesign name="customerservice" size={22} color={colors.zinc} />, "Suporte/Atendimento", () => setModalSuportVisible(true))}
          <View style={settingsStyles.separator} />

          {renderOption(<MaterialCommunityIcons name="information-outline" size={22} color={colors.zinc} />, "Termos e Privacidade", () => setModalTermsVisible(true))}
          <View style={settingsStyles.separator} />

          {renderOption(<Ionicons name="exit-outline" size={22} color={colors.zinc} />, "Excluir cadastro", () => setModalExcludeAccountVisible(true))}
        </View>
      </View>

      <ModalTermsAndPrivacy visible={modalTermsVisible} onClose={() => setModalTermsVisible(false)} />
      <ModalSuport visible={modalSuportVisible} onClose={() => setModalSuportVisible(false)} />
      <ModalChangePassword visible={modalChangePasswordVisible} onClose={() => setModalChangePasswordVisible(false)} />
      <ModalExcludeAccount visible={modalExcludeAccountVisible} onClose={() => setModalExcludeAccountVisible(false)} />
    </View>
  );
}
