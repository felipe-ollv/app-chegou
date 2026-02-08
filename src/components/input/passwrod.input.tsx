import React, { useState } from "react";
import { Platform, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/colors-app/colors";

import { TextInput } from "@/src/components/ui/typography";
export default function PasswordInput({
  value,
  onChangeText,
  placeholder = "Digite sua senha...",
  style
}) {
  const [show, setShow] = useState(false);

  return (
    <View style={[{ position: "relative" }, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.blacklight}
        secureTextEntry={!show}
        autoCorrect={false}
        autoCapitalize="none"
        
        textContentType={Platform.OS === "android" ? "oneTimeCode" : "password"}

        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingRight: 40,
          height: 44,
          fontSize: 16,
          color: "#000",
        }}
      />

      <TouchableOpacity
        onPress={() => setShow((prev) => !prev)}
        style={{
          position: "absolute",
          right: 10,
          top: 8,
          padding: 6,
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