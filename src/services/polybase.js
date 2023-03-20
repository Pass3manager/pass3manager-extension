import { Polybase } from "@polybase/client";
import * as eth from "@polybase/eth";
import { POLYBASE_CONSTANTS } from "../constants/polybase";
import { Auth } from "@polybase/auth";
import { credentialSchema } from "../schemas/credential";

export const auth = new Auth();

export const polybase = new Polybase({
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
  polybase.collection(collection).create(data);
};

export const decryptCredentials = async ({ username, password }) => {
  const account = await requestAccount();
  const decryptedUsername = await eth.decrypt(username, account);
  const decryptedPassword = await eth.decrypt(password, account);
  return {
    username: decryptedUsername,
    password: decryptedPassword,
  };
};

export const deleteCredential = async (publicKey, id) => {
  polybase
    .collection(
      `${getNamespace(publicKey)}/${POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION}`
    )
    .record(id)
    .call(POLYBASE_CONSTANTS.DELETE_FUNCTION);
};

export const getNamespace = (publicKey) => {
  return `pk/${publicKey}/${POLYBASE_CONSTANTS.APP_NAME}`;
};

export const createCredentialSchema = async (publicKey) => {
  try {
    await polybase
      .collection(
        `${getNamespace(publicKey)}/${POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION}`
      )
      .get();
  } catch (error) {
    await polybase.applySchema(credentialSchema, `${getNamespace(publicKey)}`);
  }
};
