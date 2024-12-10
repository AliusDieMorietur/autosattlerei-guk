import { Contact } from "@/types/contact";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

export type ContactItemProps = {
  contact: Contact;
  onImageClick?: (photo: Contact["photos"][0]) => void;
  onDeleteClick?: (id: number) => void;
};

export const ContactItem = ({
  contact,
  onImageClick,
  onDeleteClick,
}: ContactItemProps): JSX.Element => {
  const { colors } = useTheme();
  const [checked, setChecked] = useState(contact.checked);
  const dateObj = new Date(contact.createdAt);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <Text>Name: {contact.name}</Text>
      <Text>Email: {contact.email}</Text>
      <Text>Phone: {contact.phone}</Text>
      <Text>Description: {contact.description}</Text>
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
        <Button
          icon={
            <MaterialIcons
              name="delete"
              size={20}
              color={colors.button.default.text}
            />
          }
          onPress={() => onDeleteClick?.(contact.id)}
        />
        <Button
          icon={
            <MaterialIcons
              name="delete"
              size={20}
              color={colors.button.default.text}
            />
          }
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
});
