import { Polybase } from "@polybase/client";
import * as eth from "@polybase/eth";
import { POLYBASE_CONSTANTS } from "../constants/polybase";
import { credentialSchema } from "../schemas/credential";

export const polybase = new Polybase({
  signer: async (data) => {
    const sig = await eth.sign(data, await requestAccount());
    return { h: "eth-personal-sign", sig };
  },
});

export const assignSigner = () => {
  polybase.signer(async (data) => {
    const sig = await eth.sign(data, await requestAccount());
    return { h: "eth-personal-sign", sig };
  });
};

export const requestAccount = async () => {
  const accounts = await eth.requestAccounts();
  return accounts[0];
};

export const createRecord = async (collection, data) => {
  assignSigner();
  return await polybase.collection(collection).create(data);
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
  assignSigner();
  await polybase
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

export const getCredential = async (publicKey, id) => {
  assignSigner();
  return await polybase
    .collection(
      `${getNamespace(publicKey)}/${POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION}`
    )
    .record(id)
    .get();
};
