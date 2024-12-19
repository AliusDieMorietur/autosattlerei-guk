import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "@/constants/Colors";

export type CopyTextProps = TouchableOpacityProps & {
  text: string;
};

export const CopyText = ({ style, text, onPress, ...props }: CopyTextProps) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <TouchableOpacity
      style={[styles.copyText, style]}
      onPress={() => {
        copyToClipboard();
        onPress?.();
      }}
      {...props}
    >
      <Text
        style={{
          color: COLORS._6,
          padding: 0,
          flexShrink: 1,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  copyText: {
    padding: 0,
    height: 15,
  },
});
