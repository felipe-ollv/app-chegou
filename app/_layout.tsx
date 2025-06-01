import { Text, View, StyleSheet } from "react-native";

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <Text>Página Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});