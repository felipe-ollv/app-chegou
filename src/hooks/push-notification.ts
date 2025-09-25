import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  return expoPushToken;
}

async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  if (!Device.isDevice) {
    alert("Precisa de um dispositivo real para push notifications");
    return null;
  }

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
  console.log("Expo Push Token:", token);

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
