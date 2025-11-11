import { StyleSheet } from "react-native";
import colors from "../../colors-app/colors";

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 22,
    color: colors.black,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.green,
    marginVertical: 20,
  },
});
