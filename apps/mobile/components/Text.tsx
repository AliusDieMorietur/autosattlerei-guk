import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { Colors } from "@/constants/Colors";

export type Text = NativeTextProps & {};

export function Text({ style, ...props }: Text) {
  const theme = useColorScheme() ?? "dark";
  const colors = Colors[theme];

  return <NativeText style={[{ color: colors.text }, style]} {...props} />;
}

const styles = StyleSheet.create({});
