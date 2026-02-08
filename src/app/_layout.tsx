import { Stack, Slot } from "expo-router";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { UserProvider } from "../context/user.context";
import Toast from 'react-native-toast-message';
import { toastConfig } from "../components/toast/component";

export default function MainLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const user = true;
  if (!user) {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return  <UserProvider>
            <Slot />
            <Toast config={toastConfig}/>
          </UserProvider>
}
