import { User } from "../types";
import { lib } from ".";

const sendNotification = async (
  id: User["id"],
  title: string,
  body: string
) => {
  const user = await lib.user.get(id);
  if (!user) {
    throw new Error(
      `Unable to send notification to user with id '${id}'. User not found`
    );
  }

  const message = {
    to: user.fcmDeviceToken,
    sound: "default",
    title,
    body,
    data: { someData: "goes here" },
  };

  return await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const expo = {
  sendNotification,
};
