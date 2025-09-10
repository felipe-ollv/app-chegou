import colors from "../../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    padding: 16,
    width: '100%',
    marginTop: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#222',
  },
  desc: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 4
  },
	extraBase: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  extraDefault: {
		color: colors.green,
    backgroundColor: colors.ligthgreen
  },
  extraReceived: {
    color: colors.orange,
    backgroundColor: colors.orangeBackgournd,
  }
});