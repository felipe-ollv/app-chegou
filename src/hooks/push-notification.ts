import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    const initPush = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
      }
    };
    initPush();

    const subscription = Notifications.addNotificationReceivedListener((notif) => {
      setNotification(notif);
    });
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Usuário tocou na notificação:", response);
      }
    );

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return { expoPushToken, notification };
}

async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (!Device.isDevice) {
    alert("Precisa de um dispositivo real para push notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  console.log('Permissão anterior:', finalStatus);

  if (existingStatus !== "granted") {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('Permissão após request:', finalStatus);
    } catch (e) {
      console.log('Erro ao pedir permissão:', e);
      alert('Erro ao pedir permissão de notificação!');
      return null;
    }
  }

  if (finalStatus !== "granted") {
    alert("Permissão de notificações não concedida!");
    return null;
  }

  if (Platform.OS === "android") {
    try {
      await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      showBadge: true,
    });
      console.log('Canal de notificação criado com sucesso.');
    } catch (e) {
      console.log('Erro ao criar canal de notificação Android:', e);
    }
  }

  try {
    const projectId = "e258b308-d015-4620-8429-1993b40f9241";

    const tokenData = await Notifications.getExpoPushTokenAsync({projectId: projectId});
    return tokenData.data ?? null;
  } catch (e) {
    console.log("Erro ao obter Expo Push Token:", e);
    alert("Erro ao obter token de push notification!");
    return null;
  }
}
