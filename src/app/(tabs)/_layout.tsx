
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "@/src/components/ui/typography";
import colors from "../../../colors-app/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.zinc,
        tabBarInactiveTintColor: colors.gray2,
      }}
    >
      <Tabs.Screen name="showcase/page" options={{
        tabBarLabel: ({ color, focused }) => {
          return <Text
            style={{
              color: color,
              fontSize: 11,
              fontWeight: focused ? '600' : '400'
            }}
          >
            Recebidos
          </Text>;
        }, 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="call-received" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="notification/page" options={{
        tabBarLabel: ({ color, focused }) => {
          return <Text
            style={{
              color: color,
              fontSize: 11,
              fontWeight: focused ? '600' : '400'
            }}
          >
            Avisos
          </Text>;
        }, 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book-alert-outline" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="profile/page" options={{
        tabBarLabel: ({ color, focused }) => {
          return <Text
            style={{
              color: color,
              fontSize: 11,
              fontWeight: focused ? '600' : '400'
            }}
          >
            Perfil
          </Text>;
        },  
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name="user" size={24} color={color}/>
        ),
      }} />
      <Tabs.Screen name="settings/page" options={{
        tabBarLabel: ({ color, focused }) => {
          return <Text
            style={{
              color: color,
              fontSize: 11,
              fontWeight: focused ? '600' : '400'
            }}
          >
            Ajustes
          </Text>;
        }, 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" color={color} size={24} />
        ),
      }} />
    </Tabs>
  );
}