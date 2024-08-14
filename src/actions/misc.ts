import { init, Applications } from "@kinde/management-api-js";

export const getConnections = async () => {
  init({
    kindeDomain: "https://digitalaffinity.kinde.com",
    clientId: "28a842bb216041c5aca5d2d8a2f12957",
    clientSecret: "gJKCTGUKvbGTOkG4bxTj1eECQ3QrhaRQO2fuFAP6Z3NySN5BNvRa",
  });
  const { connections } = await Applications.getApplicationConnections({
    applicationId: "28a842bb216041c5aca5d2d8a2f12957",
  });

  return connections;
};
