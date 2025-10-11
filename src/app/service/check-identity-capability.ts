import * as LocalAuthentication from 'expo-local-authentication';
import ToastComponent from '../../components/toast/component';

export const checkDeviceSupport = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!compatible) {
    return false;
  }

  if (!enrolled) {
    ToastComponent({type: "warning", text1: "Atençāo!", text2: "Cadastre a biometria no celular para login seguro!"});
    return false;
  }

  return true;
};
