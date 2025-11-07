import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { assert } from "@/utils/assert";

const getToken = async () => {
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  assert(projectId, "Project id should be defined");
  const { data } = await Notifications.getExpoPushTokenAsync();
  console.log("Expo Token:", data);
  return data;
};

export const expo = {
  getToken,
};
