import { Contact } from "@/types/contact";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import { useState } from "react";
import { CopyText } from "./CopyText";
import { COLORS } from "@/constants/Colors";

const toggleCheckContact = async (id: number, checked: boolean) =>
  await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/contact/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      checked,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_SECRET_TOKEN}`,
    },
  });

export type ContactItemProps = {
  contact: Contact;
  onImageClick?: (photo: Contact["photos"][0]) => void;
  onDeleteClick?: (id: number) => void;
  onCheckClick?: (id: number) => void;
};

export const ContactItem = ({
  contact,
  onImageClick,
  onDeleteClick,
}: ContactItemProps): JSX.Element => {
  const [checked, setChecked] = useState(contact.checked);
  const dateObj = new Date(contact.createdAt);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: COLORS._7,
        },
      ]}
    >
      <Text>
        Name: <CopyText text={contact.name} />
      </Text>
      <Text>
        Email: <CopyText text={contact.email} />
      </Text>
      <Text>
        Phone: <CopyText text={contact.phone} />
      </Text>
      <Text>
        Description: <CopyText text={contact.description} />
      </Text>
      <Text>
        Created at: {date} {time}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {contact.photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => onImageClick?.(photo)}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
              }}
              source={{ uri: `data:image/jpeg;base64,${photo.base64}` }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          type={checked ? "success" : "default"}
          icon={(typeData) => (
            <MaterialIcons
              name={checked ? "check-box" : "check-box-outline-blank"}
              size={20}
              color={typeData.text}
            />
          )}
          onPress={async () => {
            try {
              setChecked(!checked);
              await toggleCheckContact(contact.id, !checked);
            } catch (error) {
              console.error("TOGGLE_CHECK_CONTACT_ERROR", error);
              setChecked(!checked);
            }
          }}
        />
        <Button
          style={styles.button}
          type="danger"
          icon={(typeData) => (
            <MaterialIcons name="delete" size={20} color={typeData.text} />
          )}
          onPress={() => onDeleteClick?.(contact.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 8,
    gap: 4,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  button: {},
});
