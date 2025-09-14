import { StyleSheet } from "react-native";
import colors from "../../colors-app/colors";

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc
  },
  header: {
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14
  }, 
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8
  },
  slogan: {
    fontSize: 28,
    color: colors.white,
    marginBottom: 34
  },
	form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 2,
    paddingLeft: 14,
    paddingRight: 14,
    justifyContent: 'center',
    alignItems: 'center'
	},
   card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
  }
});