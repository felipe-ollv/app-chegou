import { Stack, Slot } from "expo-router";
import { UserProvider } from "../context/user.context";
import Toast from 'react-native-toast-message';
import { toastConfig } from "../components/toast/component";

export default function MainLayout() {

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