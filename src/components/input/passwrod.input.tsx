import React, { useState } from "react";
import { Platform, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/colors-app/colors";

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = "Digite sua senha..."
}) {
  const [show, setShow] = useState(false);

  const masked = value?.replace(/./g, "•");

  const isAndroid = Platform.OS === "android";

  return (
    <View style={{ position: "relative" }}>
      <TextInput
        value={isAndroid ? (show ? value : masked) : value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.blacklight}
        secureTextEntry={!show && Platform.OS === "ios"}
        autoCorrect={false}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingRight: 40,
          height: 44,
          fontFamily: isAndroid ? "Roboto" : undefined,
          top: 4
        }}
      />

      <TouchableOpacity
        onPress={() => setShow((prev) => !prev)}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          padding: 6
        }}
      >
        <Ionicons
          name={show ? "eye-outline" : "eye-off-outline"}
          size={20}
          color={colors.blacklight}
        />
      </TouchableOpacity>
    </View>
  );
}
