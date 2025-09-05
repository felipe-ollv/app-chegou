import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  header: {
    paddingTop: 18,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 8
  }, 
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8
  },
  slogan: {
    fontSize: 28,
    color: colors.white,
    marginTop: 10,
    marginBottom: 20
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255, 0.55)',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8
  },
});

export default styles;