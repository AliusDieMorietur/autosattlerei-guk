import { StyleSheet, View } from "react-native";

import { ContactList } from "@/components/ContactList";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <ContactList />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: Colors.dark.background,
  },
  notFoundView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  notFoundText: {
    fontSize: 24,
  },
});
