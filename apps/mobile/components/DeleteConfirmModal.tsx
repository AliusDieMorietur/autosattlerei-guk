import { COLORS } from "@/constants/Colors";
import { Modal, ModalProps, StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./Text";

export type DeleteConfirmModalProps = ModalProps & {
  currentImage?: {
    base64: string;
    width: number;
    height: number;
  };
  onDelete?: () => void;
  onClose?: () => void;
};

export const DeleteConfirmModal = ({
  currentImage,
  onClose,
  onDelete,
  ...props
}: DeleteConfirmModalProps): JSX.Element => {
  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <View style={[styles.modal]}>
        <Text style={styles.text}>
          Are you sure you want to delete this image?
        </Text>
        <View style={styles.buttons}>
          <Button
            title="Yes"
            icon={(typeData) => (
              <MaterialIcons name="check" size={20} color={typeData.text} />
            )}
            onPress={onDelete}
            type="success"
          />
          <Button
            title="No"
            icon={(typeData) => (
              <MaterialIcons name="close" size={20} color={typeData.text} />
            )}
            onPress={onClose}
            type="danger"
          />
        </View>
      </View>
      <Button
        style={styles.close}
        icon={(typeData) => (
          <MaterialIcons name="close" size={20} color={typeData.text} />
        )}
        onPress={onClose}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 36,
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS._1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    display: "flex",
    flexDirection: "row",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
