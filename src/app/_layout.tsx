import { Stack, Slot } from "expo-router";

export default function MainLayout() {

  const user = true;
  if (!user) {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return <Slot />
}