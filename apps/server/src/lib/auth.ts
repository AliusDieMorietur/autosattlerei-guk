import { config } from "./config";

const bearer = async (bearerString?: string): Promise<void> => {
  const AUTH_TYPE = "Bearer";
  if (!bearerString) {
    throw new Error("Authorization header does not provided");
  }
  const [type, token] = bearerString.split(" ");
  if (type !== AUTH_TYPE) {
    throw new Error(`Unsupported authentication type: '${type}'`);
  }
  if (!token) {
    throw new Error("Token does not provided");
  }
  if (token !== config.secretToken) {
    throw new Error("Invalid token");
  }
};

export const auth = {
  bearer: bearer,
};
