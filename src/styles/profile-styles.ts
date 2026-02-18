import { StyleSheet } from "react-native";
import colors from "../../colors-app/colors";

export const profileStyles = StyleSheet.create({
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
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.green,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
  },
  condo: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    padding: 16,
    width: '32%',
    marginTop: 12,
  },
  cardValue: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 2,
  },
  cardLabel: {
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 46,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    maxHeight: "85%",
  },
  dragIndicatorContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D0D5DD",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  scrollArea: {
    maxHeight: "80%",
  },
  scrollContent: {
    paddingBottom: 8,
  },
  formFields: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "red",
    marginTop: 6,
  },
  footer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 36,
  },
  cancelButton: {
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  confirmButton: {
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
    marginBottom: 26,
  },
  confirmButtonDisabled: {
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray,
  },
  cancelText: {
    color: "#111",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});
