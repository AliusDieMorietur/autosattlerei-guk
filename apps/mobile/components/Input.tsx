import { useTheme } from "@/hooks/useTheme";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";

export type InputProps = TextInputProps & {};

export const Input = ({ style, ...props }: InputProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <TextInput
      style={[
        {
          backgroundColor: colors.input.default.bg,
          borderRadius: 8,
          padding: 12,
        },
        style,
      ]}
      {...props}
    />
  );
};
