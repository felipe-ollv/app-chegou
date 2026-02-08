import React from "react";
import {
  StyleSheet,
  Text as RNText,
  TextInput as RNTextInput,
  type TextInputProps,
  type TextProps,
} from "react-native";

const FONT_FAMILY_BY_WEIGHT: Record<string, string> = {
  "400": "Manrope_400Regular",
  "500": "Manrope_500Medium",
  "600": "Manrope_600SemiBold",
  "700": "Manrope_700Bold",
  "bold": "Manrope_700Bold",
  "normal": "Manrope_400Regular",
};

function mapFontFamily(style: any) {
  const flattened = StyleSheet.flatten(style) || {};
  if (flattened.fontFamily) {
    return undefined;
  }
  const fontWeight = String(flattened.fontWeight || "400");
  return FONT_FAMILY_BY_WEIGHT[fontWeight] || "Manrope_400Regular";
}

export function Text(props: TextProps) {
  const fontFamily = mapFontFamily(props.style);
  if (!fontFamily) {
    return <RNText {...props} />;
  }
  return <RNText {...props} style={[props.style, { fontFamily }]} />;
}

export function TextInput(props: TextInputProps) {
  const fontFamily = mapFontFamily(props.style);
  if (!fontFamily) {
    return <RNTextInput {...props} />;
  }
  return <RNTextInput {...props} style={[props.style, { fontFamily }]} />;
}
