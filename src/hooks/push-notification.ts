import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
    });

    // Listener quando a notificação chega (foreground)
    const subscription = Notifications.addNotificationReceivedListener(notif => {
      console.log("Notificação recebida:", notif);
      setNotification(notif);
    });

    // Listener quando o usuário toca na notificação
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Usuário tocou na notificação:", response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };

  }, []);

  return { expoPushToken, notification };
}

async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  // if (!Device.isDevice) {
  //   alert("Precisa de um dispositivo real para push notifications");
  //   return null;
  // }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Falha ao obter permissão para notificações!");
    return null;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  token = tokenData.data;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
