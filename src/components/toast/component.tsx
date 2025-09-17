import colors from '../../../colors-app/colors';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';

type ToastProps = {
  type: 'success' | 'error' | 'warning';
  text1: string;
  text2?: string;
};

export default function ToastComponent({ type, text1, text2 }: ToastProps) {
  Toast.show({
    type,
    text1,
    text2,
    position: 'top',
    topOffset: 82,
    visibilityTime: 3000
  });
}

export const toastConfig: ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.green, width: '96%' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 18, fontWeight: 'bold', color: colors.green }}
      text2Style={{ fontSize: 14, color: '#333' }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red', width: '96%'  }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}
      text2Style={{ fontSize: 14, color: '#333' }}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'orange', width: '96%'  }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 18, fontWeight: 'bold', color: 'orange' }}
      text2Style={{ fontSize: 14, color: '#333' }}
    />
  ),
};
