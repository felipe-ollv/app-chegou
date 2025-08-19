import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#024699fd',
        tabBarInactiveTintColor: '#8e8e93',
      }}
    >
      <Tabs.Screen name="showcase/page" options={{ 
        tabBarLabel: "Recebidos", headerShown: false,
        tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="call-received" size={size} color={color} />
      ), 
      }} />
      <Tabs.Screen name="notification/page" options={{ 
        tabBarLabel: "Notificações", headerShown: false, 
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="notifications-outline" color={color} size={size} />
      ),
      }} />
			<Tabs.Screen name="profile/page" options={{ 
        tabBarLabel: "Perfil", headerShown: false,
        tabBarIcon: ({ color, size }) => (
        <AntDesign name="user" size={size} color={color} />
      ),
      }}  />
      <Tabs.Screen name="settings/page" options={{ 
        tabBarLabel: "Ajustes", headerShown: false,
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="settings-outline" color={color} size={size} />
      ),
      }}  />
		</Tabs>
  );
}