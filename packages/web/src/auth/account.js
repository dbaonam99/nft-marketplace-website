import React, { createContext, useContext, useEffect, useState } from "react";
import { web3 } from "../queries/web3";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [userAddress, setUserAddress] = useState();
  const [account, setAccount] = useState();

  const getUserAddress = (address) => {
    setUserAddress(address);
  };

  useEffect(() => {
    if (!userAddress) return;
    (async () => {
      const account = web3.eth.accounts.create(userAddress);
      console.log("check", account);
      setAccount(account);
    })();
  }, [userAddress]);

  return (
    <AuthContext.Provider value={{ userAddress, getUserAddress, account }}>
      {props.children}
    </AuthContext.Provider>
  );
};
