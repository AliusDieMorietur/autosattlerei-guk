import { Platform, StyleSheet, View } from "react-native";

import { ContactList } from "@/components/ContactList";
import { Colors } from "@/constants/Colors";

import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { api } from "@/api";
import * as Device from "expo-device";
import { lib } from "@/lib";
// import * as Sentry from "@sentry/react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Permission not granted to get push token for push notification!");
      return;
    }
    await lib.expo
      .getToken()
      .then((token) => {
        console.log("FCM_DEVICE_TOKEN", token);
        return api.admin.init(token);
      })
      .then((data) => console.log("INIT_ADMIN_SUCCESS", data))
      .catch((error) => {
        // Sentry.captureException(error);
        api.admin.report(`INIT_ADMIN_ERROR: ${error.message}`);
        return console.error("INIT_ADMIN_ERROR", error);
      });
  }
}

export default function App() {
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
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
