import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { COLORS } from "@/constants/Colors";

const SPACINGS = {
  default: 12,
  small: 8,
};

const TYPES = {
  default: {
    bg: COLORS._3,
    text: COLORS._2,
  },
  success: {
    bg: COLORS._4,
    text: COLORS._2,
  },
  danger: {
    bg: COLORS._5,
    text: COLORS._2,
  },
};

export type ButtonProps = TouchableOpacityProps & {
  icon?: (typeData: (typeof TYPES)[keyof typeof TYPES]) => ReactNode;
  title?: string;
  spacing?: keyof typeof SPACINGS;
  type?: keyof typeof TYPES;
};

export const Button = ({
  icon,
  title,
  style,
  spacing = "default",
  type = "default",
  ...props
}: ButtonProps) => {
  const typeData = TYPES[type];
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: typeData.bg,
          padding: SPACINGS[spacing],
        },
        style,
      ]}
      {...props}
    >
      {icon?.(typeData)}
      {title && (
        <Text
          style={[
            styles.text,
            {
              color: typeData.text,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
});
