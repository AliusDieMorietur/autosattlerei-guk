import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { useTheme } from "@/hooks/useTheme";

const SPACINGS = {
  default: 12,
  small: 8,
};

export type ButtonProps = TouchableOpacityProps & {
  icon?: ReactNode;
  title?: string;
  spacing?: keyof typeof SPACINGS;
};

export const Button = ({
  icon,
  title,
  style,
  spacing = "default",
  ...props
}: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.button.default.bg,
          padding: SPACINGS[spacing],
        },
        style,
      ]}
      {...props}
    >
      {icon}
      {title && (
        <Text
          style={[
            styles.text,
            {
              color: colors.button.default.text,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
});
