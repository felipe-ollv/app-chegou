import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="showcase/page" options={{ tabBarLabel: "Showcase", headerShown: false }} />
      <Tabs.Screen name="notification/page" options={{ tabBarLabel: "Notificações", headerShown: false }} />
			<Tabs.Screen name="profile/page" options={{ tabBarLabel: "Perfil", headerShown: false }}  />
		</Tabs>
  );
}