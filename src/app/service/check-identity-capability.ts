import * as LocalAuthentication from 'expo-local-authentication';

export const checkDeviceSupport = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!compatible) {
    return false;
  }

  if (!enrolled) {
    alert("Cadastre sua biometria no celular para login mais seguro!");
    return false;
  }

  return true;
};
