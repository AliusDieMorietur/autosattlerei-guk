import { COLORS } from "@/constants/Colors";
import { useToastStore } from "@/store/useToastStore";
import { Modal, View } from "react-native";
import { Text } from "./Text";

export type ToasterProps = {};

// TODO: Fix this
export const Toaster = ({}: ToasterProps): JSX.Element => {
  const { toasts } = useToastStore();
  return (
    <>
      {toasts.map(({ id, message }) => (
        <Modal key={id} visible={true} transparent={true} animationType="slide">
          <View
            style={{
              width: "80%",
              height: 40,
              backgroundColor: COLORS._7,
            }}
          >
            <Text>{message}</Text>
          </View>
        </Modal>
      ))}
    </>
  );
};
