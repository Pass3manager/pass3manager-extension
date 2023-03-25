import { createContext, useContext, useState } from "react";
import { Buffer } from "buffer";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const msg = `0x${Buffer.from("Login", "utf8").toString("hex")}`;
      const sign = await ethereum.request({
        method: "personal_sign",
        params: [msg, accounts[0]],
      });
      if (sign) {
        setIsLoggedIn(true);
        setUser({
          userId: accounts[0],
          publicKey: sign,
        });
      } else {
        console.alert("Auth not signed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    userId: null,
    publicKey: null,
  });

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, connectWallet }}
    >
      {children}
    </AuthContext.Provider>
  );
};
