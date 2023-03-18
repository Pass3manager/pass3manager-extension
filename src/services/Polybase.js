import { Polybase } from "@polybase/client";
import * as eth from "@polybase/eth";

export const polybase = new Polybase({
  defaultNamespace:
    "pk/0x3ba025b0e416842cef1c84da654bfa59d9b598cc58c467834d56c9968f4aa5a50f5a08a9ccb1e7ecd0e0b3e2b99b2cd39fd077f0fe5b134b1befbd55bcffb1a8/pass3manager",
  signer: async (data) => {
    return {
      h: "eth-personal-sign",
      sig: await auth.ethPersonalSign(data),
    };
  },
});

export const requestAccount = async () => {
  const accounts = await eth.requestAccounts();
  return accounts[0];
};

export const createRecord = (collection, data) => {
  polybase
    .collection(collection)
    .create(data);
};

export const decryptCredentials = async ({ id, username, password }) => {
  const account = await requestAccount();
  const decryptedUrl = await eth.decrypt(id, account);
  const decryptedUsername = await eth.decrypt(username, account);
  const decryptedPassword = await eth.decrypt(password, account);
  return {
    url: decryptedUrl,
    username: decryptedUsername,
    password: decryptedPassword,
  };
};

export const deleteCredential = async (id) => {
  polybase.collection("Credential").record(id).call("del");
};
