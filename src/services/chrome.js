import { decryptCredentials, getCredential } from "./polybase";

export const addChangeUrlListener = (publicKey) => {
  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      try {
        const credential = await getCredential(
          publicKey,
          request.payload.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
        );
        if (credential.data) {
          const decryptedCredentials = await decryptCredentials(
            credential.data
          );
          sendAutoFill(
            decryptedCredentials.username,
            decryptedCredentials.password,
            credential.data.id
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
};

export const sendAutoFill = (username, password, url) => {
  chrome.runtime.sendMessage({
    action: "fill_form",
    payload: {
      username: username,
      password: password,
      url: url,
    },
  });
};
