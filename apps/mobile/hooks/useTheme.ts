import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const theme = useColorScheme() ?? "dark";
  const colors = Colors[theme];

  return {
    theme,
    colors,
  };
};
