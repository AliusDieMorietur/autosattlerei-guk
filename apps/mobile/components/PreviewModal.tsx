import { COLORS } from "@/constants/Colors";
import { Image, Modal, ModalProps, StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";

export type PreviewModalProps = ModalProps & {
  currentImage?: {
    base64: string;
    width: number;
    height: number;
  } | null;
  onClose?: () => void;
};

export const PreviewModal = ({
  currentImage,
  onClose,
  ...props
}: PreviewModalProps): JSX.Element => {
  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <View style={[styles.modal]}>
        {currentImage && (
          <Image
            style={{
              width: currentImage.width,
              height: currentImage.height,
            }}
            source={{ uri: `data:image/jpeg;base64,${currentImage.base64}` }}
          />
        )}
        <Button
          style={styles.close}
          icon={(typeData) => (
            <MaterialIcons name="close" size={20} color={typeData.text} />
          )}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS._1,
    padding: 20,
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
