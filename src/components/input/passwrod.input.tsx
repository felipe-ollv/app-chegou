import React, { useState } from "react";
import { Platform, TextInput, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/colors-app/colors";

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = "Digite sua senha...",
  style
}) {
  const [show, setShow] = useState(false);
  const isAndroid = Platform.OS === "android";

  const masked = value?.replace(/./g, "•") ?? "";

  return (
    <View style={[{ position: "relative" }, style]}>
      
      <TextInput
        value={value}
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
          color: show || Platform.OS === "ios" ? "#000" : "transparent",
        }}
      />

      {Platform.OS === "android" && !show && (
        <Text
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            color: "#000",
            fontSize: 16,
            fontFamily: "Roboto",
          }}
        >
          {masked}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setShow((prev) => !prev)}
        style={{
          position: "absolute",
          right: 10,
          top: 8,
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
