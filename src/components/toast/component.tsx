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
    position: 'bottom',
    bottomOffset: 50,
    visibilityTime: 3000
  });
}

export const toastConfig: ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}
      text2Style={{ fontSize: 14, color: '#333' }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}
      text2Style={{ fontSize: 14, color: '#333' }}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'orange' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 18, fontWeight: 'bold', color: 'orange' }}
      text2Style={{ fontSize: 14, color: '#333' }}
    />
  ),
};
